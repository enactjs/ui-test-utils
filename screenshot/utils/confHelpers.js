const crypto = require('crypto'),
	path = require('path'),
	fs = require('fs');

const VisualRegressionCompare = require('wdio-novus-visual-regression-service/compare');
const buildApps = require('../../src/build-apps');
const makeHeader = require('./headerTemplate');

const newScreenshotFilename = 'tests/screenshot/dist/newFiles.html',
	failedScreenshotFilename = 'tests/screenshot/dist/failedTests.html',
	newScreenshotHeader = makeHeader('New Screenshots'),
	newScreenshotFooter = '];\n</script><script src="utils/newFiles.js"></script>\n</body></html>',
	failedScreenshotHeader = makeHeader('Failed Screenshots'),
	failedScreenshotFooter = '];\n</script><script src="utils/failedTests.js"></script>\n</body></html>';

function getScreenshotName (basePath) {
	return function (context) {
		// Using '~/' as a path part separator in cases where '/' appears in a test name
		const testNameParts = context.test.title.split('~/');
		let testName = testNameParts.pop();
		// Replace problematic filenames. Windows is much more restrictive.
		testName = testName.replace(/[/\\:?*"|<>]/g, '_');

		// shorten the name with a little bit of leading context to help find the file manually if necessary
		testName = testName.substring(0, 128) + '-' + crypto.createHash('md5').update(testName).digest('hex');

		return path.join(basePath, ...testNameParts, `${testName}.png`);
	};
}

const generateReferenceName = getScreenshotName(path.join(process.cwd(), 'tests/screenshot/dist/screenshots/reference')),
	generateScreenshotName = getScreenshotName(path.join(process.cwd(), 'tests/screenshot/dist/screenshots/screen')),
	generateDiffName = getScreenshotName(path.join(process.cwd(), 'tests/screenshot/dist/screenshots/diff'));

const comparator = new VisualRegressionCompare.LocalCompare({
	referenceName: generateReferenceName,
	screenshotName: generateScreenshotName,
	diffName: generateDiffName,
	misMatchTolerance: 0.005
});

function initFile (name, content) {
	const dir = path.dirname(name);

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, {recursive: true});
	} else {
		try {
			fs.unlinkSync(name);
		} catch (err) {}
	}

	fs.appendFileSync(name, content, 'utf8');
}

function onPrepare () {
	if (!fs.existsSync('tests/screenshot/dist/screenshots/reference')) {
		console.log('No reference screenshots found, creating new references!');
	}

	initFile(failedScreenshotFilename, failedScreenshotHeader);
	initFile(newScreenshotFilename, newScreenshotHeader);

	return buildApps('screenshot');
}

function beforeTest (testData) {
	// If title doesn't have a '/', it's not a screenshot test, don't save
	if (testData && testData.title && testData.title.indexOf('/') > 0) {
		const filename = generateReferenceName({test: testData});
		if (!fs.existsSync(filename)) {
			fs.open(newScreenshotFilename, 'a', (err, fd) => {
				const distPath = path.join(process.cwd(), 'tests', 'screenshot', 'dist'),
					relativeName = path.relative(distPath, filename);
				if (err) {
					console.error('Unable to create log file!');
				} else {
					const output = {title: testData.title.replace(/~\//g, '/'), path: relativeName};
					fs.appendFile(fd, `${JSON.stringify(output)},`, 'utf8', () => {
						fs.close(fd);
					});
				}
			});
		}
	}
}

function afterTest (testData, context, {passed}) {
	// If this doesn't include context data, not a screenshot test
	if (testData && testData.title && context && context.params) {
		if (!passed) {
			fs.open(failedScreenshotFilename, 'a', (err, fd) => {
				const distPath = path.join(process.cwd(), 'tests', 'screenshot', 'dist'),
					diffPath = path.relative(distPath, generateDiffName({test: testData})),
					referencePath = path.relative(distPath, generateReferenceName({test: testData})),
					screenPath = path.relative(distPath, generateScreenshotName({test: testData}));
				if (err) {
					console.error('Unable to create failed test log file!');
				} else {
					const title = testData.title.replace(/~\//g, '/');
					const {params, url} = context;
					const output = {title, diffPath, referencePath, screenPath, params, url};
					fs.appendFile(fd, `${JSON.stringify(output)},`, 'utf8', () => {
						fs.close(fd);
					});
				}
			});
		}
	}
}


function onComplete () {
	const {size: newSize} = fs.statSync(newScreenshotFilename),
		{size: failedSize} = fs.statSync(failedScreenshotFilename);

	if (newSize !== Buffer.byteLength(newScreenshotHeader, 'utf8')) {
		fs.appendFileSync(newScreenshotFilename, newScreenshotFooter, 'utf8');
		process.on('exit', () => {
			console.log(`New screenshots created.  Open ${newScreenshotFilename} to view.`);
		});
	} else {
		fs.appendFileSync(newScreenshotFilename, newScreenshotFooter, 'utf8');
	}
	if (failedSize !== Buffer.byteLength(failedScreenshotHeader, 'utf8')) {
		fs.appendFileSync(failedScreenshotFilename, failedScreenshotFooter, 'utf8');
		process.on('exit', () => {
			console.log(`Screenshot diffs created.  Open ${failedScreenshotFilename} to view.`);
		});
	} else {
		fs.appendFileSync(failedScreenshotFilename, failedScreenshotFooter, 'utf8');
	}
}


module.exports = {
	afterTest,
	beforeTest,
	comparator,
	onComplete,
	onPrepare
};

const cryptoModule = require('crypto'),
	path = require('path'),
	fs = require('fs');

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

		// shorten the name with a bit of leading context to help find the file manually if necessary
		testName = testName.substring(0, 128) + '-' + cryptoModule.createHash('md5').update(testName).digest('hex');
		let screenshotFileName = path.join(basePath, ...testNameParts, `${testName}.png`);
		return screenshotFileName.replace(/ /g, '_');
	};
}

const distPath = path.join(process.cwd(), 'tests', 'screenshot', 'dist');
const baselineRelativePath = 'screenshots/reference';
const screenshotRelativePath = 'screenshots/screen';
const baselineFolder = path.join(distPath, baselineRelativePath);
const screenshotFolder = path.join(distPath, screenshotRelativePath);

const generateReferenceName = getScreenshotName(baselineFolder);

function initFile (name, content) {
	const dir = path.dirname(name);

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, {recursive: true});
	} else {
		try {
			fs.unlinkSync(name);
		} catch (err) {
			// do nothing
		}
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
		testData.ctx.isNewScreenshot = !fs.existsSync(filename);

		const specsPath = testData.title.split('~/');
		specsPath.pop();
		const referenceSpecsPath = path.join('tests/screenshot/dist/screenshots/reference', ...specsPath).replace(/ /g, '_');
		if (testData.ctx.isNewScreenshot) {
			fs.mkdirSync(referenceSpecsPath, {recursive: true});
		}
	}
}

function afterTest (testData, _context, {passed}) {
	// If this doesn't include context data, not a screenshot test
	if (testData && testData.title && testData.context && testData.context.params) {
		const fileName = testData.context.fileName.replace(/ /g, '_') + '.png';
		const referencePath = path.join(baselineRelativePath, fileName);

		if (_context.isNewScreenshot) {
			fs.open(newScreenshotFilename, 'a', (err, fd) => {
				if (err) {
					console.error('Unable to create log file!');
				} else {
					const {params, url} = testData.context;
					const output = {title: testData.title.replace(/~\//g, '/'), path: referencePath, params, url};
					fs.appendFile(fd, `${JSON.stringify(output)},`, 'utf8', () => {
						fs.close(fd);
					});
				}
			});
		}

		if (!passed) {
			const screenPath = path.join(screenshotRelativePath, 'actual', fileName);
			const diffPath = path.join(screenshotRelativePath, 'diff', fileName);
			fs.open(failedScreenshotFilename, 'a', (err, fd) => {
				if (err) {
					console.error('Unable to create failed test log file!');
				} else {
					const title = testData.title.replace(/~\//g, '/');
					const {params, url} = testData.context;
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
			console.log(`New screenshots created.  Use 'open ${newScreenshotFilename}' to view.`);
		});
	} else {
		fs.appendFileSync(newScreenshotFilename, newScreenshotFooter, 'utf8');
	}
	if (failedSize !== Buffer.byteLength(failedScreenshotHeader, 'utf8')) {
		fs.appendFileSync(failedScreenshotFilename, failedScreenshotFooter, 'utf8');
		process.on('exit', () => {
			console.log(`Screenshot diffs created.  Use 'open ${failedScreenshotFilename}' to view.`);
		});
	} else {
		fs.appendFileSync(failedScreenshotFilename, failedScreenshotFooter, 'utf8');
	}
}


module.exports = {
	afterTest,
	baselineFolder,
	beforeTest,
	onComplete,
	onPrepare,
	screenshotFolder
};

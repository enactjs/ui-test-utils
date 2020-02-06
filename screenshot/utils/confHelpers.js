const path = require('path'),
	fs = require('fs'),
	os = require('os');
const VisualRegressionCompare = require('wdio-visual-regression-service/compare');
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
		const testName = context.test.title;
		return path.join(basePath, `${testName}.png`);
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
					const output = {title: testData.title, path: relativeName};
					fs.appendFile(fd, `${JSON.stringify(output)},`, 'utf8', () => {
						fs.close(fd);
					});
				}
			});
		}
	}
}

function afterTest (testData) {
	// If this doesn't include context data, not a screenshot test
	if (testData && testData.title && testData.context && testData.context.params) {
		if (!testData.passed) {
			fs.open(failedScreenshotFilename, 'a', (err, fd) => {
				const distPath = path.join(process.cwd(), 'tests', 'screenshot', 'dist'),
					diffPath = path.relative(distPath, generateDiffName({test: testData})),
					referencePath = path.relative(distPath, generateReferenceName({test: testData})),
					screenPath = path.relative(distPath, generateScreenshotName({test: testData}));
				if (err) {
					console.error('Unable to create failed test log file!');
				} else {
					const title = testData.title;
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
		console.log(`New screenshots created.  Open ${newScreenshotFilename} to view.`);
	} else {
		fs.appendFileSync(newScreenshotFilename, newScreenshotFooter, 'utf8');
	}
	if (failedSize !== Buffer.byteLength(failedScreenshotHeader, 'utf8')) {
		fs.appendFileSync(failedScreenshotFilename, failedScreenshotFooter, 'utf8');
		console.log(`Screenshot diffs created.  Open ${failedScreenshotFilename} to view.`);
	} else {
		fs.appendFileSync(failedScreenshotFilename, failedScreenshotFooter, 'utf8');
	}
}

function ipAddress () {
	const ifaces = os.networkInterfaces();
	let address = 'localhost';

	Object.keys(ifaces).forEach(function (ifname) {
		let iface = ifaces[ifname][0];

		if (!iface || 'IPv4' !== iface.family || iface.internal !== false) {
			// skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
			return;
		}

		address = iface.address;
	});
	return address;
}

module.exports = {
	afterTest,
	beforeTest,
	comparator,
	ipAddress,
	onComplete,
	onPrepare
};

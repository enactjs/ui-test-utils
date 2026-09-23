import cryptoModule from 'crypto';
import path from 'path';
import fs from 'fs';

import buildApps from '../../src/build-apps.js';
import {makeHeader} from './headerTemplate.js';

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

async function setScreenResolution (data) {
	// in Chrome 132, the browser window size takes into account also the address bar and tab area
	const [width, height] = (data?.portrait || data.ctx?.portrait) ? [1080, 2007] : [1920, 1167];

	await browser.setWindowSize(width, height);
	// Small pause to let window resize complete
	await browser.pause(500);
}

const distPath = path.join(process.cwd(), 'tests', 'screenshot', 'dist');
const baselineRelativePath = 'screenshots/reference';
const screenshotRelativePath = 'screenshots/screen';
const baselineFolder = path.join(distPath, baselineRelativePath);
const screenshotFolder = path.join(distPath, screenshotRelativePath);
const pendingFailuresFolder = path.join(distPath, 'pending-failures');

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
	global.sessionFailures = new Map();
	global.failedSessions = new Set();

	// Clear any leftover pending-failure files from a previous run
	if (fs.existsSync(pendingFailuresFolder)) {
		fs.rmSync(pendingFailuresFolder, {recursive: true, force: true});
	}
	fs.mkdirSync(pendingFailuresFolder, {recursive: true});

	if (!fs.existsSync('tests/screenshot/dist/screenshots/reference')) {
		console.log('No reference screenshots found, creating new references!');
	}

	initFile(failedScreenshotFilename, failedScreenshotHeader);
	initFile(newScreenshotFilename, newScreenshotHeader);

	return buildApps('screenshot');
}

function isSessionDeadError (error) {
	const msg = (error && error.message) || '';
	return /ECONNREFUSED|ECONNRESET|invalid session|session deleted|session is marked|not reachable|chrome not reachable|disconnected|aborted|HEADERS_TIMEOUT/i.test(msg);
}

function resetSessionFailures (sessionId) {
	if (global.sessionFailures && sessionId) {
		global.sessionFailures.set(sessionId, 0);
	}
	if (global.failedSessions && sessionId) {
		global.failedSessions.delete(sessionId);
	}
}

function markRecentlyRecovered (sessionId) {
	if (!global.recentlyRecovered) {
		global.recentlyRecovered = new Set();
	}
	global.recentlyRecovered.add(sessionId);
	resetSessionFailures(sessionId);
}

async function reloadBrowserSession (timeout = 30000) {
	await Promise.race([
		browser.reloadSession(),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Recovery timeout')), timeout)
		)
	]);
	markRecentlyRecovered(browser.sessionId);
}

/* Checks if a browser session is healthy. If not, it will attempt to recover. */
async function checkSessionHealth () {
	const sessionId = browser.sessionId;

	if (global.failedSessions && global.failedSessions.has(sessionId)) {
		console.log(`Session ${sessionId} was marked failed - attempting reload`);
		try {
			await reloadBrowserSession();
			console.log(`Session resurrected as ${browser.sessionId}`);
			return;
		} catch (e) {
			throw new Error('Session is marked as failed - skipping remaining tests');
		}
	}

	// Skip health check if the session was just recovered
	if (global.recentlyRecovered && global.recentlyRecovered.has(sessionId)) {
		global.recentlyRecovered.delete(sessionId);
		return;
	}

	try {
		await Promise.race([
			browser.execute(function () { return true; }),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Health check timeout')), 3000)
			)
		]);
		resetSessionFailures(sessionId);
	} catch (e) {
		const failures = (global.sessionFailures?.get(sessionId) || 0) + 1;
		if (global.sessionFailures) {
			global.sessionFailures.set(sessionId, failures);
		}

		console.log(`Session ${sessionId} health check failed (failure ${failures}/3): ${e.message}`);

		try {
			await reloadBrowserSession();
			console.log(`Session recovered as ${browser.sessionId}`);
		} catch (recoveryError) {
			console.log(`Recovery attempt failed: ${recoveryError.message}`);
			if (failures >= 3) {
				if (global.failedSessions) {
					global.failedSessions.add(sessionId);
				}
				throw new Error('Session health check failed - marking as dead');
			}
		}
	}
}

async function cleanUpSessionHealthCheck (testData, error) {
	if (!error) {
		resetSessionFailures(browser.sessionId);
		return;
	}

	console.log(`afterTest error for "${testData.title}": ${error.message}`);

	// Font / waitUntil / mocha timeouts are test failures. Do not kill Chrome for them.
	if (!isSessionDeadError(error)) {
		return;
	}

	const sessionId = browser.sessionId;

	if (!global.sessionFailures) {
		global.sessionFailures = new Map();
	}

	const failures = (global.sessionFailures.get(sessionId) || 0) + 1;
	global.sessionFailures.set(sessionId, failures);

	console.log(`Session death #${failures} in ${sessionId} - test: "${testData.title}"`);

	if (failures >= 3) {
		if (!global.failedSessions) {
			global.failedSessions = new Set();
		}
		global.failedSessions.add(sessionId);
	}

	console.log(`Attempting recovery for session ${sessionId} (attempt ${failures}/3)`);

	try {
		await reloadBrowserSession();
		console.log(`Session recovered as ${browser.sessionId}`);
	} catch (recoveryError) {
		console.error(`Session recovery failed: ${recoveryError.message}`);
	}
}

async function beforeTest (testData) {
	await checkSessionHealth();
	await setScreenResolution(testData);

	// If title doesn't have a '/', it's not a screenshot test, don't save
	if (testData && testData.title && testData.title.indexOf('/') > 0) {
		const filename = generateReferenceName({test: testData});
		testData.ctx.isNewScreenshot = !fs.existsSync(filename);

		// if there are no reference screenshots, we must create the folder before running the tests.
		const specsPath = testData.title.split('~/');
		specsPath.pop();
		const referenceSpecsPath = path.join('tests/screenshot/dist/screenshots/reference', ...specsPath).replace(/ /g, '_');
		if (testData.ctx.isNewScreenshot) {
			fs.mkdirSync(referenceSpecsPath, {recursive: true});
		}
	}
}

async function afterTest (testData, _context, {error, passed}) {
	// WDIO v9 passes `testData` as an identity snapshot captured before the test body runs,
	// so the `context` assigned inside the test is not present on it.
	const testContext = (_context && _context.test && _context.test.context) || testData.context;

	// If this doesn't include context data, not a screenshot test
	if (testData && testData.title && testContext && testContext.params) {
		const fileName = testContext.fileName.replace(/ /g, '_') + '.png';
		const referencePath = path.join(baselineRelativePath, fileName);

		if (_context.isNewScreenshot) {
			fs.open(newScreenshotFilename, 'a', (err, fd) => {
				if (err) {
					console.error('Unable to create log file!');
				} else {
					const {params, url} = testContext;
					const output = {title: testData.title.replace(/~\//g, '/'), path: referencePath, params, url};
					fs.appendFile(fd, `${JSON.stringify(output)},`, 'utf8', () => {
						fs.close(fd);
					});
				}
			});
		}

		// Use a stable filename derived from the test identifier so the worker can find and
		// delete the right file on a passing retry, even across different worker processes.
		const testIdentifier = testData.title + '::' + fileName;
		const pendingKey = cryptoModule.createHash('md5').update(testIdentifier).digest('hex');
		const pendingFile = path.join(pendingFailuresFolder, `${pendingKey}.json`);

		if (!passed) {
			// Track pending failed tests to avoid duplicate logging during retries
			const screenPath = path.join(screenshotRelativePath, 'actual', fileName);
			const diffPath = path.join(screenshotRelativePath, 'diff', fileName);
			const title = testData.title.replace(/~\//g, '/');
			const {params, url} = testContext;
			const output = {title, diffPath, referencePath, screenPath, params, url};
			try {
				fs.writeFileSync(pendingFile, JSON.stringify(output), 'utf8');
			} catch (writeErr) {
				console.error(`Unable to stage failure for "${title}": ${writeErr.message}`);
			}
		} else {
			// Test passed (possibly on retry) — remove the staged failure so it won't be reported
			try {
				fs.unlinkSync(pendingFile);
			} catch (e) {
				// test passed on first attempt — nothing to do
			}
		}
	}

	await cleanUpSessionHealthCheck(testData, error);
	try {
		await setScreenResolution(testData);
	} catch (e) {
		console.log(`afterTest setScreenResolution skipped: ${e.message}`);
	}
}

function onComplete () {
	// Write all tests that ultimately failed
	if (fs.existsSync(pendingFailuresFolder)) {
		const pendingFiles = fs.readdirSync(pendingFailuresFolder).filter(f => f.endsWith('.json'));
		for (const file of pendingFiles) {
			try {
				const raw = fs.readFileSync(path.join(pendingFailuresFolder, file), 'utf8');
				fs.appendFileSync(failedScreenshotFilename, `${raw},`, 'utf8');
			} catch (e) {
				console.error(`Failed to flush pending failure ${file}: ${e.message}`);
			}
		}
		fs.rmSync(pendingFailuresFolder, {recursive: true, force: true});
	}

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

export {
	afterTest,
	baselineFolder,
	beforeTest,
	onComplete,
	onPrepare,
	screenshotFolder
};

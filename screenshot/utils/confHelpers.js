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

const distPath = path.join(process.cwd(), 'tests', 'screenshot', 'dist');
const baselineRelativePath = 'screenshots/reference';
const screenshotRelativePath = 'screenshots/screen';
const baselineFolder = path.join(distPath, baselineRelativePath);
const screenshotFolder = path.join(distPath, screenshotRelativePath);

// afterTest (worker) writes a file on failure and deletes it on pass.
// onComplete (main process) reads whatever survived and flushes them to failedTests.html.
const pendingFailuresDir = path.join(distPath, 'pending-failures');

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
	if (fs.existsSync(pendingFailuresDir)) {
		fs.rmSync(pendingFailuresDir, {recursive: true, force: true});
	}
	fs.mkdirSync(pendingFailuresDir, {recursive: true});

	if (!fs.existsSync('tests/screenshot/dist/screenshots/reference')) {
		console.log('No reference screenshots found, creating new references!');
	}

	initFile(failedScreenshotFilename, failedScreenshotHeader);
	initFile(newScreenshotFilename, newScreenshotHeader);

	return buildApps('screenshot');
}

/* Checks if a browser session is healthy. If not, it will attempt to recover. */
async function checkSessionHealth () {
	const sessionId = browser.sessionId;

	// Check if this session has been marked as dead
	if (global.failedSessions && global.failedSessions.has(sessionId)) {
		throw new Error('Session is marked as failed - skipping remaining tests');
	}

	// Skip health check if the session was just recovered
	if (global.recentlyRecovered && global.recentlyRecovered.has(sessionId)) {
		global.recentlyRecovered.delete(sessionId);
	} else {
		// Quick health check with a short timeout
		try {
			await Promise.race([
				browser.execute(() => true),
				new Promise((_, reject) =>
					setTimeout(() => reject(new Error('Health check timeout')), 3000)
				)
			]);

			// Success - reset failure counter
			if (global.sessionFailures) {
				global.sessionFailures.set(sessionId, 0);
			}
		} catch (e) {
			// Track consecutive failures
			const failures = (global.sessionFailures?.get(sessionId) || 0) + 1;
			if (global.sessionFailures) {
				global.sessionFailures.set(sessionId, failures);
			}

			console.log(`Session ${sessionId} health check failed (failure ${failures}/3)`);

			// Only mark as dead after 3 consecutive failures
			if (failures >= 3) {
				console.log(`Session ${sessionId} has failed 3 times - marking as dead`);
				if (global.failedSessions) {
					global.failedSessions.add(sessionId);
				}
				throw new Error('Session health check failed - marking as dead');
			}

			// Try quick recovery for the first 2 failures
			console.log(`Attempting quick recovery for session ${sessionId}...`);
			try {
				await browser.reloadSession();
				await browser.setWindowSize(1920, 1167);
				console.log(`Session ${sessionId} recovered`);
			} catch (recoveryError) {
				console.log(`Recovery attempt failed, will retry next test`);
			}
		}
	}
}

async function cleanUpSessionHealthCheck (testData, error) {
	if (error) {
		const isTimeout = error.message &&
			(error.message.includes('timeout') ||
				error.message.includes('aborted') ||
				error.message.includes('HEADERS_TIMEOUT') ||
				error.message.includes('ECONNREFUSED'));

		if (isTimeout) {
			const sessionId = browser.sessionId;

			// Track consecutive failures
			if (!global.sessionFailures) {
				global.sessionFailures = new Map();
			}

			const failures = (global.sessionFailures.get(sessionId) || 0) + 1;
			global.sessionFailures.set(sessionId, failures);

			console.log(`Timeout #${failures} in session ${sessionId} - test: "${testData.title}"`);

			// Circuit breaker: after 3 consecutive timeouts, kill the session
			if (failures >= 3) {
				console.log(`Session ${sessionId} has failed 3 times consecutively - marking as dead`);

				if (!global.failedSessions) {
					global.failedSessions = new Set();
				}
				global.failedSessions.add(sessionId);

				// Try to clean up with very short timeout, then give up
				try {
					await Promise.race([
						(async () => {
							try {
								await browser.execute(() => window.stop());
							} catch (e) {
								// Ignore
							}
							await browser.deleteSession();
						})(),
						new Promise((_, reject) =>
							setTimeout(() => reject(new Error('Cleanup timeout')), 2000)
						)
					]);
					console.log('Session cleanup completed');
				} catch (e) {
					console.log('Session cleanup timed out - session is dead');
				}

				return; // Don't try to recover
			}

			// For first 2 failures, attempt recovery
			console.log(`Attempting recovery for session ${sessionId} (attempt ${failures}/3)`);

			try {
				// Try light recovery with timeout
				await Promise.race([
					(async () => {
						try {
							await browser.execute(() => window.stop());
						} catch (e) {
							// Ignore
						}
						await browser.deleteSession();
						await browser.reloadSession();
						await browser.setWindowSize(1920, 1167);
						await browser.pause(1000);
					})(),
					new Promise((_, reject) =>
						setTimeout(() => reject(new Error('Recovery timeout')), 10000)
					)
				]);

				console.log('Session recovered successfully');

				// Reset failure count on successful recovery
				global.sessionFailures.set(sessionId, 0);

				// Mark that we just recovered - skip next health check
				if (!global.recentlyRecovered) {
					global.recentlyRecovered = new Set();
				}
				global.recentlyRecovered.add(sessionId);

			} catch (recoveryError) {
				console.error(`Session recovery failed: ${recoveryError.message}`);
			}
		} else {
			const sessionId = browser.sessionId;
			if (global.sessionFailures && global.sessionFailures.has(sessionId)) {
				global.sessionFailures.set(sessionId, 0);
			}
		}
	} else {
		const sessionId = browser.sessionId;
		if (global.sessionFailures && global.sessionFailures.has(sessionId)) {
			global.sessionFailures.set(sessionId, 0);
		}
	}
}

async function beforeTest (testData) {
	await checkSessionHealth();

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

		// Use a stable filename derived from the test identifier so the worker can find and
		// delete the right file on a passing retry, even across different worker processes.
		const testIdentifier = testData.title + '::' + fileName;
		const pendingKey = cryptoModule.createHash('md5').update(testIdentifier).digest('hex');
		const pendingFile = path.join(pendingFailuresDir, `${pendingKey}.json`);

		if (!passed) {
			// Track pending failed tests to avoid duplicate logging during retries
			const screenPath = path.join(screenshotRelativePath, 'actual', fileName);
			const diffPath = path.join(screenshotRelativePath, 'diff', fileName);
			const title = testData.title.replace(/~\//g, '/');
			const {params, url} = testData.context;
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
}

function onComplete () {
	// Write all tests that ultimately failed
	if (fs.existsSync(pendingFailuresDir)) {
		const pendingFiles = fs.readdirSync(pendingFailuresDir).filter(f => f.endsWith('.json'));
		for (const file of pendingFiles) {
			try {
				const raw = fs.readFileSync(path.join(pendingFailuresDir, file), 'utf8');
				fs.appendFileSync(failedScreenshotFilename, `${raw},`, 'utf8');
			} catch (e) {
				console.error(`Failed to flush pending failure ${file}: ${e.message}`);
			}
		}
		fs.rmSync(pendingFailuresDir, {recursive: true, force: true});
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

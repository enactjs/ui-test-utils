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
	console.log('📋 Screenshot onPrepare starting...');

	if (!fs.existsSync('tests/screenshot/dist/screenshots/reference')) {
		console.log('⚠️  No reference screenshots found, creating new references!');
	}

	try {
		initFile(failedScreenshotFilename, failedScreenshotHeader);
		initFile(newScreenshotFilename, newScreenshotHeader);
		console.log('✅ Initialized screenshot log files');
	} catch (e) {
		console.error('❌ Failed to initialize log files:', e);
		throw e;
	}

	console.log('🔨 Building screenshot apps...');

	return buildApps('screenshot')
		.then(() => {
			console.log('✅ Build complete');

			// Validate that the build created the necessary files
			const distPath = path.join(process.cwd(), 'tests', 'screenshot', 'dist');
			console.log('📁 Checking build output in:', distPath);

			if (!fs.existsSync(distPath)) {
				throw new Error(`Build output directory not found: ${distPath}`);
			}

			// Check for index.html or main entry point
			const possibleEntryPoints = [
				path.join(distPath, 'index.html'),
				path.join(distPath, 'Limestone-View', 'index.html'),
				path.join(distPath, 'Limestone-View.html')
			];

			let foundEntryPoint = false;
			for (const entryPoint of possibleEntryPoints) {
				if (fs.existsSync(entryPoint)) {
					console.log('✅ Found entry point:', entryPoint);
					const stats = fs.statSync(entryPoint);
					console.log(`   File size: ${stats.size} bytes`);

					// Read first 500 characters to see if it has content
					const content = fs.readFileSync(entryPoint, 'utf8');
					console.log(`   Content preview: ${content.substring(0, 200)}...`);

					foundEntryPoint = true;
					break;
				}
			}

			if (!foundEntryPoint) {
				console.log('❌ No entry point found. Directory contents:');
				try {
					const listDir = (dir, indent = '') => {
						const items = fs.readdirSync(dir);
						items.forEach(item => {
							const fullPath = path.join(dir, item);
							const stats = fs.statSync(fullPath);
							console.log(`${indent}${item} (${stats.isDirectory() ? 'DIR' : stats.size + ' bytes'})`);
							if (stats.isDirectory() && indent.length < 4) {
								listDir(fullPath, indent + '  ');
							}
						});
					};
					listDir(distPath);
				} catch (e) {
					console.log('Could not read directory:', e.message);
				}
				throw new Error('Build did not create expected entry point files');
			}

			// Give extra time for static server to initialize
			console.log('⏳ Waiting 5 seconds for static server to fully initialize...');
			return new Promise(resolve => setTimeout(resolve, 5000));
		})
		.catch(err => {
			console.error('❌ Screenshot build failed:', err);
			console.error('Stack:', err.stack);
			throw err;
		});
}

/**
 * Before test hook with circuit breaker pattern for Chrome 132
 */
async function beforeTest (testData) {
	const workerId = browser.sessionId;

	// Check if this worker has been marked as dead
	if (global.failedWorkers && global.failedWorkers.has(workerId)) {
		console.log(`⏭️  Skipping test - worker ${workerId} is marked as failed`);
		throw new Error('Worker is marked as failed - skipping remaining tests');
	}

	// Quick health check with short timeout
	try {
		await Promise.race([
			browser.execute(() => true),
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Health check timeout')), 3000)
			)
		]);
	} catch (e) {
		console.log(`❌ Worker ${workerId} health check failed`);

		// Mark worker as dead - don't try to recover
		if (global.failedWorkers) {
			global.failedWorkers.add(workerId);
		}

		throw new Error('Worker health check failed - marking as dead');
	}

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

	if (error) {
		const isTimeout = error.message &&
			(error.message.includes('timeout') ||
				error.message.includes('aborted') ||
				error.message.includes('HEADERS_TIMEOUT') ||
				error.message.includes('ECONNREFUSED'));

		if (isTimeout) {
			const workerId = browser.sessionId;

			// Track consecutive failures
			if (!global.workerFailures) {
				global.workerFailures = new Map();
			}

			const failures = (global.workerFailures.get(workerId) || 0) + 1;
			global.workerFailures.set(workerId, failures);

			console.log(`⚠️  Timeout #${failures} in worker ${workerId} - test: "${testData.title}"`);

			// Circuit breaker: after 3 consecutive timeouts, kill the worker
			if (failures >= 3) {
				console.log(`🛑 Worker ${workerId} has failed 3 times consecutively - marking as dead`);

				if (!global.failedWorkers) {
					global.failedWorkers = new Set();
				}
				global.failedWorkers.add(workerId);

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
					console.log('Worker cleanup completed');
				} catch (e) {
					console.log('Worker cleanup timed out - worker is dead');
				}

				return; // Don't try to recover
			}

			// For first 2 failures, attempt recovery
			console.log(`🔄 Attempting recovery for worker ${workerId} (attempt ${failures}/3)`);

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
						await browser.pause(500);
					})(),
					new Promise((_, reject) =>
						setTimeout(() => reject(new Error('Recovery timeout')), 5000)
					)
				]);

				console.log('✅ Session recovered successfully');

				// Reset failure count on successful recovery
				global.workerFailures.set(workerId, 0);

			} catch (recoveryError) {
				console.error(`❌ Session recovery failed: ${recoveryError.message}`);

				global.workerFailures.set(workerId, failures + 1);
			}
		} else {
			const workerId = browser.sessionId;
			if (global.workerFailures && global.workerFailures.has(workerId)) {
				global.workerFailures.set(workerId, 0);
			}
		}
	} else if (passed) {
		const workerId = browser.sessionId;
		if (global.workerFailures && global.workerFailures.has(workerId)) {
			global.workerFailures.set(workerId, 0);
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

	// Summary of worker failures
	if (global.failedWorkers && global.failedWorkers.size > 0) {
		console.log(`\n⚠️  ${global.failedWorkers.size} worker(s) failed during test execution`);
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

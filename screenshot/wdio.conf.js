import {configure} from '../config/wdio.conf.js';
import {afterTest, baselineFolder, beforeTest, onComplete, onPrepare as screenshotOnPrepare, screenshotFolder} from './utils/confHelpers.js';

const config = configure({
	base: 'screenshot',
	services: [[
		'visual',
		{
			baselineFolder: baselineFolder,
			formatImageName: '{tag}',
			screenshotPath: screenshotFolder,
			autoSaveBaseline: true,
			waitForFontsLoaded: true
		}
	]],
	//
	// =====
	// Hooks
	// =====
	// WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
	// it and to build services around it. You can either apply a single function or an array of
	// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
	// resolved to continue.
	/**
	 * Gets executed once before all workers get launched.
	 * Combines base onPrepare with screenshot-specific onPrepare
	 */
	onPrepare: async function (config, capabilities) {
		try {
			// First initialize circuit breaker (from base config)
			global.workerFailures = new Map();
			global.failedWorkers = new Set();
			console.log('🚀 2 Starting tests with Chrome 132 optimizations');

			// Run screenshot build and validation
			console.log('🔨 3 Running screenshot app build...');

			try {
				await screenshotOnPrepare();
				console.log('✅ Screenshot build complete');
			} catch (buildError) {
				console.error('❌ Screenshot build failed:', buildError);
				console.error('Build error stack:', buildError.stack);
				throw buildError; // Re-throw to stop test execution
			}
		} catch (error) {
			console.error('❌ FATAL: onPrepare failed:', error);
			console.error('Error stack:', error.stack);
			throw error;
		}
	},
	/**
	 * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
	 * @param {Object} test test details
	 */
	beforeTest: beforeTest,
	/**
	 * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
	 * @param {Object} test test details
	 */
	afterTest: afterTest,
	/**
	 * Gets executed after all workers got shut down and the process is about to exit. It is not
	 * possible to defer the end of the process using a promise.
	 * @param {Object} exitCode 0 - success, 1 - fail
	 */
	onComplete: onComplete
});

export default {config};
export {config};

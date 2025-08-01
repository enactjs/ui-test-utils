import buildApps from '../src/build-apps.js';
import fs from 'fs';
let chalk;
import('chalk').then(({default: _chalk}) => {
	chalk = _chalk;
});

import {configure} from '../config/wdio.conf.js';

const config = configure({
	base: 'ui',
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
	 */
	onPrepare: function () {
		return buildApps('ui');
	},
	/**
	 * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
	 * @param {Object} testCase test details
	 * @param {Object} _context scope object the test was executed with (unused)
	 * @param {Object} result test result
	 * @param {Number} result.duration duration of test
	 * @param {Boolean} result.passed true if test has passed, otherwise false
	 */
	afterTest: async function (testCase, _context, {duration, passed}) {
		if (duration > 2000) {
			console.log(chalk.yellow(`Long running test case: ${testCase.title}: ${duration}ms`));
		}
		this.__duration = (this.__duration || 0) + duration;
		// if test passed, ignore, else take and save screenshot.
		if (passed) {
			return;
		}
		// get current test title and clean it, to use it as file name
		const filename = encodeURIComponent(testCase.title.replace(/\s+/g, '-'));
		// build file path
		const filePath = this.screenshotPath + filename + '.png';
		if (!fs.existsSync(this.screenshotPath)) {
			fs.mkdirSync(this.screenshotPath, {recursive: true});	// May only work recursively on Node 10.12+
		}
		// save screenshot
		await browser.saveScreenshot(filePath);
		console.log('\n\tScreenshot location:', filePath, '\n');
	},
	afterSuite: function (_suite) {
		// Note: This duration will be less than reported by the various reporters. This seems like
		// the best we can do without access to the internal runner
		if (this.__duration > 80000) {
			console.log(chalk.yellow(`Long running suite: ${_suite.title}: ${this.__duration}ms`));
		}
	}
});

export default {config};
export {config};

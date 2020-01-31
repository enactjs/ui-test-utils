const buildApps = require('../src/build-apps'),
	fs = require('fs');

const {configure} = require('../config/wdio.conf.js');

exports.config = configure({
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
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 */
	onPrepare: function () {
		return buildApps('ui');
	},
	/**
	 * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
	 * @param {Object} test test details
	 */
	afterTest: function (testCase) {
		// if test passed, ignore, else take and save screenshot.
		if (testCase.passed) {
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
		browser.saveScreenshot(filePath);
		console.log('\n\tScreenshot location:', filePath, '\n');
	}
});

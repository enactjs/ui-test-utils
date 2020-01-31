const localIp = require('address').ip();
const {config} = require('../wdio.conf.js');

exports.config = Object.assign(
	{},
	config,
	{
		//
		// ============
		// Capabilities
		// ============
		// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
		// time. Depending on the number of capabilities, WebdriverIO launches several test
		// sessions. Within your capabilities you can overwrite the spec and exclude options in
		// order to group specific specs to a specific capability.
		//
		// If you have trouble getting all important capabilities together, check out the
		// Sauce Labs platform configurator - a great tool to configure your capabilities:
		// https://docs.saucelabs.com/reference/platforms-configurator
		//
		capabilities: [{
			// maxInstances can get overwritten per capability. So if you have an in-house Selenium
			// grid with only 5 firefox instances available you can make sure that not more than
			// 5 instances get started at a time.
			maxInstances: 1,
			//
			browserName: 'chrome',
			chromeOptions: {
				debuggerAddress: `${process.env.TV_IP}:9998`
			}
		}],
		//
		// Set a base URL in order to shorten url command calls. If your url parameter starts
		// with "/", then the base url gets prepended.
		baseUrl: `http://${localIp}:4567`,
		//
		// Test reporter for stdout.
		// The only one supported by default is 'dot'
		// see also: http://webdriver.io/guide/testrunner/reporters.html
		// reporters: ['dot'],
		//
		// Options to be passed to Mocha.
		// See the full list at http://mochajs.org/
		reporters: ['dot', 'spec'],
		mochaOpts: {
			ui: 'bdd',
			timeout: 30000
		},
		staticServerFolders: [
			{ mount: '/', path: './dist' }
		],
		/**
		 * Gets executed before test execution begins. At this point you can access to all global
		 * variables like `browser`. It is the perfect place to define custom commands.
		 * @param {Array.<Object>} capabilities list of capabilities details
		 * @param {Array.<String>} specs List of spec file paths that are to be run
		 */
		before: function () {
			let chai = require('chai'),
				dirtyChai = require('dirty-chai');
			chai.use(dirtyChai);
			global.expect = chai.expect;
			chai.Should();
			// Have to stub out these methods to prevent exceptions when running against
			// remote chrome session
			browser.setViewportSize = () => Promise.resolve({height: 1080, width: 1920});
			browser.windowHandleSize = () => Promise.resolve({height: 1080, width: 1920});
		}
	}
);

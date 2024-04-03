const parseArgs = require('minimist');
const {readChromeVersion} = require('../utils/readChromeVersionNumber');

const args = parseArgs(process.argv);

const visibleBrowser = !!args.visible,
	maxInstances = args.instances || 5,
	offline = args.offline;

module.exports.configure = (options) => {
	const {base, services} = options;
	const opts = Object.assign({}, options);
	const chromeVersionMajorNumber = readChromeVersion();

	delete opts.base;
	delete opts.before;
	delete opts.services;

	return Object.assign(
		opts,
		{
			path: '/',
			//
			// ====================
			// Runner Configuration
			// ====================
			//
			// WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
			// on a remote machine).
			runner: 'local',
			//
			// ==================
			// Specify Test Files
			// ==================
			// Define which test specs should run. The pattern is relative to the directory
			// from which `wdio` was called. Notice that, if you are calling `wdio` from an
			// NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
			// directory is where your package.json resides, so `wdio` will be called from there.
			//
			specs: [
				'../../tests/' + base + '/specs/**/*-specs.js'
			],
			// Patterns to exclude.
			exclude: [
				// 'path/to/excluded/files'
			],
			//
			// ============
			// Capabilities
			// ============
			// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
			// time. Depending on the number of capabilities, WebdriverIO launches several test
			// sessions. Within your capabilities you can overwrite the spec and exclude options in
			// order to group specific specs to a specific capability.
			//
			// First, you can define how many instances should be started at the same time. Let's
			// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
			// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
			// files and you set maxInstances to 10, all spec files will get tested at the same time
			// and 30 processes will get spawned. The property handles how many capabilities
			// from the same test should run tests.
			//
			maxInstances: 10,
			//
			// If you have trouble getting all important capabilities together, check out the
			// Sauce Labs platform configurator - a great tool to configure your capabilities:
			// https://docs.saucelabs.com/reference/platforms-configurator
			//
			capabilities: [{
				// maxInstances can get overwritten per capability. So if you have an in-house Selenium
				// grid with only 5 firefox instances available you can make sure that not more than
				// 5 instances get started at a time.
				maxInstances,
				//
				browserName: 'chrome',
				'goog:chromeOptions': visibleBrowser ? {} : {
					args: ['--headless', '--window-size=1920,1080']
				},
				'wdio:chromedriverOptions': process.env.CHROME_DRIVER_PATH ? {
					binary: process.env.CHROME_DRIVER_PATH
					// match chromedriver version from jenkins
				} : Number(chromeVersionMajorNumber) > 108 ? {} : {
					binary: 'C:\\chromedriver\\chromedriver_v108.exe'
				}
			}],
			//
			// ===================
			// Test Configurations
			// ===================
			// Define all options that are relevant for the WebdriverIO instance here
			//
			// Level of logging verbosity: trace | debug | info | warn | error | silent
			logLevel: 'silent',
			//
			// Enables colors for log output.
			coloredLogs: true,
			//
			// If you only want to run your tests until a specific amount of tests have failed use
			// bail (default is 0 - don't bail, run all tests).
			bail: 0,
			//
			// Saves a screenshot to a given path if a command fails.
			screenshotPath: './tests/' + base + '/errorShots/',
			//
			// Set a base URL in order to shorten url command calls. If your url parameter starts
			// with "/", then the base url gets prepended.
			baseUrl: 'http://localhost:4567',
			//
			// Default timeout for all waitFor* commands.
			waitforTimeout: 10000,
			//
			// Default timeout in milliseconds for request
			// if Selenium Grid doesn't send response
			connectionRetryTimeout: 90000,
			//
			// Default request retries count
			connectionRetryCount: 3,
			// Ignore deprecation warnings
			deprecationWarnings: false,
			//
			// Initialize the browser instance with a WebdriverIO plugin. The object should have the
			// plugin name as key and the desired plugin options as properties. Make sure you have
			// the plugin installed before running any tests. The following plugins are currently
			// available:
			// WebdriverCSS: https://github.com/webdriverio/webdrivercss
			// WebdriverRTC: https://github.com/webdriverio/webdriverrtc
			// Browserevent: https://github.com/webdriverio/browserevent
			// plugins: {
			//	 webdrivercss: {
			//		 screenshotRoot: 'my-shots',
			//		 failedComparisonsRoot: 'diffs',
			//		 misMatchTolerance: 0.05,
			//		 screenWidth: [320,480,640,1024]
			//	 },
			//	 webdriverrtc: {},
			//	 browserevent: {}
			// },
			//
			// Test runner services
			// Services take over a specific job you don't want to take care of. They enhance
			// your test setup with almost no effort. Unlike plugins, they don't add new
			// commands. Instead, they hook themselves up into the test process.
			services: [
				['selenium-standalone', {
					skipSeleniumInstall: offline,
					args: {
						drivers : {
							chrome : {
								version : process.env.CHROME_DRIVER,
								arch    : process.arch
							}
						}
					},
					installArgs: {
						drivers : {
							chrome : {
								version : process.env.CHROME_DRIVER,
								arch    : process.arch,
								baseURL : 'https://chromedriver.storage.googleapis.com'
							}
						}
					}
				}],
				['static-server', {
					folders: [
						{mount: '/', path: './tests/' + base + '/dist'}
					]
				}]
			].concat(services || []),
			//
			// Framework you want to run your specs with.
			// The following are supported: Mocha, Jasmine, and Cucumber
			// see also: http://webdriver.io/guide/testrunner/frameworks.html
			//
			// Make sure you have the wdio adapter package for the specific framework installed
			// before running any tests.
			framework: 'mocha',
			//
			// Test reporter for stdout.
			// The only one supported by default is 'dot'
			// see also: http://webdriver.io/guide/testrunner/reporters.html
			// reporters: ['dot'],
			//
			reporters: ['dot', 'spec'],
			// Options to be passed to Mocha.
			// See the full list at http://mochajs.org/
			mochaOpts: {
				ui: 'bdd',
				timeout: 60 * 60 * 1000
			},
			/**
			 * Gets executed before test execution begins. At this point you can access to all global
			 * variables like `browser`. It is the perfect place to define custom commands.
			 * @param {Array.<Object>} capabilities list of capabilities details
			 * @param {Array.<String>} specs List of spec file paths that are to be run
			 */
			before: async function () {
				await import ('expect-webdriverio');
				const chai = require('chai'),
					dirtyChai = require('dirty-chai');

				global.wdioExpect = global.expect;
				chai.use(dirtyChai);
				global.expect = chai.expect;
				chai.Should();

				if (options.before) {
					options.before();
				}
			}
		}
	);
};

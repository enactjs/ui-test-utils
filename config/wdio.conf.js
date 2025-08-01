import parseArgs from 'minimist';
import {execSync} from 'child_process';

const args = parseArgs(process.argv);

const visibleBrowser = !!args.visible,
	maxInstances = args.instances || 5,
	offline = args.offline;

export const configure = (options) => {
	const {base, services} = options;
	const opts = Object.assign({}, options);

	delete opts.base;
	delete opts.before;
	delete opts.services;

	if (!process.env.CHROME_DRIVER) {
		if (process.env.TV_IP && process.argv.find(arg => arg.includes('tv.conf'))) {
			process.env.CHROME_DRIVER = 2.44; // Currently, TV supports 83 and lower, but keep the previous version for safety.
		} else {
			let chromeVersionMajorNumber;
			try {
				if (process.platform === 'win32') {
					// Windows
					const chromeVersion = /\d+/.exec(execSync('wmic datafile where "name=\'C:\\\\Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe\'" get Version /value').toString());
					chromeVersionMajorNumber = (chromeVersion && chromeVersion[0]);
				} else if (process.platform === 'darwin') {
					// Mac
					const chromeVersion = /Chrome (\d+)/.exec(execSync('/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version'));
					chromeVersionMajorNumber = (chromeVersion && chromeVersion[1]);
				} else {
					const chromeVersion = /Chrome (\d+)/.exec(execSync('google-chrome -version'));
					chromeVersionMajorNumber = (chromeVersion && chromeVersion[1]);
				}
				let chromeDriverVersion;

				if (chromeVersionMajorNumber > 114) {
					chromeDriverVersion = execSync('curl https://googlechromelabs.github.io/chrome-for-testing/LATEST_RELEASE' + (chromeVersionMajorNumber ? ('_' + chromeVersionMajorNumber) : ''));
				} else {
					chromeDriverVersion = execSync('curl https://chromedriver.storage.googleapis.com/LATEST_RELEASE' + (chromeVersionMajorNumber ? ('_' + chromeVersionMajorNumber) : ''));
				}

				if (chromeDriverVersion.includes('Error') || !/\d+.\d+.\d+.\d+/.exec(chromeDriverVersion)) {
					throw new Error();
				} else {
					process.env.CHROME_DRIVER = chromeDriverVersion;
				}
			} catch (error) {
				console.log('ERROR: Cannot find Chrome driver from Chrome ' + chromeVersionMajorNumber);
				process.env.CHROME_DRIVER = 2.44;
			}
		}

		console.log('Chrome Driver Version : ' + process.env.CHROME_DRIVER);
	}

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
			// of the configuration file being run.
			//
			// The specs are defined as an array of spec files (optionally using wildcards
			// that will be expanded). The test for each spec file will be run in a separate
			// worker process. In order to have a group of spec files run in the same worker
			// process enclose them in an array within the specs array.
			//
			// The path of the spec files will be resolved relative from the directory of
			// the config file unless it's absolute.
			//
			specs: [
				'../../../tests/' + base + '/specs/**/*-specs.js'
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
			// files, and you set maxInstances to 10, all spec files will get tested at the same time
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
				'wdio:maxInstances': maxInstances,
				//
				browserName: 'chrome',
				/* WebdriverIO v8.14 and above downloads and uses the latest Chrome version when running tests.
				We need to specify a browser version that matches chromedriver version running in CI/CD environment to
				ensure testing accuracy.
				TODO: Update this version when chromedriver version in CI/CD is updated */
				browserVersion: '120.0.6099.109',
				'goog:chromeOptions': visibleBrowser ? {} : {
					args: ['--headless', '--window-size=1920,1080']
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
					skipSeleniumInstall: offline
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
			 */
			before: function () {
				global.wdioExpect = global.expect;

				if (options.before) {
					options.before();
				}
			}
		}
	);
};

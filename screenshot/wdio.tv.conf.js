const ipAddress = require('../utils/ipAddress.js');
const {config} = require('./wdio.conf.js');

const services = config.services.map(service => {
	if (service[0] === 'novus-visual-regression') {
		delete service[1].viewports;
	}
	return service;
});

exports.config = Object.assign(
	{},
	config,
	{
		services,

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
			'wdio:maxInstances': 1,
			//
			browserName: 'chrome',
			/* WebdriverIO v8.14 and above downloads and uses the latest Chrome version when running tests.
			We need to specify a browser version that match chromedriver version running in CI/CD environment to
			ensure testing accuracy.
			TODO: Update this version when chromedriver version in CI/CD is updated */
			browserVersion: '132.0.6834.159',
			'goog:chromeOptions': {
				debuggerAddress: `${process.env.TV_IP}:9998`
			},
			'wdio:enforceWebDriverClassic': true
		}],

		//
		// Set a base URL in order to shorten url command calls. If your url parameter starts
		// with "/", then the base url gets prepended.
		baseUrl: `http://${ipAddress()}:4567`,

		/**
		 * Gets executed before test execution begins. At this point you can access to all global
		 * variables like `browser`. It is the perfect place to define custom commands.
		 */
		before: function () {
			if (config.before) {
				config.before();
			}

			browser._options = {remote: true};

			// Have to stub out these methods to prevent exceptions when running against
			// remote chrome session
			browser.setViewportSize = () => Promise.resolve({height: 1080, width: 1920});
			browser.windowHandleSize = () => Promise.resolve({height: 1080, width: 1920});
		}
	}
);

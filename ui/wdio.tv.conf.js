const ipAddress = require('../utils/ipAddress.js');
const {config} = require('./wdio.conf.js');

exports.config = Object.assign(
	{},
	config,
	{
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

		baseUrl: `http://${ipAddress()}:4567`,

		before: function () {
			if (config.before) {
				config.before();
			}

			browser._options = {remote: true};
		}
	}
);

const ipAddress = require('../utils/ipAddress.js');
const {config} = require('./wdio.conf.js');

exports.config = Object.assign(
	{},
	config,
	{
		capabilities: [{
			maxInstances: 1,

			browserName: 'chrome',
			/* WebdriverIO v8.14 and above downloads and uses the latest Chrome version when running tests.
			We need to specify a browser version that match chromedriver version running in CI/CD environment to
			ensure testing accuracy.
			TODO: Update this version when chromedriver version in CI/CD is updated */
			browserVersion: '120.0.6099.109',
			'goog:chromeOptions': {
				args: ['--window-size=1920,1080'],
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

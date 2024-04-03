const ipAddress = require('../utils/ipAddress.js');
const {config} = require('./wdio.conf.js');
const {readChromeVersion} = require('../utils/readChromeVersionNumber');

const chromeVersionMajorNumber = readChromeVersion();

exports.config = Object.assign(
	{},
	config,
	{
		capabilities: [{
			maxInstances: 1,

			browserName: 'chrome',
			'goog:chromeOptions': {
				w3c: false,
				debuggerAddress: '192.168.0.45:9998'
			},
			'wdio:chromedriverOptions': process.env.CHROME_DRIVER_PATH ? {
				binary: process.env.CHROME_DRIVER_PATH
				// match chromedriver version from jenkins
			} : Number(chromeVersionMajorNumber) > 108 ? {} : {
				binary: 'C:\\chromedriver\\chromedriver_v108.exe'
			}
		}],

		baseUrl: 'http://192.168.0.38:4567',

		before: function () {
			if (config.before) {
				config.before();
			}

			browser._options = {remote: true};
		}
	}
);

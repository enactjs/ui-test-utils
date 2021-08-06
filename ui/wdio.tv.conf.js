const ipAddress = require('../utils/ipAddress.js');
const {config} = require('./wdio.conf.js');

exports.config = Object.assign(
	{},
	config,
	{
		capabilities: [{
			maxInstances: 1,

			browserName: 'chrome',
			'goog:chromeOptions': {
				w3c: false,
				debuggerAddress: `${process.env.TV_IP}:9998`
			}
		}],

		baseUrl: `http://${ipAddress()}:4567`,

		before: function () {
			if (config.before) config.before();
			browser._options = {remote: true};
		}
	}
);

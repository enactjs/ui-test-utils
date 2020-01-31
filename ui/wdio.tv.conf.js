const {config} = require('../wdio.conf.js');

exports.config = Object.assign(
	{},
	config,
	{
		before: function () {
			if (config.before) config.before();
			browser._options = {remote: true};
		}
	}
);

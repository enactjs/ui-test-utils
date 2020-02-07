const ipAddress = require('../utils/ipAddress.js');
const {config} = require('./wdio.conf.js');

exports.config = Object.assign(
	{},
	config,
	{
		baseUrl: `http://${ipAddress}:4567`,
		services: config.services.concat(['docker']),
		dockerOptions: {
			image: 'selenium/standalone-chrome',
			healthCheck: 'http://localhost:4444',
			options: {
				p: ['4444:4444'],
				shmSize: '2g'
			}
		}
	}
);

const ipAddress = require('../utils/ipAddress.js');
const {config} = require('./wdio.conf.js');

// Remove selenium-standalone and replace with docker service
const services = config.services
	.filter(service => service[0] !== 'selenium-standalone')
	.concat(['docker']);

exports.config = Object.assign(
	{},
	config,
	{
		baseUrl: `http://${ipAddress()}:8080`,
		services,
		dockerOptions: {
			image: 'selenium/standalone-chrome',
			healthCheck: 'http://localhost:4444',
			options: {
				e: ['NODE_MAX_INSTANCE=5', 'NODE_MAX_SESSION=5'],
				p: ['4444:4444'],
				shmSize: '2g'
			}
		}
	}
);

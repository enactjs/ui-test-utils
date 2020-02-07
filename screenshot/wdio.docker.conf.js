const ipAddress = require('../utils/ipAddress.js'),
	docker = require('wdio-docker-service');
const {config} = require('./wdio.conf.js');

// Remove selenium-standalone and replace with docker service
const services = config.services
	.filter(service => service !== 'selenium-standalone')
	.concat([docker]);

exports.config = Object.assign(
	{},
	config,
	{
		baseUrl: `http://${ipAddress()}:4567`,
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

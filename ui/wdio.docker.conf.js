// const ipAddress = require('../utils/ipAddress.js');
import ipAddress from '../utils/ipAddress.js';
// const {config} = require('./wdio.conf.js');
import {config} from './wdio.conf.js';

// Remove selenium-standalone and replace with docker service
const services = config.services
	.filter(service => service[0] !== 'selenium-standalone')
	.concat(['docker']);

export const configDocker = Object.assign(
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

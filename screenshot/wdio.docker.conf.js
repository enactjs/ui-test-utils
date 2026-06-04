import parseArgs from 'minimist';

import {ipAddress} from '../utils/ipAddress.js';
import {config as ssConfig} from './wdio.conf.js';

const args = parseArgs(process.argv);
const maxSessions = args.parallel || args.instances || 5;

// Remove selenium-standalone and replace with docker service
const services = ssConfig.services
	.filter(service => service[0] !== 'selenium-standalone')
	.concat(['docker']);

const config = Object.assign(
	{},
	ssConfig,
	{
		baseUrl: `http://${ipAddress()}:4567`,
		services,
		dockerOptions: {
			image: 'selenium/standalone-chrome',
			healthCheck: 'http://localhost:4444',
			options: {
				e: [
					`NODE_MAX_INSTANCE=${maxSessions}`,
					`NODE_MAX_SESSION=${maxSessions}`
				],
				p: ['4444:4444'],
				shmSize: maxSessions > 5 ? '3g' : '2g'
			}
		}
	}
);

export const ssDockerConfig = {config};

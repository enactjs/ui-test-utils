const {config} = require('../wdio.conf.js');

exports.config = Object.assign(
	{},
	config,
	{
		baseUrl: `http://${os.hostname()}:4567`,
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

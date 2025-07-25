import {ipAddress} from '../utils/ipAddress.js';
import {config as uiConfig} from './wdio.conf.js';

const config = Object.assign(
	{},
	uiConfig,
	{
		capabilities: [{
			// maxInstances can get overwritten per capability. So if you have an in-house Selenium
			// grid with only 5 firefox instances available you can make sure that not more than
			// 5 instances get started at a time.
			'wdio:maxInstances': 1,
			//
			browserName: 'chrome',
			/* WebdriverIO v8.14 and above downloads and uses the latest Chrome version when running tests.
			We need to specify a browser version that match chromedriver version running in CI/CD environment to
			ensure testing accuracy.
			TODO: Update this version when chromedriver version in CI/CD is updated */
			browserVersion: '120.0.6099.109',
			'goog:chromeOptions': {
				debuggerAddress: `${process.env.TV_IP}:9998`
			},
			'wdio:enforceWebDriverClassic': true
		}],

		baseUrl: `http://${ipAddress()}:4567`,

		before: function () {
			if (uiConfig.before) {
				uiConfig.before();
			}

			browser._options = {remote: true};
		}
	}
);

export const uiTVConfig = {config};

'use strict';

const {spotlight} = require('./utils');

class Page {
	constructor () {
		this.title = 'Untitled Test';
	}

	open (appPath, urlExtra = '') {
		const url = `/${appPath}/${urlExtra}`
		// Can't resize browser window when connected to remote debugger!
		if (!browser._options || !browser._options.remote) {
			browser.setViewportSize({
				width: 1920,
				height: 1080
			});
		}
		browser.url(url);
	}

	spotlightLeft () {
		return spotlight.left();
	}
	spotlightRight () {
		return spotlight.right();
	}
	spotlightUp () {
		return spotlight.up();
	}
	spotlightDown () {
		return spotlight.down();
	}
	spotlightSelect () {
		return spotlight.select();
	}
}

module.exports = Page;

'use strict';

class Page {
	constructor () {
		this.title = 'Untitled Test';
	}

	open (appPath, urlExtra = '') {
		const url = `localhost:4567/${appPath}/${urlExtra}`
		browser.url(url);
	}

	keyDelay (key, delay = 50) {
		browser.keys(key);
		browser.pause(delay);
		return browser;
	}
	spotlightLeft () {
		return this.keyDelay('Left arrow');
	}
	spotlightRight () {
		return this.keyDelay('Right arrow');
	}
	spotlightUp () {
		return this.keyDelay('Up arrow');
	}
	spotlightDown () {
		return this.keyDelay('Down arrow');
	}
}

module.exports = Page;

'use strict';

class Page {
	constructor () {
		this.title = 'Untitled Test';
	}

	open (appPath, urlExtra = '?locale=en-US') {
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
	spotlightSelect () {
		return this.keyDelay('Enter');
	}
	backKey () {
		return this.keyDelay('Escape');
	}
}

module.exports = Page;

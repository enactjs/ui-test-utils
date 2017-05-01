'use strict';

class Page {
	constructor () {
		this.title = 'My Page';
	}

	open (path) {
		browser.url(path);
	}

	get button () { return browser.element('#button'); }
}

module.exports = new Page();

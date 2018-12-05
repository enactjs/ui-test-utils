'use strict';
const Page = require('../../Page.js');

class NoAutoFocusInterface {
	get isFocused () { return browser.isExisting(':focus'); }
}
class NoAutoFocusPage extends Page {
	constructor () {
		super();
		this.title = 'NoAutoFocus Spotlight Test';
		const view = new NoAutoFocusInterface();

		this.components = {view};
	}

	open (urlExtra) {
		super.open('Spotlight-NoAutoFocus-View', urlExtra);
	}
}

module.exports = new NoAutoFocusPage();

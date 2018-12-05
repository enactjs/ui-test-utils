'use strict';
const Page = require('../../Page.js');

class DefaultInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class DefaultPage extends Page {
	constructor () {
		super();
		this.title = 'Default Spotlight Test';
		const item4 = new DefaultInterface('item4');
		const item7 = new DefaultInterface('item7');

		this.components = {item4, item7};
	}

	open (urlExtra) {
		super.open('Spotlight-Default-View', urlExtra);
	}
}

module.exports = new DefaultPage();

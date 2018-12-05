'use strict';
const Page = require('../../Page.js');

class IconButtonInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class IconButtonPage extends Page {
	constructor () {
		super();
		this.title = 'IconButton Spotlight Test';
		const firstButton = new IconButtonInterface('firstBtn');
		const secondButton = new IconButtonInterface('secondBtn');

		this.components = {firstButton, secondButton};
	}

	open (urlExtra) {
		super.open('Spotlight-IconButton-View', urlExtra);
	}
}

module.exports = new IconButtonPage();

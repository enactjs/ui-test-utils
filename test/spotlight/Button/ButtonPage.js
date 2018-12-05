'use strict';
const Page = require('../../Page.js');

class ButtonInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}

class ButtonPage extends Page {
	constructor () {
		super();
		this.title = 'Button Spotlight Test';
		const firstButton = new ButtonInterface('firstBtn');
		const secondButton = new ButtonInterface('secondBtn');

		this.components = {firstButton, secondButton};
	}

	open (urlExtra) {
		super.open('Spotlight-Button-View', urlExtra);
	}
}

module.exports = new ButtonPage();

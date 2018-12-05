'use strict';
const Page = require('../../Page.js');

class ToggleButtonInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class ToggleButtonPage extends Page {
	constructor () {
		super();
		this.title = 'ToggleButton Spotlight Test';
		const firstToggleButton = new ToggleButtonInterface('firstBtn');
		const secondToggleButton = new ToggleButtonInterface('secondBtn');

		this.components = {firstToggleButton, secondToggleButton};
	}

	open (urlExtra) {
		super.open('Spotlight-ToggleButton-View', urlExtra);
	}
}

module.exports = new ToggleButtonPage();

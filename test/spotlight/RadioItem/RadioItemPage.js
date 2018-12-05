'use strict';
const Page = require('../../Page.js');

class RadioItemInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class RadioItemPage extends Page {
	constructor () {
		super();
		this.title = 'RadioItem Spotlight Test';
		const firstRadioItem = new RadioItemInterface('radioItem');
		const secondRadioItem = new RadioItemInterface('radioItem2');

		this.components = {firstRadioItem, secondRadioItem};
	}

	open (urlExtra) {
		super.open('Spotlight-RadioItem-View', urlExtra);
	}
}

module.exports = new RadioItemPage();

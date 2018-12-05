'use strict';
const Page = require('../../Page.js');

class CheckboxItemInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}

class CheckboxItemPage extends Page {
	constructor () {
		super();
		this.title = 'Button Spotlight Test';
		const firstCheckboxItem = new CheckboxItemInterface('checkboxItem');
		const secondCheckboxItem = new CheckboxItemInterface('checkboxItem2');

		this.components = {firstCheckboxItem, secondCheckboxItem};
	}

	open (urlExtra) {
		super.open('Spotlight-CheckboxItem-View', urlExtra);
	}
}

module.exports = new CheckboxItemPage();

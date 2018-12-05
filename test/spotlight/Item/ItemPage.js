'use strict';
const Page = require('../../Page.js');

class ItemInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class ItemPage extends Page {
	constructor () {
		super();
		this.title = 'Item Spotlight Test';
		const firstItem = new ItemInterface('item');
		const secondItem = new ItemInterface('item2');

		this.components = {firstItem, secondItem};
	}

	open (urlExtra) {
		super.open('Spotlight-Item-View', urlExtra);
	}
}

module.exports = new ItemPage();

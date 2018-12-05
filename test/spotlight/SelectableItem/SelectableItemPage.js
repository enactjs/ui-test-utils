'use strict';
const Page = require('../../Page.js');

class SelectableItemInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class SelectableItemPage extends Page {
	constructor () {
		super();
		this.title = 'SelectableItem Spotlight Test';
		const firstSelectableItem = new SelectableItemInterface('selectableItem');
		const secondSelectableItem = new SelectableItemInterface('selectableItem2');

		this.components = {firstSelectableItem, secondSelectableItem};
	}

	open (urlExtra) {
		super.open('Spotlight-SelectableItem-View', urlExtra);
	}
}

module.exports = new SelectableItemPage();

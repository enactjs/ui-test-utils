'use strict';
const Page = require('../../Page.js');

class LabeledItemInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class LabeledItemPage extends Page {
	constructor () {
		super();
		this.title = 'LabeledItem Spotlight Test';
		const firstLabeledItem = new LabeledItemInterface('labeledItem');
		const secondLabeledItem = new LabeledItemInterface('labeledItem2');

		this.components = {firstLabeledItem, secondLabeledItem};
	}

	open (urlExtra) {
		super.open('Spotlight-LabeledItem-View', urlExtra);
	}
}

module.exports = new LabeledItemPage();

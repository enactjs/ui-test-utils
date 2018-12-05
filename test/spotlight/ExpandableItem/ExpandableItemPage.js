'use strict';
const Page = require('../../Page.js');

class ExpandableItemInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get body () { return browser.element(`#${this.id} > div`); }
}
class ExpandableItemPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableItem Spotlight Test';
		this.components = {};
		this.components.expandableItemDefault = new ExpandableItemInterface('expandableItemDefault');
		this.components.expandableAutoClose = new ExpandableItemInterface('expandableAutoClose');
		this.components.expandableLockBottom = new ExpandableItemInterface('expandableLockBottom');
		this.components.itemInDefault = new ExpandableItemInterface('itemInDefault');
		this.components.itemInAutoClose = new ExpandableItemInterface('itemInAutoClose');
		this.components.itemInLockBottom = new ExpandableItemInterface('itemInLockBottom');
		this.components.item2InLockBottom = new ExpandableItemInterface('item2InLockBottom');
		this.components.extraItem = new ExpandableItemInterface('extraItem');
	}

	open (urlExtra) {
		super.open('Spotlight-ExpandableItem-View', urlExtra);
	}
}

module.exports = new ExpandableItemPage();

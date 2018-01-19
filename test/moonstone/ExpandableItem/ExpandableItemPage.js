'use strict';
const Page = require('../../Page.js');
const {element, getComponent, getSubComponent, getText} = require('../../utils.js');

const getIcon = getComponent('Icon');
const getLabeledItem = getComponent('LabeledItem');
const getLabeledItemTitle = getSubComponent('LabeledItem', 'title');
const getLabeledItemValue = getSubComponent('LabeledItem', 'label');

class ExpandableItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}>div`, (els) => els && !els[0].focus());
	}

	get      self () { return element(`#${this.id}`, browser); }
	get   chevron () { return getText(getIcon(this.self)); }
	get     title () { return getLabeledItem(this.self); }
	get titleText () { return getText(getLabeledItemTitle(this.self)); }
	get     value () { return getLabeledItemValue(this.self); }
	get valueText () { return getText(this.value); }
	get    isOpen () { return this.self.isExisting('.Transition__shown'); }
}

class ExpandableItemPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableItem Test';
		this.components = {};
		this.components.expandableItemDefaultClosedWithoutNoneText = new ExpandableItemInterface('expandableItemDefaultClosedWithoutNoneText');
		this.components.expandableItemDefaultClosedWithNoneText = new ExpandableItemInterface('expandableItemDefaultClosedWithNoneText');
		this.components.expandableItemDefaultOpenWithNoneText = new ExpandableItemInterface('expandableItemDefaultOpenWithNoneText');
		this.components.expandableItemWithLabel = new ExpandableItemInterface('expandableItemWithLabel');
		this.components.expandableItemDisabledWithNoneText = new ExpandableItemInterface('expandableItemDisabledWithNoneText');
	}

	open (urlExtra) {
		super.open('ExpandableItem-View', urlExtra);
	}
}

module.exports = new ExpandableItemPage();

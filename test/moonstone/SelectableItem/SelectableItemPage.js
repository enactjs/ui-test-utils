'use strict';
const Page = require('../../Page.js');

class SelectableItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get item () { return browser.element(`#${this.id}`); }
	get valueText () { return browser.element(`#${this.id} > div .Marquee__text`).getText(); }
	get isSelected () { return browser.isExisting(`#${this.id} .SelectableItem__selected`); }
	get isToggled () { return browser.isExisting(`#${this.id} .ToggleItem__selected`); }
	get isInline () { return browser.isExisting(`#${this.id}.Item__inline`); }
}

class SelectableItemPage extends Page {
	constructor () {
		super();
		this.title = 'SelectableItem Test';
		const selectableDefault = new SelectableItemInterface('selectableItem1');
		const selectableDefaultSelected = new SelectableItemInterface('selectableItem2');
		const selectableInline = new SelectableItemInterface('selectableItem3');
		const selectableDisabled = new SelectableItemInterface('selectableItem4');
		const selectableInlineDisabled = new SelectableItemInterface('selectableItem5');

		this.components = {selectableDefault, selectableDefaultSelected, selectableInline, selectableDisabled, selectableInlineDisabled}
	}

	open (urlExtra) {
		super.open('SelectableItem-View', urlExtra);
	}
}

module.exports = new SelectableItemPage();

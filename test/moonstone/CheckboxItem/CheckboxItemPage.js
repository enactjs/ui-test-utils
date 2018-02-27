'use strict';
const Page = require('../../Page.js');

class CheckboxItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get item () { return browser.element(`#${this.id}`); }
	get valueText () { return browser.element(`#${this.id} > div .Marquee__text`).getText(); }
	get icon () { return browser.element(`#${this.id} > div .Icon__icon`)}
	get iconSymbol () { return browser.element(`#${this.id} > div .Icon__icon`).getText(); }
	get isChecked () { return browser.isExisting(`#${this.id} .Checkbox__selected`); }
	get isAfter () { return browser.isExisting(`#${this.id} .SlotItem__after`); }
	get isBefore () { return browser.isExisting(`#${this.id} .SlotItem__before`); }
	get isInline () { return browser.isExisting(`#${this.id}.Item__inline`); }
}

class CheckboxItemPage extends Page {
	constructor () {
		super();
		this.title = 'CheckboxItem Test';
		const checkboxDefault = new CheckboxItemInterface('checkboxItem1');
		const checkboxDefaultSelected = new CheckboxItemInterface('checkboxItem2');
		const checkboxIconAfter = new CheckboxItemInterface('checkboxItem3');
		const checkboxInline = new CheckboxItemInterface('checkboxItem4');
		const checkboxInlineAfter = new CheckboxItemInterface('checkboxItem5');
		const checkboxDisabled = new CheckboxItemInterface('checkboxItem6');

		this.components = {checkboxDefault, checkboxDefaultSelected, checkboxIconAfter, checkboxInline, checkboxInlineAfter, checkboxDisabled}
	}

	open (urlExtra) {
		super.open('CheckboxItem-View', urlExtra);
	}
}

module.exports = new CheckboxItemPage();

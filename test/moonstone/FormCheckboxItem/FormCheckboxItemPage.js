'use strict';
const Page = require('../../Page.js');

class FormCheckboxItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get valueText () { return browser.element(`#${this.id} > div .Marquee__text`).getText(); }
	get icon () { return browser.element(`#${this.id} > div .Icon__icon`)}
	get iconSymbol () { return browser.element(`#${this.id} > div .Icon__icon`).getText(); }
	get isChecked () { return browser.isExisting(`#${this.id} .FormCheckbox__selected`); }
	get isAfter () { return browser.isExisting(`#${this.id} .SlotItem__after`); }
	get isBefore () { return browser.isExisting(`#${this.id} .SlotItem__before`); }
	get isInline () { return browser.isExisting(`#${this.id}.Item__inline`); }
}

class FormCheckboxItemPage extends Page {
	constructor () {
		super();
		this.title = 'FormCheckboxItem Test';
		const formCheckboxDefault = new FormCheckboxItemInterface('formCheckboxItem1');
		const formCheckboxDefaultSelected = new FormCheckboxItemInterface('formCheckboxItem2');
		const formCheckboxIconAfter = new FormCheckboxItemInterface('formCheckboxItem3');
		const formCheckboxInline = new FormCheckboxItemInterface('formCheckboxItem4');
		const formCheckboxInlineAfter = new FormCheckboxItemInterface('formCheckboxItem5');
		const formCheckboxDisabled = new FormCheckboxItemInterface('formCheckboxItem6');
		const formCheckboxInlineDisabled = new FormCheckboxItemInterface('formCheckboxItem7');

		this.components = {formCheckboxDefault, formCheckboxDefaultSelected, formCheckboxIconAfter, formCheckboxInline, formCheckboxInlineAfter, formCheckboxDisabled, formCheckboxInlineDisabled}
	}

	open (urlExtra) {
		super.open('FormCheckboxItem-View', urlExtra);
	}
}

module.exports = new FormCheckboxItemPage();

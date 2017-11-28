'use strict';
const Page = require('../../Page.js');

class PickerInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}>div`, (els) => els && !els[0].focus());
	}

	get title () { return browser.element(`#${this.id}>div`); }
	get titleText () { return browser.element(`#${this.id} .LabeledItem__title .Marquee__text`).getText(); }
	// get chevron () { return browser.element(`#${this.id}>div .Icon__icon`).getText(); }
	// get value () { return browser.element(`#${this.id}>div>div:nth-of-type(2)`); }
	get valueText () { return browser.element(`#${this.id} .LabeledItem__label`).getText(); }
	// get isOpen () { return browser.isExisting(`#${this.id} .Transition__shown`); }
	// get item1 () { return browser.element(`#${this.id} [role="checkbox"]`); }
	// get item2 () { return browser.element(`#${this.id} [role="checkbox"]:nth-of-type(2)`); }
	// get item3 () { return browser.element(`#${this.id} [role="checkbox"]:nth-of-type(3)`); }

	get picker () { return browser.element(`#${this.id}`); }
}

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
		this.picker = new PickerInterface('picker');
		this.picker.selectedClass = '.picker__selected';
	}

	open (urlExtra) {
		super.open('DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();

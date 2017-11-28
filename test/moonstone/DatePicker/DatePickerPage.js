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
	get chevron () { return browser.element(`#${this.id}>div .Icon__icon`).getText(); }
	get valueText () { return browser.element(`#${this.id} .LabeledItem__label`).getText(); }
	get isOpen () { return browser.isExisting(`#${this.id} .Transition__shown`); }
	get picker1 () { return browser.element(`#${this.id} .Picker__joined`); }
	get decrementer () { return browser.element(`#${this.id} .Picker__joined .Picker__decrementer`); }
	get incrementer () { return browser.element(`#${this.id} .Picker__joined .Picker__incrementer`); }
}

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
		this.datePicker1 = new PickerInterface('datePicker1');
	}

	open (urlExtra) {
		super.open('DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();

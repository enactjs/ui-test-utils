'use strict';
const Page = require('../../Page.js');

class ExpandablePickerPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandablePicker Test';
	}

	open (urlExtra) {
		super.open('ExpandablePicker-View', urlExtra);
	}

	get expandable1 () { return browser.element('#expandable1'); }
	get spottableArea () { return browser.element('#expandable1 .spottable'); }
	get pickerIncrement () { return browser.element('#expandable1 .Picker__incrementer'); }
	get pickerDecrement () { return browser.element('#expandable1 .Picker__decrementer'); }
	get checkMark () { return browser.element('#expandable1 .Button__button .opaque'); }
	get pickerItemText () { return browser.getText('#expandable1 .Picker__item'); }
	get labeledItemText () { return browser.getText('#expandable1 .LabeledItem__label'); }
}

module.exports = new ExpandablePickerPage();


'use strict';
const Page = require('../../Page.js');
const {element, getComponent, getSubComponent, getText} = require('../../utils.js');

const getIcon = getComponent('Icon');
const getLabeledItem = getComponent('LabeledItem');
const getLabeledItemTitle = getSubComponent('LabeledItem', 'title');
const getLabeledItemValue = getSubComponent('LabeledItem', 'label');

class PickerInterface {
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

	get day () { return element('.DatePicker__day .Picker__picker', this.self); }
	get month () { return element('.DatePicker__month .Picker__picker', this.self); }
	get monthLabel () { return element('.DatePicker__month .DateComponentPicker__label', this.self); }
	get year () { return element('.DatePicker__year .Picker__picker', this.self); }

	decrementer (picker) { return element('.Picker__decrementer', picker); }
	incrementer (picker) { return element('.Picker__incrementer', picker); }
	item (picker) { return element('.Picker__item', picker) }
}

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
		this.components = {};
		this.components.datePickerDefaultClosedWithoutNoneText = new PickerInterface('datePickerDefaultClosedWithoutNoneText');
		this.components.datePickerDefaultClosedWithNoneText = new PickerInterface('datePickerDefaultClosedWithNoneText');
		this.components.datePickerDefaultOpenWithNoneText = new PickerInterface('datePickerDefaultOpenWithNoneText');
		this.components.datePickerNoLabels = new PickerInterface('datePickerNoLabels');
		this.components.datePickerDisabledWithNoneText = new PickerInterface('datePickerDisabledWithNoneText');
		this.components.datePickerDisabledOpenWithNoneText = new PickerInterface('datePickerDisabledOpenWithNoneText');
	}

	open (urlExtra) {
		super.open('DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();

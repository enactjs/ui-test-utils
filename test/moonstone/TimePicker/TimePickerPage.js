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

	get hour () { return element('.TimePicker__hourComponents .Picker__picker', this.self); }
	get hourLabel () { return element('.TimePicker__hourComponents .DateComponentPicker__label', this.self); }
	get minute () { return element('.TimePicker__minuteComponents .Picker__picker', this.self); }
	get meridiem () { return element('.TimePicker__meridiemComponent .Picker__picker', this.self); }

	decrementer (picker) { return element('.Picker__decrementer', picker); }
	incrementer (picker) { return element('.Picker__incrementer', picker); }
	item (picker) { return element('.Picker__item', picker) }
}

class TimePickerPage extends Page {
	constructor () {
		super();
		this.title = 'TimePicker Test';
		this.components = {};
		this.components.timePickerDefaultClosedWithoutNoneText = new PickerInterface('timePickerDefaultClosedWithoutNoneText');
		this.components.timePickerDefaultClosedWithNoneText = new PickerInterface('timePickerDefaultClosedWithNoneText');
		this.components.timePickerDefaultOpenWithNoneText = new PickerInterface('timePickerDefaultOpenWithNoneText');
		this.components.timePickerNoLabels = new PickerInterface('timePickerNoLabels');
		this.components.timePickerDisabledWithNoneText = new PickerInterface('timePickerDisabledWithNoneText');
		this.components.timePickerDisabledOpenWithNoneText = new PickerInterface('timePickerDisabledOpenWithNoneText');
	}

	open (urlExtra) {
		super.open('TimePicker-View', urlExtra);
	}
}

module.exports = new TimePickerPage();

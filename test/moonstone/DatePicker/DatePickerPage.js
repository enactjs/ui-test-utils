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

	get picker1 () { return browser.element(`#${this.id} .Picker__picker`); }
	get decrementer () { return element('.Picker__decrementer', this.picker1); }
	get incrementer () { return element('.Picker__incrementer', this.picker1); }
}

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
		this.components = {};
		this.components.datePicker1 = new PickerInterface('datePicker1');
		this.components.datePicker2 = new PickerInterface('datePicker2');
	}

	open (urlExtra) {
		super.open('DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();

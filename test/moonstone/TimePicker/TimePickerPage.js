'use strict';
const Page = require('../../Page.js');
const {element, getComponent, getSubComponent, getText} = require('../../utils.js');

const getIcon = getComponent('moonstone', 'Icon');
const getLabeledItem = getComponent('moonstone', 'LabeledItem');
const getLabeledItemTitle = getSubComponent('moonstone', 'LabeledItem', 'title');
const getLabeledItemValue = getSubComponent('moonstone', 'LabeledItem', 'label');

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
	get    isOpen () { return this.self.isExisting('.enact_ui_Transition_Transition_shown'); }

	get hour () { return element('.enact_moonstone_TimePicker_TimePicker_hourComponents .enact_moonstone_internal_Picker_Picker_picker', this.self); }
	get hourLabel () { return element('.enact_moonstone_TimePicker_TimePicker_hourComponents .enact_moonstone_internal_DateComponentPicker_DateComponentPicker_label', this.self); }
	get meridiem () { return element('.enact_moonstone_TimePicker_TimePicker_meridiemComponent .enact_moonstone_internal_Picker_Picker_picker', this.self); }
	get meridiemLabel () { return element('.enact_moonstone_TimePicker_TimePicker_meridiemComponents .enact_moonstone_internal_DateComponentPicker_DateComponentPicker_label', this.self); }
	get minute () { return element('.enact_moonstone_TimePicker_TimePicker_minutesComponents .enact_moonstone_internal_Picker_Picker_picker', this.self); }
	get minuteLabel () { return element('.enact_moonstone_TimePicker_TimePicker_minuteComponents .enact_moonstone_internal_DateComponentPicker_DateComponentPicker_label', this.self); }

	decrementer (picker) { return element('.enact_moonstone_internal_Picker_Picker_decrementer', picker); }
	incrementer (picker) { return element('.enact_moonstone_internal_Picker_Picker_incrementer', picker); }
	item (picker) { return element('.enact_moonstone_internal_Picker_Picker_item', picker); }
}

class TimePickerPage extends Page {
	constructor () {
		super();
		this.title = 'TimePicker Test';
		this.components = {};
		this.components.timePickerDefaultClosedWithoutNoneText = new PickerInterface('timePickerDefaultClosedWithoutNoneText');
		this.components.timePickerDefaultClosedWithNoneText = new PickerInterface('timePickerDefaultClosedWithNoneText');
		this.components.timePickerDefaultOpenWithNoneText = new PickerInterface('timePickerDefaultOpenWithNoneText');
		this.components.timePickerWithDefaultValue = new PickerInterface('timePickerWithDefaultValue');
		// this.components.timePicker24Hour = new PickerInterface('timePicker24Hour');
		this.components.timePickerNoLabels = new PickerInterface('timePickerNoLabels');
		this.components.timePickerDisabledWithNoneText = new PickerInterface('timePickerDisabledWithNoneText');
		this.components.timePickerDisabledOpenWithNoneText = new PickerInterface('timePickerDisabledOpenWithNoneText');
	}

	open (urlExtra) {
		super.open('TimePicker-View', urlExtra);
	}
}

module.exports = new TimePickerPage();

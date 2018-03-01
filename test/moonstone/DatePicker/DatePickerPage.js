'use strict';
const Page = require('../../Page.js');
const {element, getText} = require('../../utils.js');

class PickerInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}>div`, (els) => els && !els[0].focus());
	}

	get      self () { return element(`#${this.id}`, browser); }
	get   chevron () { return getText(element('.enact_moonstone_LabeledItem_LabeledItem_icon', this.self)); }
	get     title () { return element('.enact_moonstone_LabeledItem_LabeledItem_labeleditem', this.self); }
	get titleText () { return getText(this.title); }
	get     value () { return element('.enact_moonstone_LabeledItem_LabeledItem_label', this.self); }
	get valueText () { return getText(this.value); }
	get    isOpen () { return this.self.isExisting('.enact_ui_Transition_Transition_shown'); }

	get day () { return element('.enact_moonstone_DatePicker_DatePicker_day .enact_moonstone_internal_Picker_Picker_picker', this.self); }
	get dayLabel () { return element('.enact_moonstone_DatePicker_DatePicker_day .enact_moonstone_internal_DateComponentPicker_DateComponentPicker_label', this.self); }
	get month () { return element('.enact_moonstone_DatePicker_DatePicker_month .enact_moonstone_internal_Picker_Picker_picker', this.self); }
	get monthLabel () { return element('.enact_moonstone_DatePicker_DatePicker_month .enact_moonstone_internal_DateComponentPicker_DateComponentPicker_label', this.self); }
	get year () { return element('.enact_moonstone_DatePicker_DatePicker_year .enact_moonstone_internal_Picker_Picker_picker', this.self); }
	get yearLabel () { return element('.enact_moonstone_DatePicker_DatePicker_year .enact_moonstone_internal_DateComponentPicker_DateComponentPicker_label', this.self); }

	decrementer (picker) { return element('.enact_moonstone_internal_Picker_Picker_decrementer', picker); }
	incrementer (picker) { return element('.enact_moonstone_internal_Picker_Picker_incrementer', picker); }
	item (picker) { return element('.enact_moonstone_internal_Picker_Picker_item', picker) }
}

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
		this.components = {};
		this.components.datePickerDefaultClosedWithoutNoneText = new PickerInterface('datePickerDefaultClosedWithoutNoneText');
		this.components.datePickerDefaultClosedWithNoneText = new PickerInterface('datePickerDefaultClosedWithNoneText');
		this.components.datePickerDefaultOpenWithNoneText = new PickerInterface('datePickerDefaultOpenWithNoneText');
		this.components.datePickerWithValue = new PickerInterface('datePickerWithValue');
		this.components.datePickerNoLabels = new PickerInterface('datePickerNoLabels');
		this.components.datePickerDisabledWithNoneText = new PickerInterface('datePickerDisabledWithNoneText');
		this.components.datePickerDisabledOpenWithNoneText = new PickerInterface('datePickerDisabledOpenWithNoneText');
	}

	open (urlExtra) {
		super.open('DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();

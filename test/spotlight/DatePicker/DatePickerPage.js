'use strict';
const Page = require('../../Page.js');

class DatePickerInterface {
	constructor (id) {
		this.id = id;
	}
	get self () { return browser.element(`#${this.id}`); }
	get body () { return browser.element(`#${this.id} > div`); }
	get ymd () { return browser.element('.enact_moonstone_internal_Picker_Picker_joined'); }
}

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
		this.components = {};
		this.components.datePicker = new DatePickerInterface('datePicker');
	}

	open (urlExtra) {
		super.open('Spotlight-DatePicker-View', urlExtra);
	}
}

module.exports = new DatePickerPage();

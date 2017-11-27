'use strict';
const Page = require('../../Page.js');

class DatePickerPage extends Page {
	constructor () {
		super();
		this.title = 'DatePicker Test';
	}

	open (urlExtra) {
		super.open('DatePicker-View', urlExtra);
	}

	get picker1 () { return browser.element('#picker1'); }
	// get picker2 () { return browser.element('#picker2'); }
}

module.exports = new DatePickerPage();

'use strict';
const Page = require('../../Page.js');

class TimePickerInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get body () { return browser.element(`#${this.id} > div`); }
	get hmm () { return browser.element('.enact_moonstone_internal_Picker_Picker_joined'); }
}
class TimePickerPage extends Page {
	constructor () {
		super();
		this.title = 'TimePicker Spotlight Test';
		const timePicker = new TimePickerInterface('timePicker');

		this.components = {timePicker};
	}

	open (urlExtra) {
		super.open('Spotlight-TimePicker-View', urlExtra);
	}
}

module.exports = new TimePickerPage();

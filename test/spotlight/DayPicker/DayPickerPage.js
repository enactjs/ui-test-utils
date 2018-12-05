'use strict';
const Page = require('../../Page.js');

class DayPickerInterface {
	constructor (id) {
		this.id = id;
	}
	get self () { return browser.element(`#${this.id}`); }
	get body () { return browser.element(`#${this.id} > div`); }
	get firstDayItem () { return browser.element('.enact_moonstone_SlotItem_SlotItem_slotItem'); }
}
class DayPickerPage extends Page {
	constructor () {
		super();
		this.title = 'DayPicker Test';
		this.components = {};
		this.components.dayPicker = new DayPickerInterface('dayPicker');
	}

	open (urlExtra) {
		super.open('Spotlight-DayPicker-View', urlExtra);
	}
}

module.exports = new DayPickerPage();

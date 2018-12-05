'use strict';
const Page = require('../../Page.js');

class ExpandablePickerInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get body () { return browser.element(`#${this.id} > div`); }
	get incrementer () { return browser.element('.enact_moonstone_internal_Picker_Picker_incrementer'); }
	get checkButton () { return browser.element('.enact_moonstone_ExpandablePicker_ExpandablePicker_button'); }
}
class ExpandablePickerPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandablePicker Spotlight Test';
		const expandablePicker = new ExpandablePickerInterface('expandablePicker');

		this.components = {expandablePicker};
	}

	open (urlExtra) {
		super.open('Spotlight-ExpandablePicker-View', urlExtra);
	}
}

module.exports = new ExpandablePickerPage();

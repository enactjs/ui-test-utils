'use strict';
const Page = require('../../Page.js');

class RangePickerInterface {
	get incrementer () { return browser.element('.enact_moonstone_internal_Picker_Picker_incrementer'); }
	get decrementer () { return browser.element('.enact_moonstone_internal_Picker_Picker_decrementer'); }
	get joined () { return browser.element('.enact_moonstone_internal_Picker_Picker_joined'); }
}

class RangePickerPage extends Page {
	constructor () {
		super();
		this.title = 'RangePicker Spotlight Test';
		const picker = new RangePickerInterface();

		this.components = {picker};
	}

	open (urlExtra) {
		super.open('Spotlight-RangePicker-View', urlExtra);
	}
}

module.exports = new RangePickerPage();

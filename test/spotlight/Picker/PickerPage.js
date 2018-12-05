'use strict';
const Page = require('../../Page.js');

class PickerInterface {
	get incrementer () { return browser.element('.enact_moonstone_internal_Picker_Picker_incrementer'); }
	get decrementer () { return browser.element('.enact_moonstone_internal_Picker_Picker_decrementer'); }
	get joined () { return browser.element('.enact_moonstone_internal_Picker_Picker_joined'); }
}
class PickerPage extends Page {
	constructor () {
		super();
		this.title = 'Picker Spotlight Test';
		const picker = new PickerInterface();

		this.components = {picker};
	}

	open (urlExtra) {
		super.open('Spotlight-Picker-View', urlExtra);
	}
}

module.exports = new PickerPage();

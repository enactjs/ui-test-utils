'use strict';
const Page = require('../../Page.js');

class AgateToggleButtonInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}
	get self () { return browser.element(`#${this.id}`); }
	get isSmall () { return browser.isExisting(`#${this.id}.enact_moonstone_ToggleButton_ToggleButton_small`); }
}


class AgateToggleButtonPage extends Page {
	constructor () {
		super();
		this.title = 'Agate ToggleButton Test';
		const toggleDefault = new AgateToggleButtonInterface('toggleButton1');
		const toggleWithLabels = new AgateToggleButtonInterface('toggleButton2');

		this.components = {toggleDefault, toggleWithLabels};
	}

	open (urlExtra) {
		super.open('ToggleButton-View', urlExtra);
	}
}

module.exports = new AgateToggleButtonPage();

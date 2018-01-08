'use strict';
const Page = require('../../Page.js');

class ToggleButtonInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get item () { return browser.element(`#${this.id}`); }
	get valueText () { return browser.element(`#${this.id} > div .Marquee__text`).getText(); }
	get isSelected () { return browser.isExisting(`#${this.id}.ToggleButton__selected.Button__selected`); }
	get isSmall () { return browser.isExisting(`#${this.id}.ToggleButton__small`); }
}

class ToggleButtonPage extends Page {
	constructor () {
		super();
		this.title = 'ToggleButton Test';
		const toggleDefault = new ToggleButtonInterface('toggleButton1');
		const toggleWithLabels = new ToggleButtonInterface('toggleButton2');
		const toggleDefaultSelected = new ToggleButtonInterface('toggleButton3');
		const toggleDisabled = new ToggleButtonInterface('toggleButton4');
		const toggleSmall = new ToggleButtonInterface('toggleButton5');
		const toggleCasePreserve = new ToggleButtonInterface('toggleButton6');
		const toggleCaseSentence = new ToggleButtonInterface('toggleButton7');
		const toggleCaseWord = new ToggleButtonInterface('toggleButton8');
		const toggleCaseUpper = new ToggleButtonInterface('toggleButton9');

		this.components = {toggleDefault, toggleWithLabels, toggleDefaultSelected, toggleDisabled, toggleSmall, toggleCasePreserve, toggleCaseSentence, toggleCaseWord, toggleCaseUpper}
	}

	open (urlExtra) {
		super.open('ToggleButton-View', urlExtra);
	}
}

module.exports = new ToggleButtonPage();

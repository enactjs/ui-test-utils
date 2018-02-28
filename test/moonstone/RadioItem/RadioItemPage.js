'use strict';
const Page = require('../../Page.js');

class RadioItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get valueText () { return browser.element(`#${this.id} > div .Marquee__text`).getText(); }
	get isSelected () { return browser.isExisting(`#${this.id} .RadioItem__selected`); }
	get isInline () { return browser.isExisting(`#${this.id}.Item__inline`); }
}

class RadioItemPage extends Page {
	constructor () {
		super();
		this.title = 'RadioItem Test';
		const radioDefault = new RadioItemInterface('radioItem1');
		const radioDefaultSelected = new RadioItemInterface('radioItem2');
		const radioInline = new RadioItemInterface('radioItem3');
		const radioDisabled = new RadioItemInterface('radioItem4');
		const radioInlineDisabled = new RadioItemInterface('radioItem5');

		this.components = {radioDefault, radioDefaultSelected, radioInline, radioDisabled, radioInlineDisabled}
	}

	open (urlExtra) {
		super.open('RadioItem-View', urlExtra);
	}
}

module.exports = new RadioItemPage();

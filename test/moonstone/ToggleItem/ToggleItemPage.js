'use strict';
const Page = require('../../Page.js');

class ToggleItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get item () { return browser.element(`#${this.id}`); }
	get valueText () { return browser.element(`#${this.id} > div .Marquee__text`).getText(); }
	get icon () { return browser.element(`#${this.id} > div .Icon__icon`)}
	get iconSymbol () { return browser.element(`#${this.id} > div .Icon__icon`).getText(); }
	get isSelected () { return browser.isExisting(`#${this.id} .ToggleItem__selected`); }
	get isAfter () { return browser.isExisting(`#${this.id} .Overlay__after`); }
	get isBefore () { return browser.isExisting(`#${this.id} .Overlay__before`); }
	get isInline () { return browser.isExisting(`#${this.id}.Item__inline`); }
}

class ToggleItemPage extends Page {
	constructor () {
		super();
		this.title = 'ToggleItem Test';
		const toggleNormal = new ToggleItemInterface('toggleItem1');
		const toggleDefaultSelected = new ToggleItemInterface('toggleItem2');
		const toggleIconAfter = new ToggleItemInterface('toggleItem3');
		const toggleInline = new ToggleItemInterface('toggleItem4');
		const toggleInlineAfter = new ToggleItemInterface('toggleItem5');
		const toggledisabled = new ToggleItemInterface('toggleItem6');

		this.toggleItems = {toggleNormal, toggleDefaultSelected, toggleIconAfter, toggleInline, toggleInlineAfter, toggledisabled}
	}

	open (urlExtra) {
		super.open('ToggleItem-View', urlExtra);
	}
}

module.exports = new ToggleItemPage();

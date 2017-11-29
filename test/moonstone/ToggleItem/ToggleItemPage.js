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
		this.toggleItem1 = new ToggleItemInterface('toggleItem1');
		this.toggleItem2 = new ToggleItemInterface('toggleItem2');
		this.toggleItem3 = new ToggleItemInterface('toggleItem3');
		this.toggleItem4 = new ToggleItemInterface('toggleItem4');
		this.toggleItem5 = new ToggleItemInterface('toggleItem5');
		this.toggleItem6 = new ToggleItemInterface('toggleItem6');
	}

	open (urlExtra) {
		super.open('ToggleItem-View', urlExtra);
	}
}

module.exports = new ToggleItemPage();

'use strict';
const Page = require('../../Page.js');

class ExpandableInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}>div`, (els) => els && !els[0].focus());
	}

	get title () { return browser.element(`#${this.id}>div`); }
	get titleText () { return browser.element(`#${this.id}>div .Marquee__text`).getText(); }
	get chevron () { return browser.element(`#${this.id}>div .Icon__icon`).getText(); }
	get value () { return browser.element(`#${this.id}>div>div:nth-of-type(2)`); }
	get valueText () { return browser.element(`#${this.id}>div>div:nth-of-type(2)`).getText(); }
	get isOpen () { return browser.isExisting(`#${this.id} .Transition__shown`); }
	get item1 () { return browser.element(`#${this.id} [role="checkbox"]`); }
	get item2 () { return browser.element(`#${this.id} [role="checkbox"]:nth-of-type(2)`); }
	get item3 () { return browser.element(`#${this.id} [role="checkbox"]:nth-of-type(3)`); }
}

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableList Test';
		this.components = {};
		// TODO: Put `selectedClass` into constructor
		this.components.radioSelect = new ExpandableInterface('expandable1');
		this.components.radioSelect.selectedClass = '.RadioItem__selected';
		this.components.multiSelect = new ExpandableInterface('expandable2');
		this.components.multiSelect.selectedClass = '.Checkbox__selected';
		this.components.singleSelect = new ExpandableInterface('expandable3');
		this.components.singleSelect.selectedClass = '.RadioItem__selected';
		this.components.noLockBottom = new ExpandableInterface('expandable4');
		this.components.noLockBottom.selectedClass = '.RadioItem__selected';
		this.components.noAutoClose = new ExpandableInterface('expandable5');
		this.components.noAutoClose.selectedClass = '.RadioItem__selected';
		this.components.defaultOpen = new ExpandableInterface('expandable6');
		this.components.defaultOpen.selectedClass = '.RadioItem__selected';
		this.components.disabled = new ExpandableInterface('expandable7');
		this.components.disabled.selectedClass = '.RadioItem__selected';
	}

	open (urlExtra) {
		super.open('ExpandableList-View', urlExtra);
	}

}

module.exports = new SpotlightMultiplePage();



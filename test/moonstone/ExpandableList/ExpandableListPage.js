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
		this.expandable1 = new ExpandableInterface('expandable1');
		this.expandable1.selectedClass = '.RadioItem__selected';
		this.expandable2 = new ExpandableInterface('expandable2');
		this.expandable2.selectedClass = '.Checkbox__selected';
		this.expandable3 = new ExpandableInterface('expandable3');
		this.expandable3.selectedClass = '.RadioItem__selected';
		this.expandable4 = new ExpandableInterface('expandable4');
		this.expandable4.selectedClass = '.RadioItem__selected';
		this.expandable5 = new ExpandableInterface('expandable5');
		this.expandable5.selectedClass = '.RadioItem__selected';
		this.expandable6 = new ExpandableInterface('expandable6');
		this.expandable6.selectedClass = '.RadioItem__selected';
	}

	open (urlExtra) {
		super.open('ExpandableList-View', urlExtra);
	}

}

module.exports = new SpotlightMultiplePage();



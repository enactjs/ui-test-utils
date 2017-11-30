'use strict';
const Page = require('../../Page.js');
const {element, getComponent, getSubComponent, getText} = require('../../utils.js');

const getIcon = getComponent('Icon');
const getLabeledItem = getComponent('LabeledItem');
const getLabeledItemTitle = getSubComponent('LabeledItem', 'title');
const getLabeledItemValue = getSubComponent('LabeledItem', 'label');

class ExpandableInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}>div`, (els) => els && !els[0].focus());
	}

	get      self () { return element(`#${this.id}`, browser); }
	get   chevron () { return getText(getIcon(this.self)); }
	get     title () { return getLabeledItem(this.self); }
	get titleText () { return getText(getLabeledItemTitle(this.self)); }
	get     value () { return getLabeledItemValue(this.self); }
	get valueText () { return getText(this.value); }
	get    isOpen () { return this.self.isExisting('.Transition__shown'); }

	item (n) { return element(`[role="checkbox"]:nth-of-type(${n + 1})`, this.self); }
}

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableList Test';
		this.expandableRadio = new ExpandableInterface('expandable1');
		this.expandableRadio.selectedClass = '.RadioItem__selected';
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
		this.expandable7 = new ExpandableInterface('expandable7');
		this.expandable7.selectedClass = '.RadioItem__selected';
	}

	open (urlExtra) {
		super.open('ExpandableList-View', urlExtra);
	}

}

module.exports = new SpotlightMultiplePage();



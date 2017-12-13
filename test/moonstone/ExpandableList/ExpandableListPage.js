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
		this.components.noNoneText = new ExpandableInterface('expandable8');
		this.components.noNoneText.selectedClass = '.RadioItem__selected';
	}

	open (urlExtra) {
		super.open('ExpandableList-View', urlExtra);
	}

}

module.exports = new SpotlightMultiplePage();



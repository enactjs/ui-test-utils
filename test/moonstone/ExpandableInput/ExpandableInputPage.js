'use strict';
const Page = require('../../Page.js');
const {element, getComponent, getSubComponent, getText} = require('../../utils.js');

const getIcon = getComponent('Icon');
const getInput = getComponent('Input');
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

	get self () { return element(`#${this.id}`, browser); }
	get input () { return getInput(this.self); }
	get chevron () { return getText(getIcon(this.self)); }
	get title () { return getLabeledItem(this.self); }
	get titleText () { return getText(getLabeledItemTitle(this.self)); }
	get titleSelector () { return `#${this.id} > div .Marquee__text`; }
	get titleIconSelector () { return '.LabeledItem__icon'; }
	get label () { return getLabeledItemValue(this.self); }
	get labelText () { return getText(this.label); }
	get isLabelExists () { return this.self.isExisting('.LabeledItem__label'); }
	get isOpen () { return this.self.isExisting('.Transition__shown'); }
	get iconBeforeSymbol () { return getText(element(`#${this.id} > div .Input__iconBefore`, browser)); }
	get iconBeforeSelector () { return `#${this.id} > div .Input__iconBefore`; }
	get iconAfterSymbol () { return getText(element(`#${this.id} > div .Input__iconAfter`, browser)); }
	get iconAfterSelector () { return `#${this.id} > div .Input__iconAfter`; }
	get isIconBefore () { return browser.isExisting(`#${this.id} > div .Input__iconBefore`)}
	get isIconAfter () { return browser.isExisting(`#${this.id} > div .Input__iconAfter`)}
	get placeHolder () { return browser.getAttribute(`#${this.id} > div .Input__input`, 'placeholder'); }

}

class ExpandableInputPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableInput Test';
		this.components = {};
		this.components.default = new ExpandableInterface('expandable1');
		this.components.defaultValue = new ExpandableInterface('expandable2');
		this.components.defaultOpen = new ExpandableInterface('expandable3');
		this.components.password = new ExpandableInterface('expandable4');
		this.components.placeholder = new ExpandableInterface('expandable5');
		this.components.iconBefore = new ExpandableInterface('expandable6');
		this.components.iconAfter = new ExpandableInterface('expandable7');
		this.components.iconBeforeAfter = new ExpandableInterface('expandable8');
		this.components.disabled = new ExpandableInterface('expandable9');
	}

	open (urlExtra) {
		super.open('ExpandableInput-View', urlExtra);
	}

	escape () {
		super.keyDelay('Escape');
	}

	hover () {
		browser.moveToObject('#expandable2');
	}

}

module.exports = new ExpandableInputPage();

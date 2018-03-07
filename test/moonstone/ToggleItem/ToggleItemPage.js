'use strict';
const Page = require('../../Page.js');
const {getComponent, getSubComponent, getText} = require('../../utils.js');

const getIcon = getComponent('moonstone', 'Icon');
const getMarqueeText = getSubComponent('moonstone', 'Marquee', 'text');

class ToggleItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get valueText () { return getText(getMarqueeText(this.self)); }
	get icon () { return getIcon(this.self); }
	get iconSymbol () { return getText(this.icon); }
	get isSelected () { return this.self.isExisting('.enact_moonstone_ToggleItem_ToggleItem_selected'); }
	get isAfter () { return this.self.isExisting('.enact_moonstone_SlotItem_SlotItem_after'); }
	get isBefore () { return this.self.isExisting('.enact_moonstone_SlotItem_SlotItem_before'); }
	get isInline () { return browser.isExisting(`#${this.id}.enact_moonstone_Item_Item_inline`); }
}

class ToggleItemPage extends Page {
	constructor () {
		super();
		this.title = 'ToggleItem Test';
		const toggleDefault = new ToggleItemInterface('toggleItem1');
		const toggleDefaultSelected = new ToggleItemInterface('toggleItem2');
		const toggleIconAfter = new ToggleItemInterface('toggleItem3');
		const toggleInline = new ToggleItemInterface('toggleItem4');
		const toggleInlineAfter = new ToggleItemInterface('toggleItem5');
		const toggleDisabled = new ToggleItemInterface('toggleItem6');

		this.components = {toggleDefault, toggleDefaultSelected, toggleIconAfter, toggleInline, toggleInlineAfter, toggleDisabled}
	}

	open (urlExtra) {
		super.open('ToggleItem-View', urlExtra);
	}
}

module.exports = new ToggleItemPage();

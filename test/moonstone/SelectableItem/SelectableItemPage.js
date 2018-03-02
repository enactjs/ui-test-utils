'use strict';
const Page = require('../../Page.js');
const {element, getSubComponent, getText} = require('../../utils.js');

const getMarqueeText = getSubComponent('moonstone', 'Marquee', 'text');

class SelectableItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get valueText () { return getText(getMarqueeText(this.self)); }
	get isSelected () { return !!element('.enact_moonstone_SelectableItem_SelectableItem_selected', this.self).value; }
	get isToggled () { return !!element('.enact_moonstone_ToggleItem_ToggleItem_selected', this.self).value; }
	get isInline () { return browser.isExisting(`#${this.id}.enact_moonstone_Item_Item_inline`); }
}

class SelectableItemPage extends Page {
	constructor () {
		super();
		this.title = 'SelectableItem Test';
		const selectableDefault = new SelectableItemInterface('selectableItem1');
		const selectableDefaultSelected = new SelectableItemInterface('selectableItem2');
		const selectableInline = new SelectableItemInterface('selectableItem3');
		const selectableDisabled = new SelectableItemInterface('selectableItem4');
		const selectableInlineDisabled = new SelectableItemInterface('selectableItem5');

		this.components = {selectableDefault, selectableDefaultSelected, selectableInline, selectableDisabled, selectableInlineDisabled}
	}

	open (urlExtra) {
		super.open('SelectableItem-View', urlExtra);
	}
}

module.exports = new SelectableItemPage();

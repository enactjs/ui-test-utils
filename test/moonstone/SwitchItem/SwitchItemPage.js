'use strict';
const Page = require('../../Page.js');
const {element, getSubComponent, getText} = require('../../utils.js');

const getMarqueeText = getSubComponent('ui', 'Marquee', 'text');


class SwitchItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get valueText () { return getText(getMarqueeText(this.self)); }
	get isSelected () { return !!element('.enact_moonstone_Switch_Switch_selected', this.self).value; }
	get isInline () { return browser.isExisting(`#${this.id}.enact_moonstone_Item_Item_inline`); }
}

class SwitchItemPage extends Page {
	constructor () {
		super();
		this.title = 'SwitchItem Test';
		const switchDefault = new SwitchItemInterface('switchItem1');
		const switchDefaultSelected = new SwitchItemInterface('switchItem2');
		const switchInline = new SwitchItemInterface('switchItem3');
		const switchDisabled = new SwitchItemInterface('switchItem4');
		const switchInlineDisabled = new SwitchItemInterface('switchItem5');

		this.components = {switchDefault, switchDefaultSelected, switchInline, switchDisabled, switchInlineDisabled}
	}

	open (urlExtra) {
		super.open('SwitchItem-View', urlExtra);
	}
}

module.exports = new SwitchItemPage();

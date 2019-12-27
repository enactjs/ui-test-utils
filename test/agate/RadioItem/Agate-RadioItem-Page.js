'use strict';
const Page = require('../../Page.js');
const {element, getText, hasClass} = require('../../utils.js');

class AgateRadioItemInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self () { return browser.element(`#${this.id}`); }
	get textContent () { return getText(element('.enact_agate_Item_Item_content', this.self)); }
	get isSelected () { return hasClass('enact_agate_RadioItem_RadioItem_selected', this.self); }
}


class AgateRadioItemPage extends Page {
	constructor () {
		super();
		this.title = 'Agate RadioItem Test';
		const radioDefault = new AgateRadioItemInterface('radioItem1');
		const radioDefaultSelected = new AgateRadioItemInterface('radioItem2');
		this.components = {radioDefault, radioDefaultSelected};
	}

	open (urlExtra) {
		super.open('Agate-RadioItem-View', urlExtra);
	}
}

module.exports = new AgateRadioItemPage();

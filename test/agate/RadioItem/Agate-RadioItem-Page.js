'use strict';
const Page = require('../../Page.js');

class AgateRadioItemInterface {
	constructor(id) {
		this.id = id;
	}

	focus() {
		return browser.selectorExecute(`#${this.id}`, (els) => els && !els[0].focus());
	}

	get self() { return browser.element(`#${this.id}`); }
}


class AgateRadioItemPage extends Page {
	constructor() {
		super();
		this.title = 'Agate RadioItem Test';
		const radioDefault = new AgateRadioItemInterface('radioItem1');
		const radioDefaultSelected = new AgateRadioItemInterface('radioItem2');

		this.components = {radioDefault, radioDefaultSelected};
	}

}

module.exports = new AgateRadioItemPage();

'use strict';
const Page = require('../../Page.js');

class ToggleItemInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class ToggleItemPage extends Page {
	constructor () {
		super();
		this.title = 'ToggleItem Spotlight Test';
		const firstToggleItem = new ToggleItemInterface('toggleItem');
		const secondToggleItem = new ToggleItemInterface('toggleItem2');

		this.components = {firstToggleItem, secondToggleItem};
	}

	open (urlExtra) {
		super.open('Spotlight-ToggleItem-View', urlExtra);
	}
}

module.exports = new ToggleItemPage();

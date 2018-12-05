'use strict';
const Page = require('../../Page.js');

class SwitchItemInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class SwitchItemPage extends Page {
	constructor () {
		super();
		this.title = 'SwitchItem Spotlight Test';
		const firstSwitchItem = new SwitchItemInterface('switchItem');
		const secondSwitchItem = new SwitchItemInterface('switchItem2');

		this.components = {firstSwitchItem, secondSwitchItem};
	}

	open (urlExtra) {
		super.open('Spotlight-SwitchItem-View', urlExtra);
	}
}

module.exports = new SwitchItemPage();

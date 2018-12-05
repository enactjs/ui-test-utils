'use strict';
const Page = require('../../Page.js');

class EnterToInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class EnterToPage extends Page {
	constructor () {
		super();
		this.title = 'EnterTo Spotlight Test';
		const buttonA = new EnterToInterface('A');
		const buttonAA = new EnterToInterface('AA');
		const buttonB = new EnterToInterface('B');
		const buttonBBB = new EnterToInterface('BBB');

		this.components = {buttonA, buttonAA, buttonB, buttonBBB};
	}

	open (urlExtra) {
		super.open('Spotlight-EnterTo-View', urlExtra);
	}
}

module.exports = new EnterToPage();

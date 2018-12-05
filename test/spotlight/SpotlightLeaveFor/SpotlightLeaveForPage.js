'use strict';
const Page = require('../../Page.js');

class LeaveForInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class LeaveForPage extends Page {
	constructor () {
		super();
		this.title = 'LeaveFor Spotlight Test';
		const buttonA = new LeaveForInterface('A');
		const buttonAA = new LeaveForInterface('AA');

		this.components = {buttonA, buttonAA};
	}

	open (urlExtra) {
		super.open('Spotlight-LeaveFor-View', urlExtra);
	}
}

module.exports = new LeaveForPage();

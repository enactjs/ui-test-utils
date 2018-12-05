'use strict';
const Page = require('../../Page.js');

class DirectionInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class DirectionPage extends Page {
	constructor () {
		super();
		this.title = 'Direction Spotlight Test';
		const buttonA = new DirectionInterface('A');
		const buttonC = new DirectionInterface('C');

		this.components = {buttonA, buttonC};
	}

	open (urlExtra) {
		super.open('Spotlight-Direction-View', urlExtra);
	}
}

module.exports = new DirectionPage();

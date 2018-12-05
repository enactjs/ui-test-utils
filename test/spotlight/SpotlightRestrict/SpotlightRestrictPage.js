'use strict';
const Page = require('../../Page.js');

class RestrictInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class RestrictPage extends Page {
	constructor () {
		super();
		this.title = 'Spotlight Restrict Test';
		const itemThree = new RestrictInterface('three');
		const itemB = new RestrictInterface('B');

		this.components = {itemThree, itemB};
	}

	open (urlExtra) {
		super.open('Spotlight-Restrict-View', urlExtra);
	}
}

module.exports = new RestrictPage();

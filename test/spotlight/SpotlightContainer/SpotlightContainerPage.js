'use strict';
const Page = require('../../Page.js');

class ContainerInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class ContainerPage extends Page {
	constructor () {
		super();
		this.title = 'Spotlight Container Test';
		const itemB = new ContainerInterface('B');
		const itemC = new ContainerInterface('C');

		this.components = {itemB, itemC};
	}

	open (urlExtra) {
		super.open('Spotlight-Container-View', urlExtra);
	}
}

module.exports = new ContainerPage();

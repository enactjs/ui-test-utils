'use strict';
const Page = require('../../Page.js');

class DisappearInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get exitAppButton () { return browser.element('.enact_moonstone_Panels_ApplicationCloseButton_applicationCloseButton'); }
}
class DisappearPage extends Page {
	constructor () {
		super();
		this.title = 'Disappear Spotlight Test';
		const buttonA = new DisappearInterface('A');

		this.components = {buttonA};
	}

	open (urlExtra) {
		super.open('Spotlight-Disappear-View', urlExtra);
	}
}

module.exports = new DisappearPage();

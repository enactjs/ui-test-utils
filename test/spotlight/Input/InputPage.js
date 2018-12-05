'use strict';
const Page = require('../../Page.js');

class InputInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get input () { return browser.element('input'); }
}
class InputPage extends Page {
	constructor () {
		super();
		this.title = 'Input Spotlight Test';
		const defaultInput = new InputInterface('defaultInput');
		const dismissInput = new InputInterface('dismissInput');
		const button = new InputInterface('btn');

		this.components = {defaultInput, dismissInput, button};
	}

	open (urlExtra) {
		super.open('Spotlight-Input-View', urlExtra);
	}
}

module.exports = new InputPage();

'use strict';
const Page = require('../../Page.js');

class ExpandableInputInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get body () { return browser.element(`#${this.id} > div`); }
	get input () { return browser.element('input'); }
}
class ExpandableInputPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableInput Spotlight Test';
		const expandableInput = new ExpandableInputInterface('expandableInput');
		const button = new ExpandableInputInterface('btn');

		this.components = {expandableInput, button};
	}

	open (urlExtra) {
		super.open('Spotlight-ExpandableInput-View', urlExtra);
	}
}

module.exports = new ExpandableInputPage();

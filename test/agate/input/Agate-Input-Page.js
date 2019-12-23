'use strict';
const Page = require('../../Page.js');

class AgateInputPage extends Page {
	constructor () {
		super();
		this.title = 'Agate Input Test';
	}
	get disabledInput () { return browser.element('#input5'); }
}

module.exports = new AgateInputPage();

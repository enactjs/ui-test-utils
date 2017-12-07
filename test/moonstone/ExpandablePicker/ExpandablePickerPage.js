'use strict';
const Page = require('../../Page.js');

class ExpandablePickerPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandablePicker Test';
	}

	open (urlExtra) {
		super.open('ExpandablePicker-View', urlExtra);
	}

	get expandable1 () { return browser.element('#expandable1'); }
}

module.exports = new ExpandablePickerPage();


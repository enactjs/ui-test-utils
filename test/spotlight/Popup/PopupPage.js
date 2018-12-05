'use strict';
const Page = require('../../Page.js');

class PopupInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class PopupPage extends Page {
	constructor () {
		super();
		this.title = 'Popup Spotlight Test';
		const openButton = new PopupInterface('openBtn');
		const firstButtonInPopup = new PopupInterface('firstBtn');
		const secondButtonInPopup = new PopupInterface('secondBtn');

		this.components = {openButton, firstButtonInPopup, secondButtonInPopup};
	}

	open (urlExtra) {
		super.open('Spotlight-Popup-View', urlExtra);
	}
}

module.exports = new PopupPage();

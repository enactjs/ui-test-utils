'use strict';
const Page = require('../../Page.js');

class DialogInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class DialogPage extends Page {
	constructor () {
		super();
		this.title = 'Dialog Spotlight Test';
		const dialogButton = new DialogInterface('openBtn');
		const inputDialogButton = new DialogInterface('inputBtn');
		const firstButtonInPopup = new DialogInterface('firstBtn');
		const secondButtonInPopup = new DialogInterface('secondBtn');
		const closeButtonInInputPopup = new DialogInterface('closeBtn');
		const inputInInputPopup = new DialogInterface('dialogInput');
		this.components = {
			dialogButton,
			inputDialogButton,
			firstButtonInPopup,
			secondButtonInPopup,
			closeButtonInInputPopup,
			inputInInputPopup
		};
	}

	open (urlExtra) {
		super.open('Spotlight-Dialog-View', urlExtra);
	}
}

module.exports = new DialogPage();

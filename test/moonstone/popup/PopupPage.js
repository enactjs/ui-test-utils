'use strict';

const Page = require('../../Page.js');

class PopupPage extends Page {
	constructor () {
		super();
		this.title = 'Poup Test';
	}

	open (urlExtra) {
		super.open('Popup-View', urlExtra);
	}

	get buttonPopup () { return browser.element('#ButtonPopup'); }
	get buttonOK () { return browser.element('#ButtonOK'); }
	get buttonCancel () { return browser.element('#ButtonCancel'); }
	get buttonClose () { return browser.element('#PopupMain> .IconButton__iconButton'); }
	get popupMain () { return browser.element('#PopupMain'); }
	get popupTitle () { return browser.element('#PopupMain>div>div').getText(); }
}

module.exports = new PopupPage();

'use strict';

const Page = require('../../Page.js');

class PopupPage extends Page {
	constructor () {
		super();
		this.title = 'Poup Test';
		this.popupTitleText = 'Hello Popup';
		this.popupClass = '.Popup__popup';
		this.scrimClass = '.Scrim__scrim';
		this.iconButtonClass = '.IconButton__iconButton';
	}

	open (urlExtra) {
		super.open('Popup-View', urlExtra);
	}

	escButton () {
		super.keyDelay('Escape');
	}

	get buttonPopup () { return browser.element('#ButtonPopup'); }
	get popupLayer () { return browser.element('#floatLayer'); }
	get buttonOK () { return browser.element('#ButtonOK'); }
	get buttonCancel () { return browser.element('#ButtonCancel'); }
	get buttonClose () { return browser.element('#PopupMain> .IconButton__iconButton'); }
	get popupMain () { return browser.element('#PopupMain'); }
	get popupTitle () { return browser.element('#PopupMain>div>div').getText(); }
}

module.exports = new PopupPage();

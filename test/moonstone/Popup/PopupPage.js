'use strict';

const Page = require('../../Page.js');
const {element, getText} = require('../../utils.js');

class PopupCommon {

	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id} > div`, (els) => els && !els[0].focus());
	}

	get buttonPopup1 () { return element('#buttonPopup1', browser); }
	get buttonPopup2 () { return element('#buttonPopup2', browser); }
	get buttonPopup3 () { return element('#buttonPopup3', browser); }
	get buttonPopup4 () { return element('#buttonPopup4', browser); }
	get   popupLayer () { return element('#floatLayer', browser); }
	get      isPopup () { return this.popupLayer.isExisting('.Popup__popup'); }
	get      isScrim () { return this.popupLayer.isExisting('.Scrim__scrim'); }
}

class PopupInterface {

	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.selectorExecute(`#${this.id} #buttonOK`, (els) => els && !els[0].focus());
	}

	get          self () { return element(`#${this.id}`, browser); }
	get      buttonOK () { return element(`#${this.id} #buttonOK`, browser); }
	get  buttonCancel () { return element(`#${this.id} #buttonCancel`, browser); }
	get   buttonClose () { return element(`#${this.id} .IconButton__iconButton`, browser); }
	get         title () { return getText(element(`#${this.id}>div>div`, browser)); }
	get isCloseButton () { return this.self.isExisting('.IconButton__iconButton'); }
}

class PopupPage extends Page {

	constructor () {
		super();
		this.title = 'Popup Test';
		this.components = {};
		this.components.popupCommon = new PopupCommon('popupMain');
		this.components.popup1 = new PopupInterface('popup1');
		this.components.popup2 = new PopupInterface('popup2');
		this.components.popup3 = new PopupInterface('popup3');
		this.components.popup4 = new PopupInterface('popup4');
	}

	open (urlExtra) {
		super.open('Popup-View', urlExtra);
	}

	escButton () {
		super.keyDelay('Escape');
	}

	clickPopup () {
		browser.click('#floatLayer');
	}
}
module.exports = new PopupPage();

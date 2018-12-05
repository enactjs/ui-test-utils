'use strict';
const Page = require('../../Page.js');

class ContextualPopupInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class ContextualPopupPage extends Page {
	constructor () {
		super();
		this.title = 'ContextualPopup Spotlight Test';
		const AverageButton = new ContextualPopupInterface('averageBtn');
		const NestedButton = new ContextualPopupInterface('nestedBtn');
		const ModalButton = new ContextualPopupInterface('modalBtn');
		const CreekRadio = new ContextualPopupInterface('creek');
		const RiverRadio = new ContextualPopupInterface('river');
		const OceanRadio = new ContextualPopupInterface('ocean');
		const Button1 = new ContextualPopupInterface('btn1');
		const Button3 = new ContextualPopupInterface('btn3');

		this.components = {AverageButton, NestedButton, ModalButton, CreekRadio, RiverRadio, OceanRadio, Button1, Button3};
	}

	open (urlExtra) {
		super.open('Spotlight-ContextualPopup-View', urlExtra);
	}
}

module.exports = new ContextualPopupPage();

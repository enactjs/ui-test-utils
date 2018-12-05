'use strict';
const Page = require('../../Page.js');

class PanelsInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get breadcrumb () { return browser.element('.enact_moonstone_Panels_Panels_breadcrumb'); }
	get scrollDown () { return browser.element('[aria-label="scroll down"]'); }
}
class PanelsPage extends Page {
	constructor () {
		super();
		this.title = 'Panels Spotlight Test';
		this.components = {};
		this.components.item1InFirstPanel = new PanelsInterface('item1');
		this.components.item2InFirstPanel = new PanelsInterface('item2');
		this.components.item3InFirstPanel = new PanelsInterface('item3');
		this.components.item4InFirstPanel = new PanelsInterface('item4');
		this.components.item1InSecondPanel = new PanelsInterface('scrollitem1');
		this.components.headerButton = new PanelsInterface('headerBtn');
	}

	open (urlExtra) {
		super.open('Spotlight-Panels-View', urlExtra);
	}
}

module.exports = new PanelsPage();

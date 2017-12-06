'use strict';

const Page = require('../../Page.js');
const {element, getText} = require('../../utils');


class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'Spotlight Multiple Containers';
	}

	open (urlExtra) {
		super.open('Spotlight-View', urlExtra);
	}

	updateStatus () {
		browser.click('.spotlight-status-update');
	}

	movePointer () {
		// move the pointer about
		browser
			.moveToObject('body', 0, 0)
			.moveToObject('.spotlight-status-pointerMode');
	}

	pause () {
		browser.click('.spotlight-status-pause');
	}

	resume () {
		browser.click('.spotlight-status-resume');
	}

	get pointerMode () { return getText(element('.spotlight-status-pointerMode', browser)) === 'true'; }
	get paused () { return getText(element('.spotlight-status-paused', browser)) === 'true'; }

	get item1 () { return browser.element('#item1'); }
	get item2 () { return browser.element('#item2'); }
	get item3 () { return browser.element('#item3'); }
	get item4 () { return browser.element('#item4'); }
	get nonSpottableItem2 () { return browser.element('#itemns2'); }
	get itemA () { return browser.element('#itemA'); }
	get itemB () { return browser.element('#itemB'); }
	get nonSpottableItemB () { return browser.element('#itemnsB'); }
	get itemC () { return browser.element('#itemC'); }
	get itemD () { return browser.element('#itemD'); }
}

module.exports = new SpotlightMultiplePage();


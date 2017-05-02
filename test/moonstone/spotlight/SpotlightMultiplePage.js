'use strict';
const Page = require('../../Page.js');

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'Spotlight Multiple Containers';
	}

	open (urlExtra) {
		super.open(`${__dirname}/Spotlight_View.js`, urlExtra);
	}

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


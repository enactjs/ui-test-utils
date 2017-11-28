'use strict';
const Page = require('../../Page.js');

class SpotlightMultiplePage extends Page {
	constructor () {
		super();
		this.title = 'Panels Test';
	}

	open (urlExtra) {
		super.open('Panels-View', urlExtra);
	}
}

module.exports = new SpotlightMultiplePage();


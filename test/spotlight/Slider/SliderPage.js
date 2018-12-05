'use strict';
const Page = require('../../Page.js');

class SliderInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get activated () { return browser.element(); }
}
class SliderPage extends Page {
	constructor () {
		super();
		this.title = 'Slider Spotlight Test';
		const slider = new SliderInterface('slider');

		this.components = {slider};
	}

	open (urlExtra) {
		super.open('Spotlight-Slider-View', urlExtra);
	}
}

module.exports = new SliderPage();

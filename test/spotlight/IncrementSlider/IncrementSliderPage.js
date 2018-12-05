'use strict';
const Page = require('../../Page.js');

class IncrementSliderInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get incrementer () { return browser.element('.enact_moonstone_IncrementSlider_IncrementSlider_incrementButton'); }
	get decrementer () { return browser.element('.enact_moonstone_IncrementSlider_IncrementSlider_decrementButton'); }
}
class IncrementSliderPage extends Page {
	constructor () {
		super();
		this.title = 'IncrementSlider Spotlight Test';
		const firstIncrementSlider = new IncrementSliderInterface('slider1');
		const secondIncrementSlider = new IncrementSliderInterface('slider2');

		this.components = {firstIncrementSlider, secondIncrementSlider};
	}

	open (urlExtra) {
		super.open('Spotlight-IncrementSlider-View', urlExtra);
	}
}

module.exports = new IncrementSliderPage();

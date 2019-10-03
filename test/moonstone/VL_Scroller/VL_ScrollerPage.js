'use strict';
const Page = require('../../Page.js');
const {element} = require('../../utils.js');

class VL_ScrollerPage extends Page {

	constructor () {
		super();
		this.title = 'Scroller Page Down does not create Scroll/Bounceback in VirtualList';
	}

	open (urlExtra) {
		super.open('VL_Scroller-View', urlExtra);
	}

	// needed lr
	focus () {
		return browser.selectorExecute(`#${this.id}>div`, (els) => els && !els[0].focus());
	}

	get button1 () { return element('#Page_1_Button', browser); }
	get button2 () { return element('#Page_2_Button', browser); }
	get button3 () { return element('#Page_3_Button', browser); }

	item (num) {
		return element(`#item${num}`, browser);
	}
}

module.exports = new VL_ScrollerPage();

'use strict';
const Page = require('../../Page.js');
const {element} = require('../../utils.js');

class VirtualListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualList Test';

	}

	open (urlExtra) {
		super.open('VirtualList-View', urlExtra);
	}

	get buttonTop () { return element('#top', browser); }
	get buttonLeft () { return element('#left', browser); }
	get buttonRight () { return element('#right', browser); }
	get buttonBottom () { return element('#bottom', browser); }
	get buttonScrollUp () { return element('.enact_moonstone_Scrollable_Scrollbar_scrollbar :nth-child(1)', browser); }
	get buttonScrollDown () { return element('.enact_moonstone_Scrollable_Scrollbar_scrollbar :nth-child(3)', browser); }

	item (num) {
		return element(`#item${num}`, browser);
	}
}

module.exports = new VirtualListPage();

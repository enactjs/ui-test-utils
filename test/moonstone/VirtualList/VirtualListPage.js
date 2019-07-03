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
	get scrollBarSize () { return browser.getElementSize('.enact_moonstone_Scrollable_Scrollbar_scrollbar'); }
	get virtualListSize () { return browser.getElementSize('.enact_ui_Scrollable_Scrollable_scrollable'); }

	item (num) {
		return element(`#item${num}`, browser);
	}

	/* global document */
	topVisibleItemId () {
		return document.execute(function () {
			const scroller = document.querySelector('.enact_ui_Scrollable_Scrollable_scrollable'),
				{top, left, width} = scroller.getBoundingClientRect().bottom;

			let currentY = top + 1,
				middle = left + Math.floor((left + width)/2);

			for (let i = 0; i < 10; i++) {
				const el = document.elementFromPoint(currentY, middle);

				// If the element at the point has an id, return it
				if (el.id) {
					return el.id;
				}
				// else, it's inside the list itself, increment y and try again
			}
			return 'unknown';	// we didn't find it?!
		}).value;
	}
}

module.exports = new VirtualListPage();

'use strict';
const Page = require('../../Page.js');
const {element} = require('../../utils.js');

const scrollableSelector = '.enact_ui_Scrollable_Scrollable_scrollable';
const scrollbarSelector = '.enact_moonstone_Scrollable_Scrollbar_scrollbar';

class VirtualListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualList Test';

	}

	open (urlExtra) {
		super.open('VirtualList-View', urlExtra);
	}

	get buttonFocusableScrollbar () { return element('#focusableScrollbar', browser); }
	get buttonHideScrollbar () { return element('#hideScrollbar', browser); }
	get buttonTop () { return element('#top', browser); }
	get buttonLeft () { return element('#left', browser); }
	get buttonRight () { return element('#right', browser); }
	get buttonBottom () { return element('#bottom', browser); }
	get buttonScrollUp () { return element(`${scrollbarSelector} :nth-child(1)`, browser); }
	get buttonScrollDown () { return element(`${scrollbarSelector} :nth-child(3)`, browser); }
	get buttonWrap () { return element('#wrap', browser); }
	get scrollBarSize () { return browser.getElementSize(`${scrollbarSelector}`); }
	get list () { return element('#list', browser); }
	get listSize () { return browser.getElementSize(`${scrollableSelector}`); }

	item (num) {
		return element(`#item${num}`, browser);
	}

	/* global document */
	topVisibleItemId () {
		return document.execute(function () {
			const scroller = document.querySelector(scrollableSelector),
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
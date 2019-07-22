'use strict';
const Page = require('../../Page.js');
const {element} = require('../../utils.js');

const buttonBottomSelector = '.bottom';
const buttonLeftSelector = '.left';
const buttonRightSelector = '.right';
const buttonTopSelector = '.top';
const list1Selector = '#list1';
const list2Selector = '#list2';
const list3Selector = '#list3';
const scrollableSelector = '.enact_ui_Scrollable_Scrollable_scrollable';
const scrollbarSelector = '.enact_moonstone_Scrollable_Scrollbar_scrollbar';
const scrollDownSelector = ':nth-child(3)';
const scrollUpSelector = ':nth-child(1)';

class VirtualListPage extends Page {

	constructor () {
		super();
		this.title = 'VirtualList Test';

	}

	open (urlExtra) {
		super.open('VirtualList-View', urlExtra);
	}

	get list1 () { return element(list1Selector, browser); }
	get list1ButtonTop () { return element(`${list1Selector} ${buttonTopSelector}`, browser); }
	get list1ButtonLeft () { return element(`${list1Selector} ${buttonLeftSelector}`, browser); }
	get list1ButtonRight () { return element(`${list1Selector} ${buttonRightSelector}`, browser); }
	get list1ButtonBottom () { return element(`${list1Selector} ${buttonBottomSelector}`, browser); }
	get list1ButtonScrollUp () { return element(`${list1Selector} ${scrollbarSelector} ${scrollUpSelector}`, browser); }
	get list1ButtonScrollDown () { return element(`${list1Selector} ${scrollbarSelector} ${scrollDownSelector}`, browser); }
	get list1ScrollBarSize () { return browser.getElementSize(`${list1Selector} ${scrollbarSelector}`); }
	get list1Size () { return browser.getElementSize(`${list1Selector} ${scrollableSelector}`); }
	get list2 () { return element(list2Selector, browser); }
	get list2ButtonTop () { return element(`${list2Selector} ${buttonTopSelector}`, browser); }
	get list2ButtonLeft () { return element(`${list2Selector} ${buttonLeftSelector}`, browser); }
	get list2ButtonRight () { return element(`${list2Selector} ${buttonRightSelector}`, browser); }
	get list2ButtonBottom () { return element(`${list2Selector} ${buttonBottomSelector}`, browser); }
	get list3 () { return element(list3Selector, browser); }
	get list3ButtonTop () { return element(`${list3Selector} ${buttonTopSelector}`, browser); }
	get list3ButtonLeft () { return element(`${list3Selector} ${buttonLeftSelector}`, browser); }
	get list3ButtonRight () { return element(`${list3Selector} ${buttonRightSelector}`, browser); }
	get list3ButtonBottom () { return element(`${list3Selector} ${buttonBottomSelector}`, browser); }

	item (num) {
		return element(`#item${num}`, browser);
	}

	setList2Focus () {
		browser.execute(function (selector) {
			document.querySelector(selector).focus();
		}, `${list2Selector} ${buttonLeftSelector}`);
	}

	setList3Focus () {
		browser.execute(function (selector) {
			document.querySelector(selector).focus();
		}, `${list3Selector} ${buttonLeftSelector}`);
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

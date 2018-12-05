'use strict';
const Page = require('../../Page.js');

class ExpandableListInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
	get body () { return browser.element(`#${this.id} > div`); }
}
class ExpandableListPage extends Page {
	constructor () {
		super();
		this.title = 'ExpandableList Spotlight Test';
		const expandableListDefault = new ExpandableListInterface('expandableListDefault');
		const expandableListCOS = new ExpandableListInterface('expandableListCOS');
		const expandableListNLB = new ExpandableListInterface('expandableListNLB');
		const extraItem = new ExpandableListInterface('extraItem');
		const option1 = new ExpandableListInterface('option1');
		const option2 = new ExpandableListInterface('option2');
		const option4 = new ExpandableListInterface('option4');
		const option7 = new ExpandableListInterface('option7');

		this.components = {
			expandableListDefault,
			expandableListCOS,
			expandableListNLB,
			extraItem,
			option1,
			option2,
			option4,
			option7
		};
	}

	open (urlExtra) {
		super.open('Spotlight-ExpandableList-View', urlExtra);
	}
}

module.exports = new ExpandableListPage();

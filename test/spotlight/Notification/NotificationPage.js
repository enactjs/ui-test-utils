'use strict';
const Page = require('../../Page.js');

class NotificationInterface {
	constructor (id) {
		this.id = id;
	}

	get item () { return browser.element(`#${this.id}`); }
}
class NotificationPage extends Page {
	constructor () {
		super();
		this.title = 'Notification Spotlight Test';
		const openButton = new NotificationInterface('openBtn');
		const firstButtonInPopup = new NotificationInterface('firstBtn');
		const secondButtonInPopup = new NotificationInterface('secondBtn');
		this.components = {
			openButton,
			firstButtonInPopup,
			secondButtonInPopup
		};
	}

	open (urlExtra) {
		super.open('Spotlight-Notification-View', urlExtra);
	}
}

module.exports = new NotificationPage();

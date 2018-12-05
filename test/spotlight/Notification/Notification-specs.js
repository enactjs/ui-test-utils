const Page = require('./NotificationPage');

describe('Notification', () => {

	before(() => {
		Page.open();
	});

	const {
		openButton,
		firstButtonInPopup,
		secondButtonInPopup
	} = Page.components;

	it('1. Verify the open button has focus.', () => {
		expect(openButton.item.hasFocus()).to.be.true();
	});

	it('2. Open Notification popup and verify there is no focus in the background.', () => {
		Page.spotlightSelect();
		Page.delay();
		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('3. Verify the second button has focus in the popup by pressing the RIGHT key.', () => {
		Page.spotlightRight();
		expect(secondButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('4. Click button to close popup and verify button has focus in the panel.', () => {
		Page.spotlightSelect();
		Page.delay();
		expect(openButton.item.hasFocus()).to.be.true();
	});

	it('5. Open Notification popup again and verify the first button has focus in the popup. (last-focused X)', () => {
		Page.spotlightSelect();
		Page.delay();
		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('6. Verify the first button has focus even if tryping to move spotlight to out of popup. (self-only)', () => {
		Page.spotlightUp();
		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});
});

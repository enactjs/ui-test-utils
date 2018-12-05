const Page = require('./PopupPage');

describe('Popup', () => {

	before(() => {
		Page.open();
	});

	const {openButton, firstButtonInPopup, secondButtonInPopup} = Page.components;

	it('1. Verify open button has focus.', () => {
		expect(openButton.item.hasFocus()).to.be.true();
	});

	it('2. Click button to open popup and verify the first button has focus in the poupup.', () => {
		Page.spotlightSelect();
		Page.delay();

		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('3. Verify the first button has focus even if tryping to move spotlight to out of popup.', () => {
		Page.spotlightUp();
		Page.spotlightUp();

		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('4. Verify the second button has focus in the popup by pressing the RIGHT key.', () => {
		Page.spotlightRight();

		expect(secondButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('5. Click button to close popup and verify button has focus in the panel.', () => {
		Page.spotlightSelect();
		Page.delay();

		expect(openButton.item.hasFocus()).to.be.true();
	});

	it('6. Open Notification popup again and verify the first button has focus in the popup. (last-focused X)', () => {
		Page.spotlightSelect();
		Page.delay();

		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('7. Verify the first button has focus even if tryping to move spotlight to out of popup. (self-only)', () => {
		Page.spotlightUp();

		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('8. Verify the first button has focus even if tryping to move spotlight to out of popup.', () => {
		Page.spotlightSelect();
		Page.delay();
		Page.spotlightUp();

		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});
});

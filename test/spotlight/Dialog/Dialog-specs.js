const Page = require('./DialogPage');

describe('Dialog', () => {

	before(() => {
		Page.open();
	});

	const {
		dialogButton,
		inputDialogButton,
		firstButtonInPopup,
		secondButtonInPopup,
		closeButtonInInputPopup,
		inputInInputPopup
	} = Page.components;

	it('1. Verify the first button has focus.', () => {
		Page.spotlightSelect();
		expect(dialogButton.item.hasFocus()).to.be.true();
	});

	it('2. Click the button to show popup. Verify button has focus in the popup after popup opens.', () => {
		Page.spotlightSelect();
		Page.delay();
		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('3. Move spotlight to the second button. Verify the second button has focus.', () => {
		Page.spotlightRight();
		expect(secondButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('4. Click the button to close popup. And verify there is focus in the Panel.', () => {
		Page.spotlightSelect();
		Page.delay();
		expect(dialogButton.item.hasFocus()).to.be.true();
	});

	it('5. Open the popup again. And verify the first button has focus in the popup. (last-focused X)', () => {
		Page.spotlightSelect();
		Page.delay();
		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('6. Verify the focus does not move out of the popup when press UP key. (self-only)', () => {
		Page.spotlightUp();
		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('7. Enter the Home key to confirm the window blur/focus operation.', () => {
		Page.windowSpotlightBlur();
		Page.delay();
		Page.windowSpotlightFocus();
		Page.delay();
		expect(firstButtonInPopup.item.hasFocus()).to.be.true();
	});

	it('8. Close the first Dialog. And click the INPUT DIALOG button to open input popup.', () => {
		Page.spotlightSelect();
		Page.delay();
		expect(dialogButton.item.hasFocus()).to.be.true();

		Page.spotlightRight();
		expect(inputDialogButton.item.hasFocus()).to.be.true();

		Page.spotlightSelect();
		Page.delay();
		expect(closeButtonInInputPopup.item.hasFocus()).to.be.true();

		Page.spotlightDown();
		expect(inputInInputPopup.item.hasFocus()).to.be.true();
	});
});

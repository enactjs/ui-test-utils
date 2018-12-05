const Page = require('./ContextualPopupPage');

describe('ContextualPopup', () => {

	before(() => {
		Page.open();
	});

	const {AverageButton, NestedButton, ModalButton, CreekRadio, RiverRadio, Button1, Button3} = Page.components;

	it('1. Verify AVERAGE button has focus.', () => {
		expect(AverageButton.item.hasFocus()).to.be.true();
	});

	it('2. Click AVERAGE button. Verify popup shows and spotlight retains in the button.', () => {
		Page.spotlightSelect();
		expect(AverageButton.item.hasFocus()).to.be.true();
	});

	it('3. Move spotlight to NESTED RADIO button and verify that has focus.', () => {
		Page.spotlightRight();
		expect(NestedButton.item.hasFocus()).to.be.true();
	});

	it('4. Click button to show popup. Verify the first item has focus.', () => {
		Page.spotlightSelect();
		expect(CreekRadio.item.hasFocus()).to.be.true();
	});

	it('5. Press the down key. Verify the second item has focus.', () => {
		Page.spotlightDown();
		expect(RiverRadio.item.hasFocus()).to.be.true();
	});

	it('6. Press the right key. Verify the ContextualButton has focus.', () => {
		Page.spotlightRight();
		expect(NestedButton.item.hasFocus()).to.be.true();
	});

	it('7. Click button to show popup again. Verify the first item has focus.', () => {
		Page.spotlightSelect();
		expect(CreekRadio.item.hasFocus()).to.be.true();
	});

	it('8. Move spotlight to SPOTLIGHT MODAL button.', () => {
		Page.spotlightRight();
		Page.spotlightDown();
		expect(ModalButton.item.hasFocus()).to.be.true();
	});

	it('9. Open popup. Verify the first item has focus.', () => {
		Page.spotlightSelect();
		expect(Button1.item.hasFocus()).to.be.true();
	});

	it('10. Move spotlight to BUTTON3. Try to move spotlight to contextualButton by pressing DOWN key. (self-only)', () => {
		Page.spotlightDown();
		Page.spotlightDown();
		Page.spotlightDown();
		expect(Button3.item.hasFocus()).to.be.true();
	});
});

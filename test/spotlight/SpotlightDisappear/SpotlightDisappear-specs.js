const Page = require('./SpotlightDisappearPage');

describe('SpotlightDisappear', () => {

	before(() => {
		Page.open();
	});

	const {buttonA} = Page.components;

	it('1. Verify A button has focus.', () => {
		expect(buttonA.item.hasFocus()).to.be.true();
	});

	it('2. Verify close X button has focus when A button is disabled by clicking.', () => {
		Page.spotlightSelect();
		expect(buttonA.item.hasFocus()).to.be.true();
	});

	it('3. Enter the Home key to confirm the window blur/focus operation.', () => {
		Page.windowSpotlightBlur();
		Page.delay();
		Page.windowSpotlightFocus();
		Page.delay();
		expect(buttonA.exitAppButton.hasFocus()).to.be.true();
	});
});

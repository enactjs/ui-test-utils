const Page = require('./SpotlightLeaveForPage');

describe('SpotlightLeaveFor', () => {

	before(() => {
		Page.open();
	});

	const {buttonA, buttonAA} = Page.components;

	it('1. Verify A button has focus.', () => {
		Page.spotlightSelect();
		expect(buttonA.item.hasFocus()).to.be.true();
	});

	it('2. Verify AA button has focus by pressing the RIGHT key.', () => {
		Page.spotlightRight();
		expect(buttonAA.item.hasFocus()).to.be.true();
	});

	it('3. Verify AA button has focus even if pressing the DOWN key many times.', () => {
		Page.spotlightDown();
		Page.spotlightDown();
		expect(buttonAA.item.hasFocus()).to.be.true();
	});
});

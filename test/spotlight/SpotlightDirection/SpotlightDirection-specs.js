const Page = require('./SpotlightDirectionPage');

describe('SpotlightDirection', () => {

	before(() => {
		Page.open();
	});

	const {buttonA, buttonC} = Page.components;

	it('1. Verify A button has focus.', () => {
		Page.spotlightSelect();
		expect(buttonA.item.hasFocus()).to.be.true();
	});

	it('2. Move spotlight from A button to C button.', () => {
		Page.spotlightRight();
		Page.spotlightRight();
		expect(buttonC.item.hasFocus()).to.be.true();
	});

	it('3. Verify A button has focus when press the DOWN key.', () => {
		Page.spotlightDown();
		expect(buttonA.item.hasFocus()).to.be.true();
	});

	it('4. Move spotlight from A button to C button.', () => {
		Page.spotlightRight();
		Page.spotlightRight();
		expect(buttonC.item.hasFocus()).to.be.true();
	});

	it('5. Verify A button has focus when press the RIGHT key.', () => {
		Page.spotlightRight();
		expect(buttonA.item.hasFocus()).to.be.true();
	});
});

const Page = require('./SpotlightEnterToPage');

describe('SpotlightEnterTo', () => {

	before(() => {
		Page.open();
	});

	const {buttonA, buttonAA, buttonB, buttonBBB} = Page.components;

	it('1. Verify A button has focus.', () => {
		Page.spotlightSelect();
		expect(buttonA.item.hasFocus()).to.be.true();
	});

	it('2. Verify AA button has focus by pressing the RIGHT key.', () => {
		Page.spotlightRight();
		expect(buttonAA.item.hasFocus()).to.be.true();
	});

	it('3.Verify B button has focus by pressing the DOWN key.', () => {
		Page.spotlightDown();
		expect(buttonB.item.hasFocus()).to.be.true();
	});

	it('4. Move spotlight to BBB button.', () => {
		Page.spotlightRight();
		Page.spotlightRight();
		expect(buttonBBB.item.hasFocus()).to.be.true();
	});

	it('5. Verify AA button has focus when spotlight moves to above container.', () => {
		Page.spotlightUp();
		expect(buttonAA.item.hasFocus()).to.be.true();
	});

	it('6. Verify BBB button has focus when spotlight moves to below container.', () => {
		Page.spotlightDown();
		expect(buttonBBB.item.hasFocus()).to.be.true();
	});
});

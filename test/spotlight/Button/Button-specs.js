const Page = require('./ButtonPage');

describe('Button', () => {

	before(() => {
		Page.open();
	});

	const {firstButton, secondButton} = Page.components;

	it('1. Verify the first button has focus.', () => {
		expect(firstButton.item.hasFocus()).to.be.true();
	});

	it('2. Move spotlight to the second button and click. And then verify the second button has focus.', () => {
		Page.spotlightRight();
		expect(secondButton.item.hasFocus()).to.be.true();
	});

	it('3. Verify that the focus moves after the click action. (spotlightDisappear)', () => {
		Page.spotlightSelect();
		expect(secondButton.item.hasFocus()).to.be.true();
	});

	it('4. Move the spotlight back to the first button.', () => {
		Page.spotlightLeft();
		expect(firstButton.item.hasFocus()).to.be.true();
	});

	it('5. Verify that the focus moves after the click action. (spotlightDisappear)', () => {
		Page.spotlightSelect();
		expect(firstButton.item.hasFocus()).to.be.true();
	});
});

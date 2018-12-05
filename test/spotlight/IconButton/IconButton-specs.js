const Page = require('./IconButtonPage');

describe('IconButton', () => {

	before(() => {
		Page.open();
	});

	const {firstButton, secondButton} = Page.components;

	it('1. Verify the first button has focus.', () => {
		expect(firstButton.item.hasFocus()).to.be.true();
	});

	it('3. Move spotlight to the second and veirfy the second button has focus.', () => {
		Page.spotlightRight();
		expect(secondButton.item.hasFocus()).to.be.true();
	});

	it('4. Veirfy the second button has focus when click the button.', () => {
		Page.spotlightSelect();
		expect(secondButton.item.hasFocus()).to.be.true();
	});

	it('5. Back spotlight to the first button. Click the button and verify the first button has focus. (it has to retain)', () => {
		Page.spotlightLeft();
		Page.spotlightSelect();
		expect(firstButton.item.hasFocus()).to.be.true();
	});
});

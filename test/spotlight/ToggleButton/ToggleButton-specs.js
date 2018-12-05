const Page = require('./ToggleButtonPage');

describe('ToggleButton', () => {

	before(() => {
		Page.open();
	});

	const {firstToggleButton, secondToggleButton} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(firstToggleButton.item.hasFocus()).to.be.true();
	});

	it('2. Move spotlight to the second item. Verify it has focus when disabled after click.', () => {
		Page.spotlightRight();
		expect(secondToggleButton.item.hasFocus()).to.be.true();
	});

	it('3. Veirfy the second item has focus when click the button.', () => {
		Page.spotlightSelect();
		expect(secondToggleButton.item.hasFocus()).to.be.true();
	});

	it('5. Move the spotlight back to the first button, and verify that the focus moves after the click action. (spotlightDisappear)', () => {
		Page.spotlightLeft();
		Page.spotlightSelect();
		expect(firstToggleButton.item.hasFocus()).to.be.true();
	});
});

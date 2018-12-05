const Page = require('./ToggleItemPage');

describe('ToggleItem', () => {

	before(() => {
		Page.open();
	});

	const {firstToggleItem, secondToggleItem} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(firstToggleItem.item.hasFocus()).to.be.true();
	});

	it('2. Move spotlight to the second item. Verify it has focus when disabled after click.', () => {
		Page.spotlightDown();
		expect(secondToggleItem.item.hasFocus()).to.be.true();
	});

	it('3. Veirfy the second item has focus when click the button.', () => {
		Page.spotlightSelect();
		expect(secondToggleItem.item.hasFocus()).to.be.true();
	});
});

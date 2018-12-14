const Page = require('./LabeledItemPage');

describe('LabeledItem', () => {

	before(() => {
		Page.open();
	});

	const {firstLabeledItem, secondLabeledItem} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(firstLabeledItem.item.hasFocus()).to.be.true();
	});

	it('2. Move spotlight to the second item. Verify it has focus when disabled after click.', () => {
		Page.spotlightDown();
		expect(secondLabeledItem.item.hasFocus()).to.be.true();
	});

	it('3. Veirfy the second item has focus when click the button.', () => {
		Page.spotlightSelect();
		expect(secondLabeledItem.item.hasFocus()).to.be.true();
	});
});

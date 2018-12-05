const Page = require('./CheckboxItemPage');

describe('CheckboxItem', () => {

	before(() => {
		Page.open();
	});

	const {firstCheckboxItem, secondCheckboxItem} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(firstCheckboxItem.item.hasFocus()).to.be.true();
	});

	it('2. Click the first item. And verify the first button has focus.', () => {
		Page.spotlightSelect();
		expect(firstCheckboxItem.item.hasFocus()).to.be.true();
	});

	it('3. Move spotlight to the second item and click.', () => {
		Page.spotlightDown();
		expect(secondCheckboxItem.item.hasFocus()).to.be.true();
	});

	it('4. Verify that has focus after disabled.', () => {
		Page.spotlightSelect();
		expect(secondCheckboxItem.item.hasFocus()).to.be.true();
	});
});

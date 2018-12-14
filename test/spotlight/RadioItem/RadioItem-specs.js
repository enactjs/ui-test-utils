const Page = require('./RadioItemPage');

describe('RadioItem', () => {

	before(() => {
		Page.open();
	});

	const {firstRadioItem, secondRadioItem} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(firstRadioItem.item.hasFocus()).to.be.true();
	});

	it('2. Move spotlight to the second item. Verify it has focus when disabled after click.', () => {
		Page.spotlightDown();
		expect(secondRadioItem.item.hasFocus()).to.be.true();
	});

	it('3. Veirfy the second item has focus when click the button.', () => {
		Page.spotlightSelect();
		expect(secondRadioItem.item.hasFocus()).to.be.true();
	});
});

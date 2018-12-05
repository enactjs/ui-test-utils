const Page = require('./ItemPage');

describe('Item', () => {

	before(() => {
		Page.open();
	});

	const {firstItem, secondItem} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(firstItem.item.hasFocus()).to.be.true();
	});

	it('2. Move spotlight to the second item. Verify it has focus when disabled after click.', () => {
		Page.spotlightDown();
		expect(secondItem.item.hasFocus()).to.be.true();
	});

	it('3. Veirfy the second item has focus when click the button.', () => {
		Page.spotlightSelect();
		expect(secondItem.item.hasFocus()).to.be.true();
	});

	it('4. remote home (window blur & focus).', () => {
		Page.windowSpotlightBlur();
		Page.delay();
		Page.windowSpotlightFocus();
		Page.delay();
		expect(firstItem.item.hasFocus()).to.be.true();
	});
});

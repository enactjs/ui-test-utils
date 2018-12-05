const Page = require('./SwitchItemPage');

describe('SwitchItem', () => {

	before(() => {
		Page.open();
	});

	const {firstSwitchItem, secondSwitchItem} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(firstSwitchItem.item.hasFocus()).to.be.true();
	});

	it('2. Move spotlight to the second item. Verify it has focus when disabled after click.', () => {
		Page.spotlightDown();
		expect(secondSwitchItem.item.hasFocus()).to.be.true();
	});

	it('3. Veirfy the second item has focus when click the button.', () => {
		Page.spotlightSelect();
		expect(secondSwitchItem.item.hasFocus()).to.be.true();
	});
});

const Page = require('./SpotlightRestrictPage');

describe('SpotlightRestrict', () => {

	before(() => {
		Page.open();
	});

	const {itemThree, itemB} = Page.components;

	it('1. Hover on "3" in the left container.', () => {
		browser.moveToObject('#three');
		Page.delay();
		expect(itemThree.item.hasFocus()).to.be.true();
	});

	it('2. Verify "3" has focus even if trying to move spotlight to out of the conatiner.', () => {
		Page.spotlightRight();
		Page.spotlightRight();
		Page.spotlightRight();

		expect(itemThree.item.hasFocus()).to.be.true();
	});

	it('3. Hover on "B" in the right container.', () => {
		browser.moveToObject('#B');
		Page.delay();
		expect(itemB.item.hasFocus()).to.be.true();
	});

	it('4. Verify "3" has focus when spotlight move to out of the conatiner by pressing Left key.', () => {
		Page.spotlightLeft();
		expect(itemThree.item.hasFocus()).to.be.true();
	});
});

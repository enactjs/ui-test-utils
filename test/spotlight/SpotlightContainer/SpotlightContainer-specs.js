const Page = require('./SpotlightContainerPage');

describe('SpotlightContainer', () => {

	before(() => {
		Page.open();
	});

	const {itemB, itemC} = Page.components;

	it('1.Hover on "B".', () => {
		browser.moveToObject('#B');
		expect(itemB.item.hasFocus()).to.be.true();
	});

	it('2. Move cursor to out of the Conatiner, wait for until cursor disappear. And then, verify spotlight. (lastConatiner, last-focused)', () => {
		browser.moveToObject('#root', 1200, 540);
		Page.delay();
		Page.hidePointerByKeycode();
		expect(itemB.item.hasFocus()).to.be.true();
	});

	it('3. Move cursor to out of the Conatiner, press the left key(5-way). And then, verify spotlight. (lastConatiner, last-focused)', () => {
		Page.showPointerByKeycode();
		browser.moveToObject('#root', 950, 800);
		Page.delay();
		Page.spotlightLeft();

		expect(itemC.item.hasFocus()).to.be.true();
	});
});

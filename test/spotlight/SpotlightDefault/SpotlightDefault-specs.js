const Page = require('./SpotlightDefaultPage');

describe('SpotlightDefault', () => {

	before(() => {
		Page.open();
	});

	const {item4, item7} = Page.components;

	it('1. Veirfy Item4 has focus. (defaultSpotlight)', () => {
		Page.delay(7000);

		expect(item4.item.hasFocus()).to.be.true();
	});

	it('2. Click any item to move the next panel. And verify the default item has focus in the next panel.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();

		expect(item7.item.hasFocus()).to.be.true();
	});

	it('3. Press the Back key to back to the previous panel. And verify spotlight.', () => {
		Page.backKey();
		Page.waitTransitionEnd();

		expect(item4.item.hasFocus()).to.be.true();
	});
});

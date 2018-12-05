const Page = require('./IncrementSliderPage');

describe('IncrementSlider', () => {

	before(() => {
		Page.open();
	});

	const {firstIncrementSlider, secondIncrementSlider} = Page.components;

	it('1. Verify Slider knob has focus.', () => {
		expect(firstIncrementSlider.item.hasFocus()).to.be.true();
	});

	it('3. Verify Increase button has focus by pressing the RIGHT key.', () => {
		Page.spotlightRight();
		expect(firstIncrementSlider.incrementer.hasFocus()).to.be.true();
	});

	it('4. Verify spotlight retains on the next arrow button when value is the last value.', () => {
		for (let i = 0; i < 4; i++) {
			Page.spotlightSelect();

		}
		expect(firstIncrementSlider.incrementer.hasFocus()).to.be.true();
	});

	it('5. Move spotlight to the second slider', () => {
		Page.spotlightLeft();
		Page.spotlightDown();
		expect(secondIncrementSlider.item.hasFocus()).to.be.true();
	});

	it('6. Verify spotlight on navigation.', () => {
		Page.spotlightSelect();
		Page.spotlightLeft();
		Page.spotlightLeft();
		Page.spotlightSelect();
		Page.spotlightRight();
		Page.spotlightRight();
		Page.spotlightSelect();
		Page.spotlightLeft();
		expect(secondIncrementSlider.item.hasFocus()).to.be.true();
	});
});

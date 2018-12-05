const Page = require('./SliderPage');

describe('Slider', () => {

	before(() => {
		Page.open();
	});

	const {slider} = Page.components;

	it('1. Verify Slider knob has focus.', () => {
		expect(slider.item.hasFocus()).to.be.true();
	});

	it('3. Verify knob has focus when knob selected.', () => {
		Page.spotlightSelect();
		expect(slider.item.hasFocus()).to.be.true();
	});

	it('4. Verify spotlight retains on the knob after changing the value.', () => {
		for (let i = 0; i < 3; i++) {
			Page.spotlightRight();
		}
		expect(slider.item.hasFocus()).to.be.true();
	});
});

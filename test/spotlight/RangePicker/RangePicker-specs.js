const Page = require('./RangePickerPage');

describe('RangePicker', () => {

	before(() => {
		Page.open();
	});

	const {picker} = Page.components;

	it('1. Verify Increase button of the first defaultPicker has focus.', () => {
		expect(picker.incrementer.hasFocus()).to.be.true();
	});

	it('2. Verify next arrowIcon has focus when value is changed to the last value.', () => {
		for (let i = 0; i < 4; i++) {
			Page.spotlightSelect();
			Page.delay();
		}
		expect(picker.incrementer.hasFocus()).to.be.true();
	});

	it('3. Move spotlight to Joined Picker and verify it has focus.', () => {
		Page.spotlightDown();
		expect(picker.joined.hasFocus()).to.be.true();
	});

	it('4. After changing the value, verify it has focus.', () => {
		for (let i = 0; i < 4; i++) {
			Page.spotlightRight();
		}

		expect(picker.joined.hasFocus()).to.be.true();
	});

	it('5. Move spotlight to default Picker again and verify decrementer has focus.', () => {
		Page.spotlightUp();
		expect(picker.decrementer.hasFocus()).to.be.true();
	});
});

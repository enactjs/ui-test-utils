const Page = require('./PickerPage');

describe('Picker', () => {

	before(() => {
		Page.open();
	});

	const {picker} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(picker.incrementer.hasFocus()).to.be.true();
	});

	it('2. Verify next arrowIcon has focus when value is changed to the last value.', () => {
		Page.spotlightSelect();
		Page.delay();
		Page.spotlightSelect();
		Page.delay();

		expect(picker.incrementer.hasFocus()).to.be.true();
	});

	it('3. Move spotlight to Joined Picker and verify it has focus.', () => {
		Page.spotlightDown();

		expect(picker.joined.hasFocus()).to.be.true();
	});

	it('4. After changing the value, verify it has focus.', () => {
		Page.spotlightRight();
		Page.delay();
		Page.spotlightRight();
		Page.delay();

		expect(picker.joined.hasFocus()).to.be.true();
	});

	it('5. Move spotlight to default Picker again and verify decrementer has focus.', () => {
		Page.spotlightUp();

		expect(picker.decrementer.hasFocus()).to.be.true();
	});
});

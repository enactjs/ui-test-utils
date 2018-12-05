const Page = require('./DayPickerPage');

describe('DayPicker', () => {

	before(() => {
		Page.open();
	});

	const {dayPicker} = Page.components;

	it('1. Verify DayPicker has focus by default.', () => {
		expect(dayPicker.body.hasFocus()).to.be.true();
	});

	it('2. When Picker opens, verify the first day has focus.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(dayPicker.firstDayItem.hasFocus()).to.be.true();
	});

	it('3. When select day and close picker, verify Picker body has focus.', () => {
		Page.spotlightSelect();
		Page.spotlightUp();
		Page.waitTransitionEnd();
		expect(dayPicker.body.hasFocus()).to.be.true();
	});
});

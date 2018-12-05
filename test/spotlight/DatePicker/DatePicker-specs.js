const Page = require('./DatePickerPage');

describe('DatePicker', () => {

	before(() => {
		Page.open();
	});

	const {datePicker} = Page.components;

	it('1. Verify DatePicker has focus.', () => {
		expect(datePicker.body.hasFocus()).to.be.true();
	});

	it('2.  When Picker opens, verify Day  RangePicker has focus.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(datePicker.ymd.hasFocus()).to.be.true();
	});

	it('3. When Picker is closed, verify DatePicker has focus.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(datePicker.body.hasFocus()).to.be.true();
	});
});

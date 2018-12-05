const Page = require('./TimePickerPage');

describe('TimePicker', () => {

	before(() => {
		Page.open();
	});

	const {timePicker} = Page.components;

	it('1. Verify TimePicker has focus.', () => {
		expect(timePicker.body.hasFocus()).to.be.true();
	});

	it('2. Verify meridium picker has focus when Picker is opened.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(timePicker.hmm.hasFocus()).to.be.true();
	});

	it('3. When select day and close picker, verify Picker body has focus.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(timePicker.body.hasFocus()).to.be.true();
	});
});

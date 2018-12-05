const Page = require('./ExpandablePickerPage');

describe('ExpandablePicker', () => {

	before(() => {
		Page.open();
	});

	const {expandablePicker} = Page.components;

	it('1. Verify the first default item has focus.', () => {
		expect(expandablePicker.body.hasFocus()).to.be.true();
	});

	it('2. Verify next arrow button has focus when default ExpandableItem is opened.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(expandablePicker.incrementer.hasFocus()).to.be.true();
	});

	it('3. Verify next arrow button has focus when pressed OK key twice.', () => {
		Page.spotlightSelect();
		Page.delay();
		Page.spotlightSelect();
		Page.delay();
		expect(expandablePicker.incrementer.hasFocus()).to.be.true();
	});

	it('4. Verify check iconButton has focus by pressing the RIGHT key.', () => {
		Page.spotlightRight();
		Page.delay();
		expect(expandablePicker.checkButton.hasFocus()).to.be.true();
	});

	it('5. Verify spotlight when Picker is closed.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(expandablePicker.body.hasFocus()).to.be.true();
	});
});

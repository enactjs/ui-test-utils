let Page = require('./DatePickerPage');

describe('DatePicker', function () {

	it('should have focus on start', function () {
		Page.open();
		expect(Page.picker.title.hasFocus()).to.be.true();
	});

	it('should have correct title', function () {
		Page.open();
		expect(Page.picker.titleText).to.equal('Date Picker');
	});

	it('should have nothing selected by default', function () {
		Page.open();
		expect(Page.picker.valueText).to.equal('Nothing Selected');
	});

	// it('should focus input element on enter', function () {
	// 	Page.open();
	// 	Page.spotlightSelect();
	// 	expect(Page.input1.element('input').hasFocus()).to.be.true();
	// });
	//
	// it('should focus input 2 on 5-way right', function () {
	// 	Page.open();
	// 	Page.spotlightRight();
	// 	expect(Page.input2.hasFocus()).to.be.true();
	// });

});

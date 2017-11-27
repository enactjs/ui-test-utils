let Page = require('./DatePickerPage');

describe('DatePicker', function () {

	// it('should have focus on first picker at start', function () {
	// 	Page.open();
	// 	expect(Page.picker1.hasFocus()).to.be.true();
	// });

	it('should have nothing selected by default', function () {
		Page.open();
		console.log('ERG', Page.picker1.value);
		expect(Page.picker1.valueOf() === 'Nothing selected');
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

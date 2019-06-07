let Page = require('./Input5WayPage');

describe('Input', function () {

	it('should have focus on first input at start', function () {
		Page.open();
		expect(Page.input1.hasFocus()).to.be.true();
	});

	it('should focus input element on enter', function () {
		Page.open();
		Page.spotlightSelect();
		expect(Page.input1.element('input').hasFocus()).to.be.true();
	});

	it('should focus input 2 on 5-way right', function () {
		Page.open();
		Page.spotlightRight();
		expect(Page.input2.hasFocus()).to.be.true();
	});

	it('should have text-align equal to "right" when in ar-SA locale', function () {
		Page.open('?locale=ar-SA');
		expect(Page.inputElement1.getCssProperty('text-align').value).to.equal('right');
	});

	describe('disabled', function () {
		it('should be spottable', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightDown();
			expect(Page.disabledInput.hasFocus()).to.be.true();
		});
	});
});

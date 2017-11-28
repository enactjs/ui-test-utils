let Page = require('./DatePickerPage');

describe('DatePicker', function () {
	it('should have focus on start', function () {
		Page.open();
		expect(Page.datePicker.title.hasFocus()).to.be.true();
	});

	describe('no value', function () {
		it('should have correct title', function () {
			Page.open();
			expect(Page.datePicker.titleText).to.equal('Date Picker Default');
		});

		it('should have correct none text', function () {
			Page.open();
			expect(Page.datePicker.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			Page.open();
			expect(Page.datePicker.isOpen).to.be.false();
			expect(Page.datePicker.chevron).to.equal('󯿭');
			expect(Page.datePicker.item1.isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open, spot first item on select, and update value to current date', function () {
				Page.open();
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				const date = new Date(Page.datePicker.valueText);
				expect(Page.datePicker.isOpen).to.be.true();
				expect(Page.datePicker.chevron).to.equal('󯿮');
				expect(Page.datePicker.item1.isVisible()).to.be.true();
				expect(Page.datePicker.item1.hasFocus()).to.be.true();
				expect(!isNaN(date.getMonth())).to.be.true();
			});

			it('should close when pressing select', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.datePicker.isOpen).to.be.true();
				expect(Page.datePicker.chevron).to.equal('󯿮');
				expect(Page.datePicker.item1.isVisible()).to.be.true();
				expect(Page.datePicker.item1.hasFocus()).to.be.true();
				Page.spotlightSelect();
				expect(Page.datePicker.isOpen).to.be.false();
			});

			it('should update value text when incrementing/decrementing the range picker', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				const value = Page.datePicker.valueText;
				expect(Page.datePicker.isOpen).to.be.true();
				Page.spotlightUp();
				browser.pause(250);
				expect(value !== Page.datePicker.valueText).to.be.true();
			});
		});
	});

});

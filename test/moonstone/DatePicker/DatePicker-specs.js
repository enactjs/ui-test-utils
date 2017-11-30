let Page = require('./DatePickerPage');

describe('DatePicker', function () {
	it('should have focus on start', function () {
		Page.open();
		expect(Page.datePicker1.title.hasFocus()).to.be.true();
	});

	describe('default', function () {
		it('should have correct title', function () {
			Page.open();
			expect(Page.datePicker1.titleText).to.equal('Date Picker Default');
		});

		it('should have correct none text', function () {
			Page.open();
			expect(Page.datePicker1.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			Page.open();
			expect(Page.datePicker1.isOpen).to.be.false();
			expect(Page.datePicker1.chevron).to.equal('󯿭');
			expect(Page.datePicker1.picker1.isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open, spot first item on select, and update value to current date', function () {
				Page.open();
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				const date = new Date(Page.datePicker1.valueText);
				expect(Page.datePicker1.isOpen).to.be.true();
				expect(Page.datePicker1.chevron).to.equal('󯿮');
				expect(Page.datePicker1.picker1.isVisible()).to.be.true();
				expect(Page.datePicker1.picker1.hasFocus()).to.be.true();
				expect(!isNaN(date.getMonth())).to.be.true();
			});

			it('should close when pressing select', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.datePicker1.isOpen).to.be.true();
				expect(Page.datePicker1.chevron).to.equal('󯿮');
				expect(Page.datePicker1.picker1.isVisible()).to.be.true();
				expect(Page.datePicker1.picker1.hasFocus()).to.be.true();
				Page.spotlightSelect();
				expect(Page.datePicker1.isOpen).to.be.false();
			});

			it('should focus title when 5-way right from last picker', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.datePicker1.isOpen).to.be.true();
				expect(Page.datePicker1.chevron).to.equal('󯿮');
				expect(Page.datePicker1.picker1.isVisible()).to.be.true();
				expect(Page.datePicker1.picker1.hasFocus()).to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.datePicker1.title.hasFocus()).to.be.true();
			});

			it('should update value text when incrementing/decrementing the range picker', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				const value = Page.datePicker1.valueText;
				expect(Page.datePicker1.isOpen).to.be.true();
				Page.spotlightUp();
				browser.pause(250);
				expect(value !== Page.datePicker1.valueText).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				Page.open();
				Page.datePicker1.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(Page.datePicker1.isOpen).to.be.true();
				expect(Page.datePicker1.chevron).to.equal('󯿮');
				expect(Page.datePicker1.picker1.isVisible()).to.be.true();
			});

			it('should close on title click when open', function () {
				Page.open();
				Page.datePicker1.title.click();
				browser.pause(250);
				expect(Page.datePicker1.isOpen).to.be.true();
				Page.datePicker1.title.click();
				browser.pause(250);
				expect(Page.datePicker1.isOpen).to.be.false();
			});

			it('should select item', function () {
				Page.open();
				Page.datePicker1.title.click();
				browser.pause(250);
				Page.datePicker1.picker1.click();
				expect(Page.datePicker1.picker1.hasFocus()).to.be.true();
			});

			it('should update value text when incrementing/decrementing the range picker', function () {
				Page.open();
				Page.datePicker1.title.click();
				browser.pause(250);
				const value = Page.datePicker1.valueText;
				expect(Page.datePicker1.isOpen).to.be.true();
				Page.datePicker1.decrementer.click();
				browser.pause(250);
				expect(value !== Page.datePicker1.valueText).to.be.true();
			});
		});
	});

});

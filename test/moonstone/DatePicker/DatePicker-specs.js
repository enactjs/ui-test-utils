let Page = require('./DatePickerPage');

describe('DatePicker', function () {
	it('should have focus on start', function () {
		Page.open();
		expect(Page.components.datePicker1.title.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const datePicker = Page.components.datePicker1;

		it('should have correct title', function () {
			Page.open();
			expect(datePicker.titleText).to.equal('Date Picker Default');
		});

		it('should have correct none text', function () {
			Page.open();
			expect(datePicker.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			Page.open();
			expect(datePicker.isOpen).to.be.false();
			expect(datePicker.chevron).to.equal('󯿭');
			expect(datePicker.picker1.isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open, spot first item on select, and update value to current date', function () {
				Page.open();
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				const date = new Date(datePicker.valueText);
				expect(datePicker.isOpen).to.be.true();
				expect(datePicker.chevron).to.equal('󯿮');
				expect(datePicker.picker1.isVisible()).to.be.true();
				expect(datePicker.picker1.hasFocus()).to.be.true();
				expect(!isNaN(date.getMonth())).to.be.true();
			});

			it('should close when pressing select', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(datePicker.isOpen).to.be.true();
				expect(datePicker.chevron).to.equal('󯿮');
				expect(datePicker.picker1.isVisible()).to.be.true();
				expect(datePicker.picker1.hasFocus()).to.be.true();
				Page.spotlightSelect();
				expect(datePicker.isOpen).to.be.false();
			});

			it('should focus title when 5-way right from last picker', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(datePicker.isOpen).to.be.true();
				expect(datePicker.chevron).to.equal('󯿮');
				expect(datePicker.picker1.isVisible()).to.be.true();
				expect(datePicker.picker1.hasFocus()).to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(datePicker.title.hasFocus()).to.be.true();
			});

			it('should update value text when incrementing/decrementing the range picker', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				const value = datePicker.valueText;
				expect(datePicker.isOpen).to.be.true();
				Page.spotlightUp();
				browser.pause(250);
				expect(value !== datePicker.valueText).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				Page.open();
				datePicker.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(datePicker.isOpen).to.be.true();
				expect(datePicker.chevron).to.equal('󯿮');
				expect(datePicker.picker1.isVisible()).to.be.true();
			});

			it('should close on title click when open', function () {
				Page.open();
				datePicker.title.click();
				browser.pause(250);
				expect(datePicker.isOpen).to.be.true();
				datePicker.title.click();
				browser.pause(250);
				expect(datePicker.isOpen).to.be.false();
			});

			it('should select item', function () {
				Page.open();
				datePicker.title.click();
				browser.pause(250);
				datePicker.picker1.click();
				expect(datePicker.picker1.hasFocus()).to.be.true();
			});

			it('should update value text when incrementing/decrementing the range picker', function () {
				Page.open();
				datePicker.title.click();
				browser.pause(250);
				const value = datePicker.valueText;
				expect(datePicker.isOpen).to.be.true();
				datePicker.decrementer.click();
				browser.pause(250);
				expect(value !== datePicker.valueText).to.be.true();
			});
		});
	});

	describe('default open', function () {
		const datePicker = Page.components.datePicker2;

		it('should be initially open', function () {
			Page.open();
			expect(datePicker.isOpen).to.be.true();
			expect(datePicker.chevron).to.equal('󯿮');
			expect(datePicker.picker1.isVisible()).to.be.true();
		});

		describe('5-way', function () {
			it('should close when pressing select', function () {
				Page.open();
				datePicker.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expect(datePicker.isOpen).to.be.false();
				expect(datePicker.chevron).to.equal('󯿭');
				expect(datePicker.picker1.isVisible()).to.be.false();
				expect(datePicker.title.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click when open', function () {
				Page.open();
				datePicker.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(datePicker.isOpen).to.be.false();
				expect(datePicker.chevron).to.equal('󯿭');
				expect(datePicker.picker1.isVisible()).to.be.false();
			});

			it('should open on title click when closed', function () {
				Page.open();
				datePicker.title.click();
				browser.pause(250);
				expect(datePicker.isOpen).to.be.false();
				datePicker.title.click();
				browser.pause(250);
				expect(datePicker.isOpen).to.be.true();
			});
		});
	});

});

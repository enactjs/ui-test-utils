const Page = require('./DatePickerPage');
const {validateTitle, expectClosed, expectOpen} = require('./DatePicker-utils.js');

describe('DatePicker', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should have focus on start', function () {
		expect(Page.components.datePickerDefaultClosedWithoutNoneText.title.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const datePicker = Page.components.datePickerDefaultClosedWithoutNoneText;

		it('should have correct title', function () {
			validateTitle(datePicker, 'Date Picker Default');
		});

		it('should be initially closed', function () {
			expectClosed(datePicker);
		});

		describe('5-way', function () {
			it('should open, spot first item on select, and update value to current date', function () {
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				const date = new Date(datePicker.valueText);
				expectOpen(datePicker);
				expect(datePicker.month.hasFocus()).to.be.true();
				expect(!isNaN(date.getMonth())).to.be.true();
			});

			it('should close when pressing select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(datePicker);
				expect(datePicker.month.hasFocus()).to.be.true();
				Page.spotlightSelect();
				expectClosed(datePicker);
			});

			it('should focus title when 5-way right from last picker', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(datePicker);
				expect(datePicker.month.hasFocus()).to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(datePicker.title.hasFocus()).to.be.true();
			});

			it('should update value text when incrementing/decrementing the range picker', function () {
				Page.spotlightSelect();
				browser.pause(250);
				const value = parseInt(datePicker.item(datePicker.year).getText());
				expectOpen(datePicker);
				while (!datePicker.year.hasFocus()) {
					Page.spotlightRight();
				}
				// increment
				Page.spotlightUp();
				browser.pause(250);
				expect(value + 1 === parseInt(datePicker.item(datePicker.year).getText())).to.be.true();
				// decrement
				Page.spotlightDown();
				browser.pause(250);
				expect(value === parseInt(datePicker.item(datePicker.year).getText())).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				datePicker.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectOpen(datePicker);
			});

			it('should close on title click when open', function () {
				datePicker.title.click();
				browser.pause(250);
				expectOpen(datePicker);
				datePicker.title.click();
				browser.pause(250);
				expectClosed(datePicker);
			});

			it('should select item', function () {
				datePicker.title.click();
				browser.pause(250);
				datePicker.month.click();
				expect(datePicker.month.hasFocus()).to.be.true();
			});

			it('should update value text when incrementing/decrementing the range picker', function () {
				datePicker.title.click();
				browser.pause(250);
				const value = parseInt(datePicker.item(datePicker.year).getText());
				expectOpen(datePicker);
				// increment
				datePicker.incrementer(datePicker.year).click();
				browser.pause(250);
				expect(value + 1 === parseInt(datePicker.item(datePicker.year).getText())).to.be.true();
				// decrement
				datePicker.decrementer(datePicker.year).click();
				browser.pause(250);
				expect(value === parseInt(datePicker.item(datePicker.year).getText())).to.be.true();
			});
		});
	});

	describe('default with noneText', function () {
		const datePicker = Page.components.datePickerDefaultClosedWithNoneText;

		it('should have correct none text', function () {
			expect(datePicker.valueText).to.equal('Nothing Selected');
		});
	});

	describe('default open', function () {
		const datePicker = Page.components.datePickerDefaultOpenWithNoneText;

		it('should be initially open', function () {
			expectOpen(datePicker);
		});

		describe('5-way', function () {
			it('should close when pressing select', function () {
				datePicker.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(datePicker);
				expect(datePicker.title.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click when open', function () {
				datePicker.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectClosed(datePicker);
			});

			it('should open on title click when closed', function () {
				datePicker.title.click();
				browser.pause(250);
				expectClosed(datePicker);
				datePicker.title.click();
				browser.pause(250);
				expectOpen(datePicker);
			});
		});
	});

	describe('no labels', function () {
		const datePicker = Page.components.datePickerNoLabels;

		it('should not have labeled pickers', function () {
			datePicker.title.click();
			expect(datePicker.monthLabel.value === null).to.be.true();
		});
	});

	describe('disabled', function () {
		const datePicker = Page.components.datePickerDisabledWithNoneText;

		it('should be initially closed', function () {
			expectClosed(datePicker);
		});

		it('should have correct none text', function () {
			expect(datePicker.valueText).to.equal('Nothing Selected');
		});

		describe('5-way', function() {
			it('should not receive focus', function () {
				Page.components.datePickerDefaultOpenWithNoneText.focus();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(datePicker.title.hasFocus()).to.be.false();
			});
		});

		describe('pointer', function () {
			it('should not open when clicked', function () {
				datePicker.title.click();
				expectClosed(datePicker);
			});
		});
	});

	describe('default disabled open', function () {
		const datePicker = Page.components.datePickerDisabledOpenWithNoneText;

		it('should be initially closed', function () {
			expectClosed(datePicker);
		});

		it('should have the current date value', function () {
			const date = new Date(datePicker.valueText);
			expect(!isNaN(date.getMonth())).to.be.true();
		});
	});

});

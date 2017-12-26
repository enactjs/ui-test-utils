const Page = require('./DatePickerPage');
const {daysInMonth, expectClosed, expectOpen, extractValues, validateTitle} = require('./DatePicker-utils.js');

describe('DatePicker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open('?locale=en-US');
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

				it('should update month when incrementing/decrementing the picker', function () {
					Page.spotlightSelect();
					browser.pause(250);
					const month = parseInt(datePicker.item(datePicker.month).getText());
					let value;
					expectOpen(datePicker);
					while (!datePicker.month.hasFocus()) {
						Page.spotlightRight();
					}
					// increment
					Page.spotlightUp();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.month).getText());
					if (month < 12) {
						expect(value).to.equal(month + 1);
					} else {
						expect(value).to.equal(1);
					}
					// decrement
					Page.spotlightDown();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.month).getText());
					expect(value).to.equal(month);
				});

				it('should update day when incrementing/decrementing the picker', function () {
					Page.spotlightSelect();
					browser.pause(250);
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					let value;
					expectOpen(datePicker);
					while (!datePicker.day.hasFocus()) {
						Page.spotlightRight();
					}
					// increment
					Page.spotlightUp();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.day).getText());
					if (day === numDays) {
						expect(value).to.equal(1);
					} else {
						expect(value).to.equal(day + 1);
					}
					// decrement
					Page.spotlightDown();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.day).getText());
					expect(value).to.equal(day);
				});

				it('should update year when incrementing/decrementing the picker', function () {
					Page.spotlightSelect();
					browser.pause(250);
					const year = parseInt(datePicker.item(datePicker.year).getText());
					let value;
					expectOpen(datePicker);
					while (!datePicker.year.hasFocus()) {
						Page.spotlightRight();
					}
					// increment
					Page.spotlightUp();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.year).getText());
					expect(value).to.equal(year + 1);
					// decrement
					Page.spotlightDown();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.year).getText());
					expect(value).to.equal(year);
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

				it('should update month when incrementing/decrementing the picker', function () {
					datePicker.title.click();
					browser.pause(250);
					const month = parseInt(datePicker.item(datePicker.month).getText());
					let value;
					expectOpen(datePicker);
					// increment
					datePicker.incrementer(datePicker.month).click();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.month).getText());
					if (month < 12) {
						expect(value).to.equal(month + 1);
					} else {
						expect(value).to.equal(1);
					}
					// decrement
					datePicker.decrementer(datePicker.month).click();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.month).getText());
					expect(value).to.be.equal(month);
				});

				it('should update day when incrementing/decrementing the picker', function () {
					datePicker.title.click();
					browser.pause(250);
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					let value;
					expectOpen(datePicker);
					// increment
					datePicker.incrementer(datePicker.day).click();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.day).getText());
					if (day === numDays) {
						expect(value).to.equal(1);
					} else {
						expect(value).to.equal(day + 1);
					}
					// decrement
					datePicker.decrementer(datePicker.day).click();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.day).getText());
					expect(value).to.equal(day);
				});

				it('should update year when incrementing/decrementing the picker', function () {
					datePicker.title.click();
					browser.pause(250);
					const year = parseInt(datePicker.item(datePicker.year).getText());
					let value;
					expectOpen(datePicker);
					// increment
					datePicker.incrementer(datePicker.year).click();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.year).getText());
					expect(value).to.be.equal(year + 1);
					// decrement
					datePicker.decrementer(datePicker.year).click();
					browser.pause(250);
					value = parseInt(datePicker.item(datePicker.year).getText());
					expect(value).to.be.equal(year);
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

		describe('with supplied value', function () {
			// supplied value is `new Date(2009, 5, 6)`
			const datePicker = Page.components.datePickerWithValue;

			describe('5-way', function () {
				it('should not update on select', function () {
					datePicker.focus();
					Page.spotlightSelect();
					browser.pause(250);
					const {day, month, year} = extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

			describe('pointer', function () {
				it('should not update on title click', function () {
					datePicker.title.click();
					browser.pause(250);
					const {day, month, year} = extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

		});

		describe('no labels', function () {
			const datePicker = Page.components.datePickerNoLabels;

			it('should not have labeled pickers', function () {
				datePicker.title.click();
				expect(datePicker.monthLabel.value).to.be.null();
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
					Page.components.datePickerNoLabels.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					Page.spotlightDown();
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

	describe('RTL locale', function () {
		const datePicker = Page.components.datePickerDefaultClosedWithoutNoneText;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should focus rightmost picker (day) when selected', function () {
			Page.spotlightSelect();
			browser.pause(250);
			expectOpen(datePicker);
			expect(datePicker.day.hasFocus()).to.be.true();
		});

		it('should have day-month-year order (RTL)', function () {
			Page.spotlightSelect();
			browser.pause(250);
			expectOpen(datePicker);
			expect(datePicker.day.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.month.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.year.hasFocus()).to.be.true();
		});

		it('should focus title when 5-way left from last picker', function () {
			Page.spotlightSelect();
			browser.pause(250);
			expectOpen(datePicker);
			expect(datePicker.day.hasFocus()).to.be.true();
			Page.spotlightLeft();
			Page.spotlightLeft();
			Page.spotlightLeft();
			expect(datePicker.title.hasFocus()).to.be.true();
		});
	});

});

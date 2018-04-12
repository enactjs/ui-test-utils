const Page = require('./DatePickerPage');
const {daysInMonth, expectClosed, expectNoLabels, expectOpen, extractValues, validateTitle} = require('./DatePicker-utils.js');

describe('DatePicker', function () {
	Page.open();

	it('should have focus on start', function () {
		expect(Page.components.datePickerDefaultClosedWithoutNoneText.title.hasFocus()).to.be.true();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const datePicker = Page.components.datePickerDefaultClosedWithoutNoneText;

			it('should have correct title', function () {
				validateTitle(datePicker, 'Date Picker Default');
			});

			it('should be initially closed', function () {
				expectClosed(datePicker);
			});

			it('should have month-day-year order', function () {
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expectOpen(datePicker);
				expect(datePicker.month.hasFocus()).to.be.true();
				Page.spotlightRight();
				expect(datePicker.day.hasFocus()).to.be.true();
				Page.spotlightRight();
				expect(datePicker.year.hasFocus()).to.be.true();
			});

			describe('5-way', function () {
				it('should open, spot first item on select, and update value to current date', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const month = new Date(datePicker.valueText).getMonth();
					expectOpen(datePicker);
					expect(datePicker.month.hasFocus()).to.be.true();
					expect(month).to.be.within(0, 11);
				});

				it('should close when pressing select', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					expectOpen(datePicker);
					expect(datePicker.month.hasFocus()).to.be.true();
					Page.spotlightSelect();
					expectClosed(datePicker);
				});

				// ENYO-5151
				it.skip('should focus title when 5-way right from last picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					expectOpen(datePicker);
					expect(datePicker.month.hasFocus()).to.be.true();
					Page.spotlightRight();
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.title.hasFocus()).to.be.true();
				});

				it('should increase the month when incrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {month} = extractValues(datePicker);
					expectOpen(datePicker);
					expect(datePicker.month.hasFocus()).to.be.true();
					Page.spotlightUp();
					Page.waitTransitionEnd();
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {month} = extractValues(datePicker);
					expectOpen(datePicker);
					expect(datePicker.month.hasFocus()).to.be.true();
					Page.spotlightDown();
					Page.waitTransitionEnd();
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					expectOpen(datePicker);
					Page.spotlightRight();
					expect(datePicker.day.hasFocus()).to.be.true();
					Page.spotlightUp();
					Page.waitTransitionEnd();
					const {day: value} = extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					expectOpen(datePicker);
					Page.spotlightRight();
					expect(datePicker.day.hasFocus()).to.be.true();
					Page.spotlightDown();
					Page.waitTransitionEnd();
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {year} = extractValues(datePicker);
					expectOpen(datePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.year.hasFocus()).to.be.true();
					Page.spotlightUp();
					Page.waitTransitionEnd();
					const {year: value} = extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {year} = extractValues(datePicker);
					expectOpen(datePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(datePicker.year.hasFocus()).to.be.true();
					Page.spotlightDown();
					Page.waitTransitionEnd();
					const {year: value} = extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
				});
			});

			describe('pointer', function () {
				it('should open on title click when closed', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					expectOpen(datePicker);
				});

				it('should close on title click when open', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					expectOpen(datePicker);
					datePicker.title.click();
					Page.waitTransitionEnd();
					expectClosed(datePicker);
				});

				it('should select item', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					datePicker.month.click();
					expect(datePicker.month.hasFocus()).to.be.true();
				});

				it('should increase the month when incrementing the picker', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					const {month} = extractValues(datePicker);
					expectOpen(datePicker);
					datePicker.incrementer(datePicker.month).click();
					Page.waitTransitionEnd();
					const {month: value} = extractValues(datePicker);
					const expected = month < 12 ? month + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the month when decrementing the picker', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					const {month} = extractValues(datePicker);
					expectOpen(datePicker);
					datePicker.decrementer(datePicker.month).click();
					Page.waitTransitionEnd();
					const {month: value} = extractValues(datePicker);
					const expected = month > 1 ? month - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the day when incrementing the picker', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					expectOpen(datePicker);
					datePicker.incrementer(datePicker.day).click();
					Page.waitTransitionEnd();
					const {day: value} = extractValues(datePicker);
					const expected = day !== numDays ? day + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the day when decrementing the picker', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					const {day, month, year} = extractValues(datePicker);
					const numDays = daysInMonth({month, year});
					expectOpen(datePicker);
					datePicker.decrementer(datePicker.day).click();
					Page.waitTransitionEnd();
					const {day: value} = extractValues(datePicker);
					const expected = day !== 1 ? day - 1 : numDays;
					expect(value).to.equal(expected);
				});

				it('should increase the year when incrementing the picker', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					const {year} = extractValues(datePicker);
					expectOpen(datePicker);
					datePicker.incrementer(datePicker.year).click();
					Page.waitTransitionEnd();
					const {year: value} = extractValues(datePicker);
					const expected = year + 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the year when decrementing the picker', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					const {year} = extractValues(datePicker);
					expectOpen(datePicker);
					datePicker.decrementer(datePicker.year).click();
					Page.waitTransitionEnd();
					const {year: value} = extractValues(datePicker);
					const expected = year - 1;
					expect(value).to.equal(expected);
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
					Page.waitTransitionEnd();
					expectClosed(datePicker);
					expect(datePicker.title.hasFocus()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click when open', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					expectClosed(datePicker);
				});

				it('should open on title click when closed', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
					expectClosed(datePicker);
					datePicker.title.click();
					Page.waitTransitionEnd();
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
					Page.waitTransitionEnd();
					const {day, month, year} = extractValues(datePicker);

					expect(day).to.equal(6);
					expect(month).to.equal(6); // `Date` uses 0-indexed months, picker displays 1-indexed month values
					expect(year).to.equal(2009);
				});
			});

			describe('pointer', function () {
				it('should not update on title click', function () {
					datePicker.title.click();
					Page.waitTransitionEnd();
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
				expectNoLabels(datePicker);
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
					Page.spotlightDown();
					expect(datePicker.title.hasFocus()).to.be.false();
				});
			});

			describe('pointer', function () {
				it('should not open when clicked', function () {
					datePicker.title.click();
					// it should never open, but wait and then check to be sure
					browser.pause(500);
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
				const month = new Date(datePicker.valueText).getMonth();
				expect(month).to.be.within(0, 11);
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
			Page.waitTransitionEnd();
			expectOpen(datePicker);
			expect(datePicker.day.hasFocus()).to.be.true();
		});

		it('should have day-month-year order', function () {
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expectOpen(datePicker);
			expect(datePicker.day.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.month.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(datePicker.year.hasFocus()).to.be.true();
		});

		// ENYO-5151
		it.skip('should focus title when 5-way left from last picker', function () {
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expectOpen(datePicker);
			expect(datePicker.day.hasFocus()).to.be.true();
			Page.spotlightLeft();
			Page.spotlightLeft();
			Page.spotlightLeft();
			expect(datePicker.title.hasFocus()).to.be.true();
		});
	});

});

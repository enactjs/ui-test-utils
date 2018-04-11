const Page = require('./TimePickerPage');
const {expectClosed, expectOpen, expectNoLabels, extractValues, validateTitle} = require('./TimePicker-utils.js');

describe('TimePicker', function () {
	Page.open();

	it('should have focus on start', function () {
		expect(Page.components.timePickerDefaultClosedWithoutNoneText.title.hasFocus()).to.be.true();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('default', function () {
			const timePicker = Page.components.timePickerDefaultClosedWithoutNoneText;

			it('should have correct title', function () {
				validateTitle(timePicker, 'Time Picker Default');
			});

			it('should be initially closed', function () {
				expectClosed(timePicker);
			});

			it('should have hour-minute-meridiem order', function () {
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expectOpen(timePicker);
				expect(timePicker.hour.hasFocus()).to.be.true();
				Page.spotlightRight();
				expect(timePicker.minute.hasFocus()).to.be.true();
				Page.spotlightRight();
				expect(timePicker.meridiem.hasFocus()).to.be.true();
			});

			describe('5-way', function () {
				it('should open, spot hour picker on select, and update value to current time', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					expectOpen(timePicker);
					const value = /^\d{1,2}:\d{2}\s[A|P]M$/.test(timePicker.valueText);
					expect(value).to.be.true();
				});

				it('should close when pressing select', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					expectOpen(timePicker);
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					expectClosed(timePicker);
				});

				// ENYO-5151
				it.skip('should focus title when 5-way right from last picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					expectOpen(timePicker);
					expect(timePicker.hour.hasFocus()).to.be.true();
					Page.spotlightRight();
					Page.spotlightRight();
					Page.spotlightRight();
					expect(timePicker.title.hasFocus()).to.be.true();
				});

				it('should increase the hour when incrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {hour} = extractValues(timePicker);
					expectOpen(timePicker);
					expect(timePicker.hour.hasFocus()).to.be.true();
					Page.spotlightUp();
					Page.waitTransitionEnd();
					const {hour: value} = extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {hour} = extractValues(timePicker);
					expectOpen(timePicker);
					expect(timePicker.hour.hasFocus()).to.be.true();
					Page.spotlightDown();
					Page.waitTransitionEnd();
					const {hour: value} = extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {minute} = extractValues(timePicker);
					expectOpen(timePicker);
					Page.spotlightRight();
					expect(timePicker.minute.hasFocus()).to.be.true();
					Page.spotlightUp();
					Page.waitTransitionEnd();
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {minute} = extractValues(timePicker);
					expectOpen(timePicker);
					Page.spotlightRight();
					expect(timePicker.minute.hasFocus()).to.be.true();
					Page.spotlightDown();
					Page.waitTransitionEnd();
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should update value text when incrementing the meridiem picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const time = timePicker.valueText;
					expectOpen(timePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(timePicker.meridiem.hasFocus()).to.be.true();
					Page.spotlightUp();
					Page.waitTransitionEnd();
					const newTime = timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should update value text when decrementing the meridiem picker', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const time = timePicker.valueText;
					expectOpen(timePicker);
					Page.spotlightRight();
					Page.spotlightRight();
					expect(timePicker.meridiem.hasFocus()).to.be.true();
					Page.spotlightDown();
					Page.waitTransitionEnd();
					const newTime = timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should change the meridiem on hour boundaries', function () {
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const value = timePicker.item(timePicker.meridiem).getText();
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						Page.spotlightDown();
					}
					expect(value !== timePicker.item(timePicker.meridiem).getText()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should open on title click when closed', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					expectOpen(timePicker);
				});

				it('should close on title click when open', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					expectOpen(timePicker);
					timePicker.title.click();
					Page.waitTransitionEnd();
					expectClosed(timePicker);
				});

				it('should select hour when opened', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					timePicker.hour.click();
					expect(timePicker.hour.hasFocus()).to.be.true();
				});

				it('should increase the hour when incrementing the picker', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					const {hour} = extractValues(timePicker);
					expectOpen(timePicker);
					timePicker.incrementer(timePicker.hour).click();
					Page.waitTransitionEnd();
					const {hour: value} = extractValues(timePicker);
					const expected = hour < 12 ? hour + 1 : 1;
					expect(value).to.equal(expected);
				});

				it('should decrease the hour when decrementing the picker', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					const {hour} = extractValues(timePicker);
					expectOpen(timePicker);
					timePicker.decrementer(timePicker.hour).click();
					Page.waitTransitionEnd();
					const {hour: value} = extractValues(timePicker);
					const expected = hour > 1 ? hour - 1 : 12;
					expect(value).to.equal(expected);
				});

				it('should increase the minute when incrementing the picker', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					const {minute} = extractValues(timePicker);
					expectOpen(timePicker);
					timePicker.incrementer(timePicker.minute).click();
					Page.waitTransitionEnd();
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 59 ? minute + 1 : 0;
					expect(value).to.equal(expected);
				});

				it('should decrease the minute when decrementing the picker', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					const {minute} = extractValues(timePicker);
					expectOpen(timePicker);
					timePicker.decrementer(timePicker.minute).click();
					Page.waitTransitionEnd();
					const {minute: value} = extractValues(timePicker);
					const expected = minute !== 0 ? minute - 1 : 59;
					expect(value).to.equal(expected);
				});

				it('should update value text when incrementing the meridiem picker', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					const time = timePicker.valueText;
					expectOpen(timePicker);
					timePicker.incrementer(timePicker.meridiem).click();
					Page.waitTransitionEnd();
					const newTime = timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should update value text when decrementing the meridiem picker', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					const time = timePicker.valueText;
					expectOpen(timePicker);
					timePicker.decrementer(timePicker.meridiem).click();
					Page.waitTransitionEnd();
					const newTime = timePicker.valueText;
					const value = time !== newTime;
					expect(value).to.equal(true);
				});

				it('should change the meridiem on hour boundaries', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					const value = timePicker.valueText;
					// 12 hours ought to change the value text if meridiem changes
					for (let i = 12; i; i -= 1) {
						timePicker.decrementer(timePicker.hour).click();
					}
					expect(value !== timePicker.valueText).to.be.true();
				});
			});
		});

		describe('default with noneText', function () {
			const timePicker = Page.components.timePickerDefaultClosedWithNoneText;

			it('should have correct none text', function () {
				expect(timePicker.valueText).to.equal('Nothing Selected');
			});
		});

		describe('default open', function () {
			const timePicker = Page.components.timePickerDefaultOpenWithNoneText;

			it('should be initially open', function () {
				expectOpen(timePicker);
			});

			describe('5-way', function () {
				it('should close when pressing select', function () {
					timePicker.focus();
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					expectClosed(timePicker);
					expect(timePicker.title.hasFocus()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click when open', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					expectClosed(timePicker);
				});

				it('should open on title click when closed', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					expectClosed(timePicker);
					timePicker.title.click();
					Page.waitTransitionEnd();
					expectOpen(timePicker);
				});
			});
		});

		describe('with supplied value', function () {
			// supplied value is `new Date(2009, 5, 6)` (time will be midnight)
			const timePicker = Page.components.timePickerWithValue;

			describe('5-way', function () {
				it('should not update on select', function () {
					timePicker.focus();
					Page.spotlightSelect();
					Page.waitTransitionEnd();
					const {hour, minute, meridiem} = extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});
			});

			describe('pointer', function () {
				it('should not update on title click', function () {
					timePicker.title.click();
					Page.waitTransitionEnd();
					const {hour, minute, meridiem} = extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});
			});

		});

		describe('no labels', function () {
			const timePicker = Page.components.timePickerNoLabels;

			it('should not have labeled pickers', function () {
				timePicker.title.click();
				expectNoLabels(timePicker);
			});
		});

		describe('disabled', function () {
			const timePicker = Page.components.timePickerDisabledWithNoneText;

			it('should be initially closed', function () {
				expectClosed(timePicker);
			});

			it('should have correct none text', function () {
				expect(timePicker.valueText).to.equal('Nothing Selected');
			});

			describe('5-way', function () {
				it('should not receive focus', function () {
					Page.components.timePickerNoLabels.focus();
					Page.spotlightDown();
					expect(timePicker.title.hasFocus()).to.be.false();
				});
			});

			describe('pointer', function () {
				it('should not open when clicked', function () {
					timePicker.title.click();
					// it should never open, but wait and then check to be sure
					browser.pause(500);
					expectClosed(timePicker);
				});
			});
		});

		describe('default disabled open', function () {
			const timePicker = Page.components.timePickerDisabledOpenWithNoneText;

			it('should be initially closed', function () {
				expectClosed(timePicker);
			});

			it('should have the current time value', function () {
				expect(timePicker.valueText !== 'Nothing Selected').to.be.true();
			});
		});
	});

	describe('RTL locale', function () {
		const timePicker = Page.components.timePickerDefaultClosedWithoutNoneText;

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should focus middle picker (hour) when selected', function () {
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expectOpen(timePicker);
			expect(timePicker.hour.hasFocus()).to.be.true();
		});

		it('should have minute-hour-meridiem order', function () {
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expectOpen(timePicker);
			Page.spotlightRight();
			expect(timePicker.minute.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(timePicker.hour.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(timePicker.meridiem.hasFocus()).to.be.true();
		});

		// ENYO-5151
		it.skip('should focus title when 5-way left from last picker', function () {
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expectOpen(timePicker);
			expect(timePicker.hour.hasFocus()).to.be.true();
			Page.spotlightLeft();
			Page.spotlightLeft();
			expect(timePicker.title.hasFocus()).to.be.true();
		});
	});

	describe('24-hour locale', function () {
		const timePicker = Page.components.timePickerWithValue;

		beforeEach(function () {
			Page.open('?locale=fr-FR');
		});

		it('should not have a meridiem picker', function () {
			timePicker.title.click();
			expect(timePicker.meridiem.value).to.be.null();
		});

		it('should display hours in 24-hour format', function () {
			timePicker.title.click();
			expect(extractValues(timePicker).hour).to.equal(0); // midnight hour
		});

		it('should increment hours from 23 to 0', function () {
			timePicker.title.click();
			Page.waitTransitionEnd();
			// go to 23 first
			timePicker.decrementer(timePicker.hour).click();
			expect(extractValues(timePicker).hour).to.equal(23);
			// now increment
			timePicker.incrementer(timePicker.hour).click();
			expect(extractValues(timePicker).hour).to.equal(0);
		});

		it('should decrement hours from 0 to 23', function () {
			timePicker.title.click();
			Page.waitTransitionEnd();
			timePicker.decrementer(timePicker.hour).click();
			expect(extractValues(timePicker).hour).to.equal(23);
		});
	});

});

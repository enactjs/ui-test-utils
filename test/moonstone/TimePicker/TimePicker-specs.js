const Page = require('./TimePickerPage');
const {expectClosed, expectOpen, extractValues, validateTitle} = require('./TimePicker-utils.js');

describe('TimePicker', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open('?locale=en-US');
		});

		it('should have focus on start', function () {
			expect(Page.components.timePickerDefaultClosedWithoutNoneText.title.hasFocus()).to.be.true();
		});

		describe('default', function () {
			const timePicker = Page.components.timePickerDefaultClosedWithoutNoneText;

			it('should have correct title', function () {
				validateTitle(timePicker, 'Time Picker Default');
			});

			it('should be initially closed', function () {
				expectClosed(timePicker);
			});

			describe('5-way', function () {
				it('should open, spot hour picker on select, and update value to current time', function () {
					Page.spotlightSelect();
					// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
					browser.pause(250);
					expectOpen(timePicker);
					expect(!!timePicker.valueText).to.be.true();
				});

				it('should close when pressing select', function () {
					Page.spotlightSelect();
					browser.pause(250);
					expectOpen(timePicker);
					Page.spotlightSelect();
					browser.pause(250);
					expectClosed(timePicker);
				});

				it('should focus title when 5-way right from last picker', function () {
					Page.spotlightSelect();
					browser.pause(250);
					expectOpen(timePicker);
					expect(timePicker.hour.hasFocus()).to.be.true();
					Page.spotlightRight();
					Page.spotlightRight();
					Page.spotlightRight();
					expect(timePicker.title.hasFocus()).to.be.true();
				});

				it('should update hour when incrementing/decrementing the picker', function () {
					Page.spotlightSelect();
					browser.pause(250);
					const hour = parseInt(timePicker.item(timePicker.hour).getText());
					let value;
					expectOpen(timePicker);
					while (!timePicker.hour.hasFocus()) {
						Page.spotlightRight();
					}
					// increment
					Page.spotlightUp();
					browser.pause(250);
					value = parseInt(timePicker.item(timePicker.hour).getText());
					if (hour === 12) {
						expect(value).to.equal(1);
					} else {
						expect(value).to.equal(hour + 1);
					}
					// decrement
					Page.spotlightDown();
					browser.pause(250);
					value = parseInt(timePicker.item(timePicker.hour).getText());
					expect(value).to.equal(hour);
				});

				it('should update minute when incrementing/decrementing the picker', function () {
					Page.spotlightSelect();
					browser.pause(250);
					const minute = parseInt(timePicker.item(timePicker.minute).getText());
					let value;
					expectOpen(timePicker);
					while (!timePicker.minute.hasFocus()) {
						Page.spotlightRight();
					}
					// increment
					Page.spotlightUp();
					browser.pause(250);
					value = parseInt(timePicker.item(timePicker.minute).getText());
					if (minute === 59) {
						expect(value).to.equal(0);
					} else {
						expect(value).to.equal(minute + 1);
					}
					// decrement
					Page.spotlightDown();
					browser.pause(250);
					value = parseInt(timePicker.item(timePicker.minute).getText());
					expect(value).to.equal(minute);
				});

				it('should update value text when incrementing/decrementing the meridiem picker', function () {
					Page.spotlightSelect();
					browser.pause(250);
					const time = timePicker.valueText;
					let value;
					expectOpen(timePicker);
					while (!timePicker.meridiem.hasFocus()) {
						Page.spotlightRight();
					}
					// increment
					Page.spotlightUp();
					browser.pause(250);
					value = timePicker.valueText;
					expect(value).to.not.equal(time);
					// decrement
					Page.spotlightDown();
					browser.pause(250);
					value = timePicker.valueText;
					expect(value).to.equal(time);
				});

				it('should change the meridiem on hour boundaries', function () {
					Page.spotlightSelect();
					browser.pause(250);
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
					// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
					browser.pause(250);
					expectOpen(timePicker);
				});

				it('should close on title click when open', function () {
					timePicker.title.click();
					browser.pause(250);
					expectOpen(timePicker);
					timePicker.title.click();
					browser.pause(250);
					expectClosed(timePicker);
				});

				it('should select hour when opened', function () {
					timePicker.title.click();
					browser.pause(250);
					timePicker.hour.click();
					expect(timePicker.hour.hasFocus()).to.be.true();
				});

				it('should update hour when incrementing/decrementing the picker', function () {
					timePicker.title.click();
					browser.pause(250);
					const hour = parseInt(timePicker.item(timePicker.hour).getText());
					let value;
					expectOpen(timePicker);
					// increment
					timePicker.incrementer(timePicker.hour).click();
					browser.pause(250);
					value = parseInt(timePicker.item(timePicker.hour).getText());
					if (hour === 12) {
						expect(value).to.equal(1);
					} else {
						expect(value).to.equal(hour + 1);
					}
					// decrement
					timePicker.decrementer(timePicker.hour).click();
					browser.pause(250);
					value = parseInt(timePicker.item(timePicker.hour).getText());
					expect(value).to.equal(hour);
				});

				it('should update minute when incrementing/decrementing the picker', function () {
					timePicker.title.click();
					browser.pause(250);
					const minute = parseInt(timePicker.item(timePicker.minute).getText());
					let value;
					expectOpen(timePicker);
					// increment
					timePicker.incrementer(timePicker.minute).click();
					browser.pause(250);
					value = parseInt(timePicker.item(timePicker.minute).getText());
					if (minute === 59) {
						expect(value).to.equal(0);
					} else {
						expect(value).to.equal(minute + 1);
					}
					// decrement
					timePicker.decrementer(timePicker.minute).click();
					browser.pause(250);
					value = parseInt(timePicker.item(timePicker.minute).getText());
					expect(value).to.equal(minute);
				});

				it('should update value text when incrementing/decrementing the meridiem picker', function () {
					timePicker.title.click();
					browser.pause(250);
					const time = timePicker.valueText;
					let value;
					expectOpen(timePicker);
					// increment
					timePicker.incrementer(timePicker.meridiem).click();
					browser.pause(250);
					value = timePicker.valueText;
					expect(value).to.not.equal(time);
					// decrement
					timePicker.decrementer(timePicker.meridiem).click();
					browser.pause(250);
					value = timePicker.valueText;
					expect(value).to.equal(time);
				});

				it('should change the meridiem on hour boundaries', function () {
					timePicker.title.click();
					browser.pause(250);
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
					browser.pause(250);
					expectClosed(timePicker);
					expect(timePicker.title.hasFocus()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should close on title click when open', function () {
					timePicker.title.click();
					// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
					browser.pause(250);
					expectClosed(timePicker);
				});

				it('should open on title click when closed', function () {
					timePicker.title.click();
					browser.pause(250);
					expectClosed(timePicker);
					timePicker.title.click();
					browser.pause(250);
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
					browser.pause(250);
					const {hour, minute, meridiem} = extractValues(timePicker);

					expect(hour).to.equal(12);
					expect(minute).to.equal(0);
					expect(meridiem).to.equal('AM');
				});
			});

			describe('pointer', function () {
				it('should not update on title click', function () {
					timePicker.title.click();
					browser.pause(250);
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
				expect(timePicker.hourLabel.value).to.be.null();
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

			describe('5-way', function() {
				it('should not receive focus', function () {
					Page.components.timePickerNoLabels.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					Page.spotlightDown();
					expect(timePicker.title.hasFocus()).to.be.false();
				});
			});

			describe('pointer', function () {
				it('should not open when clicked', function () {
					timePicker.title.click();
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
			browser.pause(250);
			expectOpen(timePicker);
			expect(timePicker.hour.hasFocus()).to.be.true();
		});

		it('should have minute-hour-meridiem (RTL)', function () {
			Page.spotlightSelect();
			browser.pause(250);
			expectOpen(timePicker);
			Page.spotlightRight();
			expect(timePicker.minute.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(timePicker.hour.hasFocus()).to.be.true();
			Page.spotlightLeft();
			expect(timePicker.meridiem.hasFocus()).to.be.true();
		});

		it('should focus title when 5-way left from last picker', function () {
			Page.spotlightSelect();
			browser.pause(250);
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
	});

});

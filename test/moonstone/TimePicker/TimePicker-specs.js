const Page = require('./TimePickerPage');
const {validateTitle, expectClosed, expectOpen} = require('./TimePicker-utils.js');

describe('TimePicker', function () {
	beforeEach(function () {
		Page.open();
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

			it('should update value text when incrementing/decrementing the range picker', function () {
				Page.spotlightSelect();
				browser.pause(250);
				const value = parseInt(timePicker.item(timePicker.hour).getText());
				expectOpen(timePicker);
				while (!timePicker.hour.hasFocus()) {
					Page.spotlightRight();
				}
				// increment
				Page.spotlightUp();
				browser.pause(250);
				expect(value + 1 === parseInt(timePicker.item(timePicker.hour).getText())).to.be.true();
				// decrement
				Page.spotlightDown();
				browser.pause(250);
				expect(value === parseInt(timePicker.item(timePicker.hour).getText())).to.be.true();
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

			it('should update value text when incrementing/decrementing the range picker', function () {
				timePicker.title.click();
				browser.pause(250);
				const value = parseInt(timePicker.item(timePicker.hour).getText());
				expectOpen(timePicker);
				// increment
				timePicker.incrementer(timePicker.hour).click();
				browser.pause(250);
				expect(value + 1 === parseInt(timePicker.item(timePicker.hour).getText())).to.be.true();
				// decrement
				timePicker.decrementer(timePicker.hour).click();
				browser.pause(250);
				expect(value === parseInt(timePicker.item(timePicker.hour).getText())).to.be.true();
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

	describe('no labels', function () {
		const timePicker = Page.components.timePickerNoLabels;

		it('should not have labeled pickers', function () {
			timePicker.title.click();
			expect(timePicker.hourLabel.value === null).to.be.true();
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
				Page.components.timePickerDefaultOpenWithNoneText.focus();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
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

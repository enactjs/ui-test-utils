let Page = require('./TimePickerPage');

describe('TimePicker', function () {
	it('should have focus on start', function () {
		Page.open();
		expect(Page.components.timePicker1.title.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const timePicker = Page.components.timePicker1;

		it('should have correct title', function () {
			Page.open();
			expect(timePicker.titleText).to.equal('Time Picker Default');
		});

		it('should have correct none text', function () {
			Page.open();
			expect(timePicker.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			Page.open();
			expect(timePicker.isOpen).to.be.false();
			expect(timePicker.chevron).to.equal('󯿭');
			expect(timePicker.hours.isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open, spot hours picker on select, and update value to current time', function () {
				Page.open();
				const value = timePicker.valueText;
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(timePicker.isOpen).to.be.true();
				expect(timePicker.chevron).to.equal('󯿮');
				expect(timePicker.hours.isVisible()).to.be.true();
				expect(timePicker.hours.hasFocus()).to.be.true();
				expect(value !== timePicker.valueText).to.be.true();
			});

			it('should close when pressing select', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(timePicker.isOpen).to.be.true();
				expect(timePicker.chevron).to.equal('󯿮');
				expect(timePicker.hours.isVisible()).to.be.true();
				expect(timePicker.hours.hasFocus()).to.be.true();
				Page.spotlightSelect();
				expect(timePicker.isOpen).to.be.false();
			});

			it('should focus title when 5-way right from last picker', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(timePicker.isOpen).to.be.true();
				expect(timePicker.chevron).to.equal('󯿮');
				expect(timePicker.hours.isVisible()).to.be.true();
				expect(timePicker.hours.hasFocus()).to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(timePicker.title.hasFocus()).to.be.true();
			});

			it('should update value text when incrementing/decrementing the range picker', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				const value = timePicker.valueText;
				expect(timePicker.isOpen).to.be.true();
				Page.spotlightUp();
				browser.pause(250);
				expect(value !== timePicker.valueText).to.be.true();
			});

			it('should change the meridiem on hour boundaries', function () {
				Page.open();
				const value = timePicker.valueText;
				Page.spotlightSelect();
				browser.pause(250);
				// 12 hours ought to change the value text if meridiem changes
				for (let i = 12; i; i -= 1) {
					Page.spotlightDown();
				}
				expect(value !== timePicker.valueText).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				Page.open();
				timePicker.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(timePicker.isOpen).to.be.true();
				expect(timePicker.chevron).to.equal('󯿮');
				expect(timePicker.hours.isVisible()).to.be.true();
			});

			it('should close on title click when open', function () {
				Page.open();
				timePicker.title.click();
				browser.pause(250);
				expect(timePicker.isOpen).to.be.true();
				timePicker.title.click();
				browser.pause(250);
				expect(timePicker.isOpen).to.be.false();
			});

			it('should select hours when opened', function () {
				Page.open();
				timePicker.title.click();
				browser.pause(250);
				timePicker.hours.click();
				expect(timePicker.hours.hasFocus()).to.be.true();
			});

			it('should update value text when incrementing/decrementing the range picker', function () {
				Page.open();
				timePicker.title.click();
				browser.pause(250);
				const value = timePicker.valueText;
				expect(timePicker.isOpen).to.be.true();
				timePicker.decrementer(timePicker.hours).click();
				browser.pause(250);
				expect(value !== timePicker.valueText).to.be.true();
			});

			it('should change the meridiem on hour boundaries', function () {
				Page.open();
				timePicker.title.click();
				browser.pause(250);
				const value = timePicker.valueText;
				// 12 hours ought to change the value text if meridiem changes
				for (let i = 12; i; i -= 1) {
					timePicker.decrementer(timePicker.hours).click();
				}
				expect(value !== timePicker.valueText).to.be.true();
			});
		});
	});

	describe('default open', function () {
		const timePicker = Page.components.timePicker2;

		it('should be initially open', function () {
			Page.open();
			expect(timePicker.isOpen).to.be.true();
			expect(timePicker.chevron).to.equal('󯿮');
			expect(timePicker.hours.isVisible()).to.be.true();
		});

		describe('5-way', function () {
			it('should close when pressing select', function () {
				Page.open();
				timePicker.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expect(timePicker.isOpen).to.be.false();
				expect(timePicker.chevron).to.equal('󯿭');
				expect(timePicker.hours.isVisible()).to.be.false();
				expect(timePicker.title.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click when open', function () {
				Page.open();
				timePicker.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(timePicker.isOpen).to.be.false();
				expect(timePicker.chevron).to.equal('󯿭');
				expect(timePicker.hours.isVisible()).to.be.false();
			});

			it('should open on title click when closed', function () {
				Page.open();
				timePicker.title.click();
				browser.pause(250);
				expect(timePicker.isOpen).to.be.false();
				timePicker.title.click();
				browser.pause(250);
				expect(timePicker.isOpen).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const timePicker = Page.components.timePicker3;

		it('should be initially closed', function () {
			Page.open();
			expect(timePicker.isOpen).to.be.false();
			expect(timePicker.chevron).to.equal('󯿭');
			expect(timePicker.hours.isVisible()).to.be.false();
		});

		it('should have correct none text', function () {
			Page.open();
			expect(timePicker.valueText).to.equal('Nothing Selected');
		});

		describe('5-way', function() {
			it('should not receive focus', function () {
				Page.open();
				Page.components.timePicker2.focus();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(timePicker.title.hasFocus()).to.be.false();
			});
		});

		describe('pointer', function () {
			it('should not open when clicked', function () {
				Page.open();
				timePicker.title.click();
				expect(timePicker.isOpen).to.be.false();
				expect(timePicker.chevron).to.equal('󯿭');
				expect(timePicker.title.hasFocus()).to.be.false();
			});
		});
	});

	describe('default disabled open', function () {
		const timePicker = Page.components.timePicker4;

		it('should be initially closed', function () {
			Page.open();
			expect(timePicker.isOpen).to.be.false();
			expect(timePicker.chevron).to.equal('󯿭');
			expect(timePicker.hours.isVisible()).to.be.false();
		});

		it('should have the current time value', function () {
			Page.open();
			expect(timePicker.valueText !== 'Nothing Selected').to.be.true();
		});
	});

});

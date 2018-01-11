let Page = require('./ExpandablePickerPage');

describe('ExpandablePicker', function () {
	beforeEach(function () {
		Page.open();
	});


	it('should spot the title', function () {

		browser.pause(100)
		expect(Page.spottableArea.hasFocus()).to.be.true();
	});

	describe('5way', function () {
		it('should spot the right picker button', function () {

			Page.spotlightSelect();
			browser.pause(1000)

			expect(Page.pickerIncrement.hasFocus()).to.be.true();

		});

		it('should display the next value on select', function () {

			Page.spotlightSelect();
			browser.pause(1000)
			expect(Page.pickerIncrement.hasFocus()).to.be.true();
			Page.spotlightSelect();
			browser.pause(1000)
			expect(Page.pickerItemText).to.equal('option2');
		});

	});

	describe('pointer', function () {

		it('should expand on click', function () {

			Page.expandable1.click();

			expect(Page.expandable1.isExisting('.Transition__shown')).to.be.true();
		});

		it('should collapse on click', function () {

			Page.expandable1.click();
			browser.pause(1000)
			expect(Page.expandable1.isExisting('.Transition__shown')).to.be.true();
			Page.labeledItem.click();
			browser.pause(1000)
			expect(Page.expandable1.isExisting('.Transition__hidden')).to.be.true();
		});

		it('should display selected value on click', function () {

			browser.pause(1000)
			Page.expandable1.click();
			browser.pause(1000)
			Page.pickerIncrement.click();
			browser.pause(1000)
			expect(Page.pickerItemText).to.equal('option2');
			Page.pickerIncrement.click();
			browser.pause(1000)
			expect(Page.pickerItemText).to.equal('option3');
			Page.checkMark.click();
			browser.pause(1000)

			expect(Page.labeledItemText).to.equal('option3');

		});

		describe('both', function () {
			it('should collapse when selecting checkmark button', function () {

				browser.pause(100)
				Page.expandable1.click();
				browser.pause(1000)
				Page.pickerIncrement.moveToObject();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(1000)
				expect(Page.expandable1.isExisting('.Transition__shown')).to.be.false();
			});

			it('should show new value on collapsed picker', function () {

				Page.expandable1.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				expect(Page.pickerIncrement.hasFocus()).to.be.true();
				Page.spotlightSelect();
				browser.pause(1000)
				expect(Page.pickerIncrement.hasFocus()).to.be.true();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(2000)

				expect(Page.labeledItemText).to.equal('option2');


			});

			it('should not show unselected value on collapsed picker', function () {

				Page.expandable1.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightRight();
				browser.pause(1000)
				expect(Page.checkMark.hasFocus()).to.be.true();
				Page.spotlightSelect();
				browser.pause(2000)
				expect(Page.labeledItemText).to.equal('option2');
				Page.spotlightSelect();
				browser.pause(1000)
				expect(Page.pickerIncrement.hasFocus()).to.be.true();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightUp();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)

				expect(Page.labeledItemText).to.equal('option2');
			});
		});
	});
});

let Page = require('./ExpandablePickerPage');

describe('ExpandablePicker', function () {

	
	
	it('should spot the title', function () {
		Page.open();
		browser.pause(100)
		expect(Page.spottableArea.hasFocus()).to.be.true();
		
	});

	it('should expand on click', function () {
		Page.open();
		browser.pause(100)
		Page.expandable1.click();
		expect(Page.expandable1.isExisting('.Transition__shown')).to.be.true();
		
		
	});

	it('should spot the right picker button', function () {
		Page.open();
		Page.expandable1.moveToObject();
		Page.spotlightSelect();
		browser.pause(1000)
		expect(Page.pickerIncrement.hasFocus()).to.be.true();
	
	});

	it('should display the next value on select', function () {
		Page.open();
		Page.expandable1.moveToObject();
		Page.spotlightSelect();
		browser.pause(1000)
		Page.spotlightSelect();
		browser.pause(1000)
		expect(Page.pickerItemText).to.equal('option2');
	
	});

	it('should collapse when selecting checkmark button', function () {
		Page.open();
		browser.pause(100)
		Page.expandable1.click();
		browser.pause(100)
		Page.spotlightRight();
		Page.spotlightSelect();
		expect(Page.expandable1.isExisting('.Transition__shown')).to.be.false();
		
		
	});

	it.only('should show new value on collapsed picker', function () {
		Page.open();
		Page.expandable1.moveToObject();
		Page.spotlightSelect();
		browser.pause(1000)
		Page.spotlightSelect();
		browser.pause(1000)
		Page.spotlightRight();
		Page.spotlightSelect();
		browser.pause(2000)

		expect(Page.labeledItemText).to.equal('option2');
		
		
	});

});




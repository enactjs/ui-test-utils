const Page = require('./ExpandableItemPage');
const {expectClosed, expectOpen, validateTitle} = require('./ExpandableItem-utils');

describe('ExpandableItem', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should have focus on start', function () {
		expect(Page.components.expandableItemDefaultClosedWithoutNoneText.title.hasFocus()).to.be.true();
	});

	beforeEach(function () {
		Page.open();
	});

	describe('default', function () {
		const expandableItem = Page.components.expandableItemDefaultClosedWithoutNoneText;

		validateTitle(expandableItem, 'ExpandableItem Default');

		it('should be initially closed', function () {
			expectClosed(expandableItem);
		});

		describe('5-way', function () {
			it('should open on select', function () {
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectOpen(expandableItem);
			});

			it('should close when pressing select on label', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandableItem);
				Page.spotlightUp();
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(expandableItem);
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				expandableItem.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectOpen(expandableItem);
			});

			it('should close on title click when open', function () {
				expandableItem.title.click();
				browser.pause(250);
				expectOpen(expandableItem);
				expandableItem.title.click();
				browser.pause(250);
				expectClosed(expandableItem);
			});
		});
	});

	describe('default with noneText', function () {
		const expandableItem = Page.components.expandableItemDefaultClosedWithNoneText;

		it('should have correct noneText', function () {
			expect(expandableItem.valueText).to.equal('Nothing Selected');
		});
	});

	describe('default open', function () {
		const expandableItem = Page.components.expandableItemDefaultOpenWithNoneText;

		it('should be initially open', function () {
			expectOpen(expandableItem);
		});

		describe('5-way', function () {
			it('should close when pressing select', function () {
				expandableItem.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(expandableItem);
				expect(expandableItem.title.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click when open', function () {
				expandableItem.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectClosed(expandableItem);
			});

			it('should open on title click when closed', function () {
				expandableItem.title.click();
				browser.pause(250);
				expectClosed(expandableItem);
				expandableItem.title.click();
				browser.pause(250);
				expectOpen(expandableItem);
			});
		});
	});

	describe('with supplied label', function () {
		// supplied label is "Labeled Item"
		const expandableItem = Page.components.expandableItemWithLabel;

		it('should override noneText', function () {
			expect(expandableItem.valueText).to.equal('Labeled Item');
		});
	});

	describe('disabled', function () {
		const expandableItem = Page.components.expandableItemDisabledWithNoneText;

		it('should be initially closed', function () {
			expectClosed(expandableItem);
		});

		it('should have correct none text', function () {
			expect(expandableItem.valueText).to.equal('Nothing Selected');
		});

		describe('5-way', function() {
			it('should not receive focus', function () {
				Page.components.expandableItemWithLabel.focus();
				Page.spotlightDown();
				expect(expandableItem.title.hasFocus()).to.be.false();
			});
		});

		describe('pointer', function () {
			it('should not open when clicked', function () {
				expandableItem.title.click();
				expectClosed(expandableItem);
			});
		});
	});
});

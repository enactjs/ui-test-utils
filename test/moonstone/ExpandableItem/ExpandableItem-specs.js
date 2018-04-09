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
			it('should open and spot expanded item on select', function () {
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expectOpen(expandableItem);
				expect(expandableItem.item.hasFocus()).to.be.true();
			});

			it('should close when pressing select on label', function () {
				Page.spotlightUp();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expectOpen(expandableItem);
				Page.spotlightUp();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expectClosed(expandableItem);
			});

			it('should allow 5-way navigation beyond the last item', function () {
				expandableItem.focus();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expectOpen(expandableItem);
				expect(expandableItem.item.hasFocus()).to.be.true();
				Page.spotlightDown();
				expect(Page.components.expandableItemDefaultClosedWithNoneText.title.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				expandableItem.title.click();
				Page.waitTransitionEnd();
				expectOpen(expandableItem);
			});

			it('should close on title click when open', function () {
				expandableItem.title.click();
				Page.waitTransitionEnd();
				expectOpen(expandableItem);
				expandableItem.title.click();
				Page.waitTransitionEnd();
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
				Page.waitTransitionEnd();
				expectClosed(expandableItem);
				expect(expandableItem.title.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click when open', function () {
				expandableItem.title.click();
				Page.waitTransitionEnd();
				expectClosed(expandableItem);
			});

			it('should open on title click when closed', function () {
				expandableItem.title.click();
				Page.waitTransitionEnd();
				expectClosed(expandableItem);
				expandableItem.title.click();
				Page.waitTransitionEnd();
				expectOpen(expandableItem);
			});
		});
	});

	describe('autoClose', function () {
		const expandableItem = Page.components.expandableItemWithAutoClose;

		it('should close when 5-way focus returns to title', function () {
			expandableItem.focus();
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expectOpen(expandableItem);
			expect(expandableItem.item.hasFocus()).to.be.true();
			Page.spotlightUp();
			Page.waitTransitionEnd();
			expectClosed(expandableItem);
		});
	});

	describe('lockBottom', function () {
		const expandableItem = Page.components.expandableItemWithLockBottom;

		it('should not allow 5-way navigation beyond the last item', function () {
			expandableItem.focus();
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expectOpen(expandableItem);
			expect(expandableItem.item.hasFocus()).to.be.true();
			Page.spotlightDown();
			expect(expandableItem.item.hasFocus()).to.be.true();
		});
	});

	describe('with no children', function () {
		const expandableItem = Page.components.expandableItemWithoutChildren;

		describe('5-way', function () {
			// TODO: skip until ENYO-5013 is resolved
			it.skip('should allow navigation after opening', function () {
				Page.components.expandableItemWithLockBottom.focus();
				Page.spotlightDown();
				expect(expandableItem.title.hasFocus()).to.be.true();
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandableItem.title.hasFocus()).to.be.false();
			});
		});

		describe('pointer', function () {
			// Note: We can't use waitTransitionEnd here because the transition does not (currently)
			// happen when empty
			it('should open on title click when closed', function () {
				expandableItem.title.click();
				browser.pause(500);
				expect(expandableItem.chevron).to.equal('󯿮');
			});

			it('should close on title click when open', function () {
				expandableItem.title.click();
				browser.pause(500);
				expect(expandableItem.chevron).to.equal('󯿮');
				expandableItem.title.click();
				browser.pause(500);
				expect(expandableItem.chevron).to.equal('󯿭');
			});
		});
	});

	describe('labeled item', function () {
		// supplied label is "Labeled Item"

		describe('with \'auto\' showLabel', function () {
			const expandableItem = Page.components.expandableItemAutoLabel;

			it('should override noneText', function () {
				expect(expandableItem.valueText).to.equal('Labeled Item');
			});

			it('should display label when closed', function () {
				expectClosed(expandableItem);
				expect(expandableItem.hasLabel).to.be.true();
			});

			it('should not display label when open', function () {
				expandableItem.title.click();
				expectOpen(expandableItem);
				expect(expandableItem.hasLabel).to.be.false();
			});
		});

		describe('with \'always\' showLabel', function () {
			const expandableItem = Page.components.expandableItemAlwaysLabel;

			it('should display label when closed', function () {
				expandableItem.title.click();
				expectOpen(expandableItem);
				expect(expandableItem.hasLabel).to.be.true();
			});

			it('should display label when open', function () {
				expandableItem.title.click();
				expectOpen(expandableItem);
				expect(expandableItem.hasLabel).to.be.true();
			});
		});

		describe('with \'never\' showLabel', function () {
			const expandableItem = Page.components.expandableItemNeverLabel;

			it('should not display label when closed', function () {
				expandableItem.title.click();
				expectOpen(expandableItem);
				expect(expandableItem.hasLabel).to.be.false();
			});

			it('should not display label when open', function () {
				expandableItem.title.click();
				expectOpen(expandableItem);
				expect(expandableItem.hasLabel).to.be.false();
			});
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
				Page.components.expandableItemNeverLabel.focus();
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
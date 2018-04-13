const Page = require('./CheckboxItemPage'),
	{expectChecked, expectInline, expectUnchecked} = require('./CheckboxItem-utils.js'),
	{expectOrdering} = require('../../utils.js');

describe('CheckboxItem', function () {

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		describe('checkbox', function () {
			it('should have icon to the left of marquee text', function () {
				const checkboxItem = Page.components.checkboxDefault;

				expectOrdering(checkboxItem.icon, checkboxItem.value);
			});
		});

		describe('default', function () {
			const checkboxItem = Page.components.checkboxDefault;

			it('should have focus on first item at start', function () {
				expect(checkboxItem.self.hasFocus()).to.be.true();
			});

			it('should have correct text', function () {
				expect(checkboxItem.valueText).to.equal('Checkbox Item');
			});

			it('should not be checked', function () {
				expectUnchecked(checkboxItem);
			});

			it('should display icon before the text', function () {
				expect(checkboxItem.isBefore).to.be.true();
			});

			describe('5-way', function () {
				it('should check the item when selected', function () {
					Page.spotlightSelect();
					expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when selected twice', function () {
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectUnchecked(checkboxItem);
				});

				it('should display check icon when selected', function () {
					Page.spotlightSelect();
					expect(checkboxItem.iconSymbol).to.equal('✓');
				});

				it('should move focus down on SpotlightDown', function () {
					Page.spotlightDown();
					expect(Page.components.checkboxDefaultSelected.self.hasFocus()).to.be.true();
				});

				it('should move focus up on SpotlightUp', function () {
					Page.components.checkboxDefaultSelected.focus();
					Page.spotlightUp();
					expect(checkboxItem.self.hasFocus()).to.be.true();
				});
			});

			describe('pointer', function () {
				it('should check the item when clicked', function () {
					checkboxItem.self.click();
					expectChecked(checkboxItem);
				});

				it('should re-uncheck the item when clicked twice', function () {
					checkboxItem.self.click();
					checkboxItem.self.click();
					expectUnchecked(checkboxItem);
				});

				it('should display check icon when clicked', function () {
					checkboxItem.self.click();
					expect(checkboxItem.iconSymbol).to.equal('✓');
				});
			});
		});

		describe('selected', function () {
			const checkboxItemSelected = Page.components.checkboxDefaultSelected;

			it('should have correct text', function () {
				expect(checkboxItemSelected.valueText).to.equal('Checkbox Item selected');
			});

			it('should be checked', function () {
				expectChecked(checkboxItemSelected);
			});

			it('should display correct icon', function () {
				expect(checkboxItemSelected.iconSymbol).to.equal('✓');
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItemSelected.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItemSelected);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItemSelected.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItemSelected);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItemSelected.self.click();
					expectUnchecked(checkboxItemSelected);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItemSelected.self.click();
					checkboxItemSelected.self.click();
					expectChecked(checkboxItemSelected);
				});
			});
		});

		describe('iconPosition after', function () {
			const checkboxItemIconAfter = Page.components.checkboxIconAfter;

			it('should have correct text', function () {
				expect(checkboxItemIconAfter.valueText).to.equal('Checkbox Item after');
			});

			it('should be checked', function () {
				expectChecked(checkboxItemIconAfter);
			});

			it('should display icon after the text', function () {
				expect(checkboxItemIconAfter.isAfter).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItemIconAfter.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItemIconAfter);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItemIconAfter.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItemIconAfter);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItemIconAfter.self.click();
					expectUnchecked(checkboxItemIconAfter);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItemIconAfter.self.click();
					checkboxItemIconAfter.self.click();
					expectChecked(checkboxItemIconAfter);
				});
			});
		});

		describe('inline', function () {
			const checkboxItemInline = Page.components.checkboxInline;

			it('should have two inlined checkboxes positioned inlined', function () {
				const checkboxItem1 = Page.components.checkboxInline1.selfSelector;
				const checkboxItem2 = Page.components.checkboxInline2.selfSelector;
				expectInline({checkboxItem1, checkboxItem2});
			});

			it('should have correct text', function () {
				expect(checkboxItemInline.valueText).to.equal('Checkbox Item inline');
			});

			it('should be checked', function () {
				expectChecked(checkboxItemInline);
			});

			it('should display icon before the text', function () {
				expect(checkboxItemInline.isBefore).to.be.true();
			});

			it('should display item inline', function () {
				expect(checkboxItemInline.isInline).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItemInline.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItemInline);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItemInline.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItemInline);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItemInline.self.click();
					expectUnchecked(checkboxItemInline);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItemInline.self.click();
					checkboxItemInline.self.click();
					expectChecked(checkboxItemInline);
				});
			});
		});

		describe('inline after', function () {
			const checkboxItemInlineAfter = Page.components.checkboxInlineAfter;

			it('should have correct text', function () {
				expect(checkboxItemInlineAfter.valueText).to.equal('Checkbox Item inline after');
			});

			it('should be checked', function () {
				expectChecked(checkboxItemInlineAfter);
			});

			it('should display icon after the text', function () {
				expect(checkboxItemInlineAfter.isAfter).to.be.true();
			});

			it('should display item inline', function () {
				expect(checkboxItemInlineAfter.isInline).to.be.true();
			});

			describe('5-way', function () {
				it('should uncheck the item when selected', function () {
					checkboxItemInlineAfter.focus();
					Page.spotlightSelect();
					expectUnchecked(checkboxItemInlineAfter);
				});

				it('should re-check the item when selected twice', function () {
					checkboxItemInlineAfter.focus();
					Page.spotlightSelect();
					Page.spotlightSelect();
					expectChecked(checkboxItemInlineAfter);
				});
			});

			describe('pointer', function () {
				it('should uncheck the item when clicked', function () {
					checkboxItemInlineAfter.self.click();
					expectUnchecked(checkboxItemInlineAfter);
				});

				it('should re-check the item when clicked twice', function () {
					checkboxItemInlineAfter.self.click();
					checkboxItemInlineAfter.self.click();
					expectChecked(checkboxItemInlineAfter);
				});
			});
		});

		describe('disabled', function () {
			const checkboxItemDisabled = Page.components.checkboxDisabled;

			it('should have correct text', function () {
				expect(checkboxItemDisabled.valueText).to.equal('Checkbox Item disabled');
			});

			it('should be checked', function () {
				expectChecked(checkboxItemDisabled);
			});

			it('should display icon before the text', function () {
				expect(checkboxItemDisabled.isBefore).to.be.true();
			});

			it('should not focus the item', function () {
				checkboxItemDisabled.focus();
				expect(checkboxItemDisabled.self.hasFocus()).to.be.false();
			});

			describe('5-way', function () {
				it('should not uncheck the item when selected', function () {
					checkboxItemDisabled.focus();
					Page.spotlightSelect();
					expectChecked(checkboxItemDisabled);
				});
			});

			describe('pointer', function () {
				it('should not uncheck the item when clicked', function () {
					checkboxItemDisabled.self.click();
					expectChecked(checkboxItemDisabled);
				});
			});
		});
	});

	describe('RTL locale', function () {
		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should have focus on first item at start', function () {
			expect(Page.components.checkboxDefault.self.hasFocus()).to.be.true();
		});

		it('should have icon to the right of text when default', function () {
			const checkboxItem = Page.components.checkboxDefault;

			expectOrdering(checkboxItem.value, checkboxItem.icon);
		});

		it('should have two inlined checkboxes positioned inlined', function () {
			const checkboxItem1 = Page.components.checkboxInline1.self;
			const checkboxItem2 = Page.components.checkboxInline2.self;

			expectInline(checkboxItem1, checkboxItem2);
		});
	});
});

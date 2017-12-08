const Page = require('./CheckboxItemPage'),
	{expectChecked, expectUnchecked} = require('./CheckboxItem-utils.js');

describe('CheckboxItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.checkboxDefault.item.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const checkboxItem = Page.components.checkboxDefault;

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
				expect(Page.components.checkboxDefaultSelected.item.hasFocus()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.checkboxDefaultSelected.focus();
				Page.spotlightUp();
				expect(checkboxItem.item.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should check the item when clicked', function () {
				checkboxItem.item.click();
				expectChecked(checkboxItem);
			});

			it('should re-uncheck the item when clicked twice', function () {
				checkboxItem.item.click();
				checkboxItem.item.click();
				expectUnchecked(checkboxItem);
			});

			it('should display check icon when clicked', function () {
				checkboxItem.item.click();
				expect(checkboxItem.iconSymbol).to.equal('✓');
			});
		});
	});

	describe('default selected', function () {
		const checkboxItem = Page.components.checkboxDefaultSelected;

		it('should have correct text', function () {
			expect(checkboxItem.valueText).to.equal('Checkbox Item selected');
		});

		it('should be checked', function () {
			expectChecked(checkboxItem);
		});

		it('should display correct icon', function () {
			expect(checkboxItem.iconSymbol).to.equal('✓');
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				checkboxItem.focus();
				Page.spotlightSelect();
				expectUnchecked(checkboxItem);
			});

			it('should re-check the item when selected twice', function () {
				checkboxItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectChecked(checkboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				checkboxItem.item.click();
				expectUnchecked(checkboxItem);
			});

			it('should re-check the item when clicked twice', function () {
				checkboxItem.item.click();
				checkboxItem.item.click();
				expectChecked(checkboxItem);
			});
		});
	});

	describe('iconPosition after', function () {
		const checkboxItem = Page.components.checkboxIconAfter;

		it('should have correct text', function () {
			expect(checkboxItem.valueText).to.equal('Checkbox Item after');
		});

		it('should be checked', function () {
			expectChecked(checkboxItem);
		});

		it('should display icon after the text', function () {
			expect(checkboxItem.isAfter).to.be.true();
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				checkboxItem.focus();
				Page.spotlightSelect();
				expectUnchecked(checkboxItem);
			});

			it('should re-check the item when selected twice', function () {
				checkboxItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectChecked(checkboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				checkboxItem.item.click();
				expectUnchecked(checkboxItem);
			});

			it('should re-check the item when clicked twice', function () {
				checkboxItem.item.click();
				checkboxItem.item.click();
				expectChecked(checkboxItem);
			});
		});
	});

	describe('inline', function () {
		const checkboxItem = Page.components.checkboxInline;

		it('should have correct text', function () {
			expect(checkboxItem.valueText).to.equal('Checkbox Item inline');
		});

		it('should be checked', function () {
			expectChecked(checkboxItem);
		});

		it('should display icon before the text', function () {
			expect(checkboxItem.isBefore).to.be.true();
		});

		it('should display item inline', function () {
			expect(checkboxItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				checkboxItem.focus();
				Page.spotlightSelect();
				expectUnchecked(checkboxItem);
			});

			it('should re-check the item when selected twice', function () {
				checkboxItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectChecked(checkboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				checkboxItem.item.click();
				expectUnchecked(checkboxItem);
			});

			it('should re-check the item when clicked twice', function () {
				checkboxItem.item.click();
				checkboxItem.item.click();
				expectChecked(checkboxItem);
			});
		});
	});

	describe('inline after', function () {
		const checkboxItem = Page.components.checkboxInlineAfter;

		it('should have correct text', function () {
			expect(checkboxItem.valueText).to.equal('Checkbox Item inline after');
		});

		it('should be checked', function () {
			expectChecked(checkboxItem);
		});

		it('should display icon after the text', function () {
			expect(checkboxItem.isAfter).to.be.true();
		});

		it('should display item inline', function () {
			expect(checkboxItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				checkboxItem.focus();
				Page.spotlightSelect();
				expectUnchecked(checkboxItem);
			});

			it('should re-check the item when selected twice', function () {
				checkboxItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectChecked(checkboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				checkboxItem.item.click();
				expectUnchecked(checkboxItem);
			});

			it('should re-check the item when clicked twice', function () {
				checkboxItem.item.click();
				checkboxItem.item.click();
				expectChecked(checkboxItem);
			});
		});
	});

	describe('disabled', function () {
		const checkboxItem = Page.components.checkboxDisabled;

		it('should have correct text', function () {
			expect(checkboxItem.valueText).to.equal('Checkbox Item disabled');
		});

		it('should be checked', function () {
			expectChecked(checkboxItem);
		});

		it('should display icon before the text', function () {
			expect(checkboxItem.isBefore).to.be.true();
		});

		it('should not focus the item', function () {
			checkboxItem.focus();
			expect(checkboxItem.item.hasFocus()).to.be.false();
		});

		describe('5-way', function () {
			it('should not uncheck the item when selected', function () {
				checkboxItem.focus();
				Page.spotlightSelect();
				expectChecked(checkboxItem);
			});
		});

		describe('pointer', function () {
			it('should not uncheck the item when clicked', function () {
				checkboxItem.item.click();
				expectChecked(checkboxItem);
			});
		});
	});
});
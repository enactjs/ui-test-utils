const Page = require('./FormCheckboxItemPage'),
	{expectChecked, expectUnchecked} = require('./FormCheckboxItem-utils.js');

describe('FormCheckboxItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.formCheckboxDefault.item.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const FormCheckboxItem = Page.components.formCheckboxDefault;

		it('should have correct text', function () {
			expect(FormCheckboxItem.valueText).to.equal('FormCheckbox Item');
		});

		it('should not be checked', function () {
			expectUnchecked(FormCheckboxItem);
		});

		it('should display icon before the text', function () {
			expect(FormCheckboxItem.isBefore).to.be.true();
		});

		describe('5-way', function () {
			it('should check the item when selected', function () {
				Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});

			it('should re-uncheck the item when selected twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should display check icon when selected', function () {
				Page.spotlightSelect();
				expect(FormCheckboxItem.iconSymbol).to.equal('✓');
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(Page.components.formCheckboxDefaultSelected.item.hasFocus()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.formCheckboxDefaultSelected.focus();
				Page.spotlightUp();
				expect(FormCheckboxItem.item.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should check the item when clicked', function () {
				FormCheckboxItem.item.click();
				expectChecked(FormCheckboxItem);
			});

			it('should re-uncheck the item when clicked twice', function () {
				FormCheckboxItem.item.click();
				FormCheckboxItem.item.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should display check icon when clicked', function () {
				FormCheckboxItem.item.click();
				expect(FormCheckboxItem.iconSymbol).to.equal('✓');
			});
		});
	});

	describe('default selected', function () {
		const FormCheckboxItem = Page.components.formCheckboxDefaultSelected;

		it('should have correct text', function () {
			expect(FormCheckboxItem.valueText).to.equal('FormCheckbox Item selected');
		});

		it('should be checked', function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display correct icon', function () {
			expect(FormCheckboxItem.iconSymbol).to.equal('✓');
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				FormCheckboxItem.item.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', function () {
				FormCheckboxItem.item.click();
				FormCheckboxItem.item.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('iconPosition after', function () {
		const FormCheckboxItem = Page.components.formCheckboxIconAfter;

		it('should have correct text', function () {
			expect(FormCheckboxItem.valueText).to.equal('FormCheckbox Item after');
		});

		it('should be checked', function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display icon after the text', function () {
			expect(FormCheckboxItem.isAfter).to.be.true();
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				FormCheckboxItem.item.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', function () {
				FormCheckboxItem.item.click();
				FormCheckboxItem.item.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('inline', function () {
		const FormCheckboxItem = Page.components.formCheckboxInline;

		it('should have correct text', function () {
			expect(FormCheckboxItem.valueText).to.equal('FormCheckbox Item inline');
		});

		it('should be checked', function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display icon before the text', function () {
			expect(FormCheckboxItem.isBefore).to.be.true();
		});

		it('should display item inline', function () {
			expect(FormCheckboxItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				FormCheckboxItem.item.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', function () {
				FormCheckboxItem.item.click();
				FormCheckboxItem.item.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('inline after', function () {
		const FormCheckboxItem = Page.components.formCheckboxInlineAfter;

		it('should have correct text', function () {
			expect(FormCheckboxItem.valueText).to.equal('FormCheckbox Item inline after');
		});

		it('should be checked', function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display icon after the text', function () {
			expect(FormCheckboxItem.isAfter).to.be.true();
		});

		it('should display item inline', function () {
			expect(FormCheckboxItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when selected twice', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				FormCheckboxItem.item.click();
				expectUnchecked(FormCheckboxItem);
			});

			it('should re-check the item when clicked twice', function () {
				FormCheckboxItem.item.click();
				FormCheckboxItem.item.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('disabled', function () {
		const FormCheckboxItem = Page.components.formCheckboxDisabled;

		it('should have correct text', function () {
			expect(FormCheckboxItem.valueText).to.equal('FormCheckbox Item disabled');
		});

		it('should be checked', function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display icon before the text', function () {
			expect(FormCheckboxItem.isBefore).to.be.true();
		});

		it('should not focus the item', function () {
			FormCheckboxItem.focus();
			expect(FormCheckboxItem.item.hasFocus()).to.be.false();
		});

		describe('5-way', function () {
			it('should not uncheck the item when selected', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should not uncheck the item when clicked', function () {
				FormCheckboxItem.item.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});

	describe('inline disabled', function () {
		const FormCheckboxItem = Page.components.formCheckboxInlineDisabled;

		it('should have correct text', function () {
			expect(FormCheckboxItem.valueText).to.equal('FormCheckbox Item inline disabled');
		});

		it('should be checked', function () {
			expectChecked(FormCheckboxItem);
		});

		it('should display item inline', function () {
			expect(FormCheckboxItem.isInline).to.be.true();
		});

		it('should display icon before the text', function () {
			expect(FormCheckboxItem.isBefore).to.be.true();
		});

		it('should not focus the item', function () {
			FormCheckboxItem.focus();
			expect(FormCheckboxItem.item.hasFocus()).to.be.false();
		});

		describe('5-way', function () {
			it('should not uncheck the item when selected', function () {
				FormCheckboxItem.focus();
				Page.spotlightSelect();
				expectChecked(FormCheckboxItem);
			});
		});

		describe('pointer', function () {
			it('should not uncheck the item when clicked', function () {
				FormCheckboxItem.item.click();
				expectChecked(FormCheckboxItem);
			});
		});
	});
});

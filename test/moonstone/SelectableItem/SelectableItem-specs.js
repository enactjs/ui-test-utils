const Page = require('./SelectableItemPage'),
	{expectSelected, expectUnselected} = require('./SelectableItem-utils.js');

describe('SelectableItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.selectableDefault.item.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const selectableItem = Page.components.selectableDefault;

		it('should have correct text', function () {
			expect(selectableItem.valueText).to.equal('Selectable Item1');
		});

		it('should not be selected', function () {
			expectUnselected(selectableItem);
		});

		describe('5-way', function () {
			it('should select the item when selected', function () {
				Page.spotlightSelect();
				expectSelected(selectableItem);
			});

			it('should re-unselect the item when selected twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectUnselected(selectableItem);
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(Page.components.selectableDefaultSelected.item.hasFocus()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.selectableDefaultSelected.focus();
				Page.spotlightUp();
				expect(selectableItem.item.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', function () {
				selectableItem.item.click();
				expectSelected(selectableItem);
			});

			it('should re-unselect the item when clicked twice', function () {
				selectableItem.item.click();
				selectableItem.item.click();
				expectUnselected(selectableItem);
			});
		});
	});

	describe('default selected', function () {
		const selectableItem = Page.components.selectableDefaultSelected;

		it('should have correct text', function () {
			expect(selectableItem.valueText).to.equal('Selectable Item selected');
		});

		it('should be selected', function () {
			expectSelected(selectableItem);
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when selected twice', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(selectableItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				selectableItem.item.click();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when clicked twice', function () {
				selectableItem.item.click();
				selectableItem.item.click();
				expectSelected(selectableItem);
			});
		});
	});

	describe('inline', function () {
		const selectableItem = Page.components.selectableInline;

		it('should have correct text', function () {
			expect(selectableItem.valueText).to.equal('Selectable Item inline');
		});

		it('should be selected', function () {
			expectSelected(selectableItem);
		});

		it('should display item inline', function () {
			expect(selectableItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when selected twice', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(selectableItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				selectableItem.item.click();
				expectUnselected(selectableItem);
			});

			it('should re-select the item when clicked twice', function () {
				selectableItem.item.click();
				selectableItem.item.click();
				expectSelected(selectableItem);
			});
		});
	});

	describe('disabled', function () {
		const selectableItem = Page.components.selectableDisabled;

		it('should have correct text', function () {
			expect(selectableItem.valueText).to.equal('Selectable Item disabled');
		});

		it('should be selected', function () {
			expectSelected(selectableItem);
		});

		it('should not focus the item', function () {
			selectableItem.focus();
			expect(selectableItem.item.hasFocus()).to.be.false();
		});

		describe('5-way', function () {
			it('should not unselect the item when selected', function () {
				selectableItem.focus();
				Page.spotlightSelect();
				expectSelected(selectableItem);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				selectableItem.item.click();
				expectSelected(selectableItem);
			});
		});
	});
});

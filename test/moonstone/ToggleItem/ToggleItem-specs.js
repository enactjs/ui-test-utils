const Page = require('./ToggleItemPage'),
	{expectSelected, expectUnselected} = require('./ToggleItem-utils.js');

describe('ToggleItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.toggleDefault.item.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const toggleItem = Page.components.toggleDefault;

		it('should have correct text', function () {
			expect(toggleItem.valueText).to.equal('Toggle Item1');
		});

		it('should not display icon', function () {
			expect(toggleItem.icon.isVisible()).to.be.false();
		});

		it('should display icon before the text', function () {
			expect(toggleItem.isBefore).to.be.true();
		});

		describe('5-way', function () {
			it('should select the item when selected', function () {
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});

			it('should re-unselect the item when selected twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should display correct icon when selected', function () {
				Page.spotlightSelect();
				expect(toggleItem.iconSymbol).to.equal('󰀭');
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(Page.components.toggleDefaultSelected.item.hasFocus()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.toggleDefaultSelected.focus();
				Page.spotlightUp();
				expect(toggleItem.item.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', function () {
				toggleItem.item.click();
				expectSelected(toggleItem);
			});

			it('should re-unselect the item when clicked twice', function () {
				toggleItem.item.click();
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should display correct icon when clicked', function () {
				toggleItem.item.click();
				expect(toggleItem.iconSymbol).to.equal('󰀭');
			});
		});
	});

	describe('default selected', function () {
		const toggleItem = Page.components.toggleDefaultSelected;

		it('should have correct text', function () {
			expect(toggleItem.valueText).to.equal('Toggle Item selected');
		});

		it('should display icon', function () {
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display correct icon', function () {
			expect(toggleItem.iconSymbol).to.equal('󯿶');
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				toggleItem.focus();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when selected twice', function () {
				toggleItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when clicked twice', function () {
				toggleItem.item.click();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});

	describe('iconPosition after', function () {
		const toggleItem = Page.components.toggleIconAfter;

		it('should have correct text', function () {
			expect(toggleItem.valueText).to.equal('Toggle Item after');
		});

		it('should display icon', function () {
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display icon after the text', function () {
			expect(toggleItem.isAfter).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				toggleItem.focus();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when selected twice', function () {
				toggleItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when clicked twice', function () {
				toggleItem.item.click();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});

	describe('inline', function () {
		const toggleItem = Page.components.toggleInline;

		it('should have correct text', function () {
			expect(toggleItem.valueText).to.equal('Toggle Item inline');
		});

		it('should display icon', function () {
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display icon before the text', function () {
			expect(toggleItem.isBefore).to.be.true();
		});

		it('should display item inline', function () {
			expect(toggleItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				toggleItem.focus();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when selected twice', function () {
				toggleItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when clicked twice', function () {
				toggleItem.item.click();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});

	describe('inline after', function () {
		const toggleItem = Page.components.toggleInlineAfter;

		it('should have correct text', function () {
			expect(toggleItem.valueText).to.equal('Toggle Item inline after');
		});

		it('should display icon', function () {
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display icon after the text', function () {
			expect(toggleItem.isAfter).to.be.true();
		});

		it('should display item inline', function () {
			expect(toggleItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				toggleItem.focus();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when selected twice', function () {
				toggleItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when clicked twice', function () {
				toggleItem.item.click();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});

	describe('disabled', function () {
		const toggleItem = Page.components.toggleDisabled;

		it('should have correct text', function () {
			expect(toggleItem.valueText).to.equal('Toggle Item disabled');
		});

		it('should display icon', function () {
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display icon before the text', function () {
			expect(toggleItem.isBefore).to.be.true();
		});

		it('should not focus the item', function () {
			toggleItem.focus();
			expect(toggleItem.item.hasFocus()).to.be.false();
		});

		describe('5-way', function () {
			it('should not unselect the item when selected', function () {
				toggleItem.focus();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});
});

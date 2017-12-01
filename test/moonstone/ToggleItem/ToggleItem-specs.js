const Page = require('./ToggleItemPage');

describe('ToggleItem', function () {

	it('should have focus on first item at start', function () {
		Page.open();
		expect(Page.components.toggleDefault.item.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const toggleItem = Page.components.toggleDefault;

		it('should have correct text', function () {
			Page.open();
			expect(toggleItem.valueText).to.equal('Toggle Item1');
		});

		it('should not display icon', function () {
			Page.open();
			expect(toggleItem.icon.isVisible()).to.be.false();
		});

		it('should display icon before the text', function () {
			Page.open();
			expect(toggleItem.isBefore).to.be.true();
		});

		describe('5-way', function () {
			it('should select the item when selected', function () {
				Page.open();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});

			it('should re-unselect the item when selected twice', function () {
				Page.open();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should display correct icon when selected', function () {
				Page.open();
				Page.spotlightSelect();
				expect(toggleItem.iconSymbol).to.equal('󰀭');
			});

			it('should move focus down on SpotlightDown', function () {
				Page.open();
				Page.spotlightDown();
				expect(Page.components.toggleDefaultSelected.item.hasFocus()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.open();
				Page.components.toggleDefaultSelected.focus();
				Page.spotlightUp();
				expect(toggleItem.item.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', function () {
				Page.open();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});

			it('should re-unselect the item when clicked twice', function () {
				Page.open();
				toggleItem.item.click();
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should display correct icon when clicked', function () {
				Page.open();
				toggleItem.item.click();
				expect(toggleItem.iconSymbol).to.equal('󰀭');
			});
		});
	});

	describe('default selected', function () {
		const toggleItem = Page.components.toggleDefaultSelected;

		it('should have correct text', function () {
			Page.open();
			expect(toggleItem.valueText).to.equal('Toggle Item selected');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display correct icon', function () {
			Page.open();
			expect(toggleItem.iconSymbol).to.equal('󯿶');
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				Page.open();
				toggleItem.focus();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when selected twice', function () {
				Page.open();
				toggleItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				Page.open();
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when clicked twice', function () {
				Page.open();
				toggleItem.item.click();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});

	describe('iconPosition after', function () {
		const toggleItem = Page.components.toggleIconAfter;

		it('should have correct text', function () {
			Page.open();
			expect(toggleItem.valueText).to.equal('Toggle Item after');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display icon after the text', function () {
			Page.open();
			expect(toggleItem.isAfter).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				Page.open();
				toggleItem.focus();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when selected twice', function () {
				Page.open();
				toggleItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				Page.open();
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when clicked twice', function () {
				Page.open();
				toggleItem.item.click();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});

	describe('inline', function () {
		const toggleItem = Page.components.toggleInline;

		it('should have correct text', function () {
			Page.open();
			expect(toggleItem.valueText).to.equal('Toggle Item inline');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display icon before the text', function () {
			Page.open();
			expect(toggleItem.isBefore).to.be.true();
		});

		it('should display item inline', function () {
			Page.open();
			expect(toggleItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				Page.open();
				toggleItem.focus();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when selected twice', function () {
				Page.open();
				toggleItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				Page.open();
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when clicked twice', function () {
				Page.open();
				toggleItem.item.click();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});

	describe('inline after', function () {
		const toggleItem = Page.components.toggleInlineAfter;

		it('should have correct text', function () {
			Page.open();
			expect(toggleItem.valueText).to.equal('Toggle Item inline after');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display icon after the text', function () {
			Page.open();
			expect(toggleItem.isAfter).to.be.true();
		});

		it('should display item inline', function () {
			Page.open();
			expect(toggleItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				Page.open();
				toggleItem.focus();
				Page.spotlightSelect();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when selected twice', function () {
				Page.open();
				toggleItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				Page.open();
				toggleItem.item.click();
				expectUnselected(toggleItem);
			});

			it('should re-select the item when clicked twice', function () {
				Page.open();
				toggleItem.item.click();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});

	describe('disabled', function () {
		const toggleItem = Page.components.toggleDisabled;

		it('should have correct text', function () {
			Page.open();
			expect(toggleItem.valueText).to.equal('Toggle Item disabled');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggleItem.icon.isVisible()).to.be.true();
		});

		it('should display icon before the text', function () {
			Page.open();
			expect(toggleItem.isBefore).to.be.true();
		});

		it('should not focus the item', function () {
			Page.open();
			toggleItem.focus();
			expect(toggleItem.item.hasFocus()).to.be.false();
		});

		describe('5-way', function () {
			it('should not unselect the item when selected', function () {
				Page.open();
				toggleItem.focus();
				Page.spotlightSelect();
				expectSelected(toggleItem);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				Page.open();
				toggleItem.item.click();
				expectSelected(toggleItem);
			});
		});
	});
});


// Expect blocks
function expectSelected (toggleItem) {
	expect(toggleItem.isSelected).to.be.true();
	expect(toggleItem.icon.isVisible()).to.be.true();
}

function expectUnselected (toggleItem) {
	expect(toggleItem.isSelected).to.be.false();
	expect(toggleItem.icon.isVisible()).to.be.false();
}

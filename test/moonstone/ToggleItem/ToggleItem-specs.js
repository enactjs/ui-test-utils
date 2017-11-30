const Page = require('./ToggleItemPage');
const {toggleNormal, toggleDefaultSelected, toggleIconAfter, toggleInline, toggleInlineAfter, toggledisabled} = Page.toggleItems;

describe('ToggleItem', function () {

	it('should have focus on first item at start', function () {
		Page.open();
		expect(toggleNormal.item.hasFocus()).to.be.true();
	});

	it('should have correct text', function () {
		Page.open();
		expect(toggleNormal.valueText).to.equal('Toggle Item1');
	});

	it('should not display icon', function () {
		Page.open();
		expect(toggleNormal.icon.isVisible()).to.be.false();
	});

	it('should display icon before the text', function () {
		Page.open();
		expect(toggleNormal.isBefore).to.be.true();
	});

	describe('5-way', function () {
		it('should select item and display the icon on spotlightSelect', function () {
			Page.open();
			Page.spotlightSelect();
			expectSelected(toggleNormal);
		});

		it('should unselect item and hide the icon on spotlightSelect', function () {
			Page.open();
			Page.spotlightSelect();
			Page.spotlightSelect();
			expectUnselected(toggleNormal);
		});

		it('should display correct icon on spotlightSelect', function () {
			Page.open();
			Page.spotlightSelect();
			expect(toggleNormal.iconSymbol).to.equal('󰀭');
		});

		it('should move focus down on SpotlightDown', function () {
			Page.open();
			Page.spotlightDown();
			expect(toggleDefaultSelected.item.hasFocus()).to.be.true();
		});

		it('should move focus up on SpotlightUp', function () {
			Page.open();
			toggleDefaultSelected.focus();
			Page.spotlightUp();
			expect(toggleNormal.item.hasFocus()).to.be.true();
		});
	});

	describe('pointer', function () {
		it('should select item and display the icon on click', function () {
			Page.open();
			toggleNormal.item.click();
			expectSelected(toggleNormal);
		});

		it('should unselect item and hide the icon on click', function () {
			Page.open();
			toggleNormal.item.click();
			toggleNormal.item.click();
			expectUnselected(toggleNormal);
		});

		it('should display correct icon on click', function () {
			Page.open();
			toggleNormal.item.click();
			expect(toggleNormal.iconSymbol).to.equal('󰀭');
		});
	});

	describe('default selected', function () {
		it('should have correct text', function () {
			Page.open();
			expect(toggleDefaultSelected.valueText).to.equal('Toggle Item selected');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggleDefaultSelected.icon.isVisible()).to.be.true();
		});

		it('should display correct icon', function () {
			Page.open();
			expect(toggleDefaultSelected.iconSymbol).to.equal('󯿶');
		});

		describe('5-way', function () {
			it('should unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				toggleDefaultSelected.focus();
				Page.spotlightSelect();
				expectUnselected(toggleDefaultSelected);
			});

			it('should select item and display the icon on spotlightSelect', function () {
				Page.open();
				toggleDefaultSelected.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleDefaultSelected);
			});
		});

		describe('pointer', function () {
			it('should unselect item and hide the icon on click', function () {
				Page.open();
				toggleDefaultSelected.item.click();
				expectUnselected(toggleDefaultSelected);
			});

			it('should select item and display the icon on click', function () {
				Page.open();
				toggleDefaultSelected.item.click();
				toggleDefaultSelected.item.click();
				expectSelected(toggleDefaultSelected);
			});
		});
	});

	describe('iconPosition after', function () {
		it('should have correct text', function () {
			Page.open();
			expect(toggleIconAfter.valueText).to.equal('Toggle Item after');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggleIconAfter.icon.isVisible()).to.be.true();
		});

		it('should display icon after the text', function () {
			Page.open();
			expect(toggleIconAfter.isAfter).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				toggleIconAfter.focus();
				Page.spotlightSelect();
				expectUnselected(toggleIconAfter);
			});

			it('should select item and display the icon on spotlightSelect', function () {
				Page.open();
				toggleIconAfter.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleIconAfter);
			});
		});

		describe('pointer', function () {
			it('should unselect item and hide the icon on click', function () {
				Page.open();
				toggleIconAfter.item.click();
				expectUnselected(toggleIconAfter);
			});

			it('should select item and display the icon on click', function () {
				Page.open();
				toggleIconAfter.item.click();
				toggleIconAfter.item.click();
				expectSelected(toggleIconAfter);
			});
		});
	});

	describe('inline', function () {
		it('should have correct text', function () {
			Page.open();
			expect(toggleInline.valueText).to.equal('Toggle Item inline');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggleInline.icon.isVisible()).to.be.true();
		});

		it('should display icon before the text', function () {
			Page.open();
			expect(toggleInline.isBefore).to.be.true();
		});

		it('should display item inline', function () {
			Page.open();
			expect(toggleInline.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				toggleInline.focus();
				Page.spotlightSelect();
				expectUnselected(toggleInline);
			});

			it('should select item and display the icon on spotlightSelect', function () {
				Page.open();
				toggleInline.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleInline);
			});
		});

		describe('pointer', function () {
			it('should unselect item and hide the icon on click', function () {
				Page.open();
				toggleInline.item.click();
				expectUnselected(toggleInline);
			});

			it('should select item and display the icon on click', function () {
				Page.open();
				toggleInline.item.click();
				toggleInline.item.click();
				expectSelected(toggleInline);
			});
		});
	});

	describe('inline after', function () {
		it('should have correct text', function () {
			Page.open();
			expect(toggleInlineAfter.valueText).to.equal('Toggle Item inline after');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggleInlineAfter.icon.isVisible()).to.be.true();
		});

		it('should display icon after the text', function () {
			Page.open();
			expect(toggleInlineAfter.isAfter).to.be.true();
		});

		it('should display item inline', function () {
			Page.open();
			expect(toggleInlineAfter.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				toggleInlineAfter.focus();
				Page.spotlightSelect();
				expectUnselected(toggleInlineAfter);
			});

			it('should select item and display the icon on spotlightSelect', function () {
				Page.open();
				toggleInlineAfter.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(toggleInlineAfter);
			});
		});

		describe('pointer', function () {
			it('should unselect item and hide the icon on click', function () {
				Page.open();
				toggleInlineAfter.item.click();
				expectUnselected(toggleInlineAfter);
			});

			it('should select item and display the icon on click', function () {
				Page.open();
				toggleInlineAfter.item.click();
				toggleInlineAfter.item.click();
				expectSelected(toggleInlineAfter);
			});
		});
	});

	describe('disabled', function () {
		it('should have correct text', function () {
			Page.open();
			expect(toggledisabled.valueText).to.equal('Toggle Item disabled');
		});

		it('should display icon', function () {
			Page.open();
			expect(toggledisabled.icon.isVisible()).to.be.true();
		});

		it('should display icon before the text', function () {
			Page.open();
			expect(toggledisabled.isBefore).to.be.true();
		});

		describe('5-way', function () {
			it('should not unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				toggledisabled.focus();
				Page.spotlightSelect();
				expectSelected(toggledisabled);
			});
		});

		describe('pointer', function () {
			it('should not unselect item and hide the icon on click', function () {
				Page.open();
				toggledisabled.item.click();
				expectSelected(toggledisabled);
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

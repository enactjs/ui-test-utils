let Page = require('./ToggleItemPage');

describe('ToggleItem', function () {

	it('should have focus on first item at start', function () {
		Page.open();
		expect(Page.tsoggleItem1.item.hasFocus()).to.be.true();
	});

	it('should have correct text', function () {
		Page.open();
		expect(Page.toggleItem1.valueText).to.equal('Toggle Item1');
	});

	it('should not display icon', function () {
		Page.open();
		expect(Page.toggleItem1.icon.isVisible()).to.be.false();
	});

	it('should display icon before the text', function () {
		Page.open();
		expect(Page.toggleItem1.isBefore).to.be.true();
	});

	describe('5-way', function () {
		it('should select item and display the icon on spotlightSelect', function () {
			Page.open();
			Page.spotlightSelect();
			expect(Page.toggleItem1.isSelected).to.be.true();
			expect(Page.toggleItem1.icon.isVisible()).to.be.true();
		});

		it('should unselect item and hide the icon on spotlightSelect', function () {
			Page.open();
			Page.spotlightSelect();
			Page.spotlightSelect();
			expect(Page.toggleItem1.isSelected).to.be.false();
			expect(Page.toggleItem1.icon.isVisible()).to.be.false();
		});

		it('should display correct icon on spotlightSelect', function () {
			Page.open();
			Page.spotlightSelect();
			expect(Page.toggleItem1.iconSymbol).to.equal('󰀭');
		});

		it('should move focus down on SpotlightDown', function () {
			Page.open();
			Page.spotlightDown();
			expect(Page.toggleItem2.item.hasFocus()).to.be.true();
		});

		it('should move focus up on SpotlightUp', function () {
			Page.open();
			Page.toggleItem2.focus();
			Page.spotlightUp();
			expect(Page.toggleItem1.item.hasFocus()).to.be.true();
		});
	});

	describe('pointer', function () {
		it('should select item and display the icon on click', function () {
			Page.open();
			Page.toggleItem1.item.click();
			expect(Page.toggleItem1.isSelected).to.be.true();
			expect(Page.toggleItem1.icon.isVisible()).to.be.true();
		});

		it('should unselect item and hide the icon on click', function () {
			Page.open();
			Page.toggleItem1.item.click();
			Page.toggleItem1.item.click();
			expect(Page.toggleItem1.isSelected).to.be.false();
			expect(Page.toggleItem1.icon.isVisible()).to.be.false();
		});

		it('should display correct icon on click', function () {
			Page.open();
			Page.toggleItem1.item.click();
			expect(Page.toggleItem1.iconSymbol).to.equal('󰀭');
		});
	});

	describe('default selected', function () {
		it('should have correct text', function () {
			Page.open();
			expect(Page.toggleItem2.valueText).to.equal('Toggle Item selected');
		});

		it('should display icon', function () {
			Page.open();
			expect(Page.toggleItem2.icon.isVisible()).to.be.true();
		});

		it('should display correct icon', function () {
			Page.open();
			expect(Page.toggleItem2.iconSymbol).to.equal('󯿶');
		});

		describe('5-way', function () {
			it('should unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				Page.toggleItem2.focus();
				Page.spotlightSelect();
				expect(Page.toggleItem2.isSelected).to.be.false();
				expect(Page.toggleItem2.icon.isVisible()).to.be.false();
			});

			it('should select item and display the icon on spotlightSelect', function () {
				Page.open();
				Page.toggleItem2.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(Page.toggleItem2.isSelected).to.be.true();
				expect(Page.toggleItem2.icon.isVisible()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect item and hide the icon on click', function () {
				Page.open();
				Page.toggleItem2.item.click();
				expect(Page.toggleItem2.isSelected).to.be.false();
				expect(Page.toggleItem2.icon.isVisible()).to.be.false();
			});

			it('should select item and display the icon on click', function () {
				Page.open();
				Page.toggleItem2.item.click();
				Page.toggleItem2.item.click();
				expect(Page.toggleItem2.isSelected).to.be.true();
				expect(Page.toggleItem2.icon.isVisible()).to.be.true();
			});
		});
	});

	describe('iconPosition after', function () {
		it('should have correct text', function () {
			Page.open();
			expect(Page.toggleItem3.valueText).to.equal('Toggle Item after');
		});

		it('should display icon', function () {
			Page.open();
			expect(Page.toggleItem3.icon.isVisible()).to.be.true();
		});

		it('should display icon after the text', function () {
			Page.open();
			expect(Page.toggleItem3.isAfter).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				Page.toggleItem3.focus();
				Page.spotlightSelect();
				expect(Page.toggleItem3.isSelected).to.be.false();
				expect(Page.toggleItem3.icon.isVisible()).to.be.false();
			});

			it('should select item and display the icon on spotlightSelect', function () {
				Page.open();
				Page.toggleItem3.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(Page.toggleItem3.isSelected).to.be.true();
				expect(Page.toggleItem3.icon.isVisible()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect item and hide the icon on click', function () {
				Page.open();
				Page.toggleItem3.item.click();
				expect(Page.toggleItem3.isSelected).to.be.false();
				expect(Page.toggleItem3.icon.isVisible()).to.be.false();
			});

			it('should select item and display the icon on click', function () {
				Page.open();
				Page.toggleItem3.item.click();
				Page.toggleItem3.item.click();
				expect(Page.toggleItem3.isSelected).to.be.true();
				expect(Page.toggleItem3.icon.isVisible()).to.be.true();
			});
		});
	});

	describe('inline', function () {
		it('should have correct text', function () {
			Page.open();
			expect(Page.toggleItem4.valueText).to.equal('Toggle Item inline');
		});

		it('should display icon', function () {
			Page.open();
			expect(Page.toggleItem4.icon.isVisible()).to.be.true();
		});

		it('should display icon before the text', function () {
			Page.open();
			expect(Page.toggleItem4.isBefore).to.be.true();
		});

		it('should display item inline', function () {
			Page.open();
			expect(Page.toggleItem4.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				Page.toggleItem4.focus();
				Page.spotlightSelect();
				expect(Page.toggleItem4.isSelected).to.be.false();
				expect(Page.toggleItem4.icon.isVisible()).to.be.false();
			});

			it('should select item and display the icon on spotlightSelect', function () {
				Page.open();
				Page.toggleItem4.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(Page.toggleItem4.isSelected).to.be.true();
				expect(Page.toggleItem4.icon.isVisible()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect item and hide the icon on click', function () {
				Page.open();
				Page.toggleItem4.item.click();
				expect(Page.toggleItem4.isSelected).to.be.false();
				expect(Page.toggleItem4.icon.isVisible()).to.be.false();
			});

			it('should select item and display the icon on click', function () {
				Page.open();
				Page.toggleItem4.item.click();
				Page.toggleItem4.item.click();
				expect(Page.toggleItem4.isSelected).to.be.true();
				expect(Page.toggleItem4.icon.isVisible()).to.be.true();
			});
		});
	});

	describe('inline after', function () {
		it('should have correct text', function () {
			Page.open();
			expect(Page.toggleItem5.valueText).to.equal('Toggle Item inline after');
		});

		it('should display icon', function () {
			Page.open();
			expect(Page.toggleItem5.icon.isVisible()).to.be.true();
		});

		it('should display icon after the text', function () {
			Page.open();
			expect(Page.toggleItem5.isAfter).to.be.true();
		});

		it('should display item inline', function () {
			Page.open();
			expect(Page.toggleItem5.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				Page.toggleItem5.focus();
				Page.spotlightSelect();
				expect(Page.toggleItem5.isSelected).to.be.false();
				expect(Page.toggleItem5.icon.isVisible()).to.be.false();
			});

			it('should select item and display the icon on spotlightSelect', function () {
				Page.open();
				Page.toggleItem5.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(Page.toggleItem5.isSelected).to.be.true();
				expect(Page.toggleItem5.icon.isVisible()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect item and hide the icon on click', function () {
				Page.open();
				Page.toggleItem5.item.click();
				expect(Page.toggleItem5.isSelected).to.be.false();
				expect(Page.toggleItem5.icon.isVisible()).to.be.false();
			});

			it('should select item and display the icon on click', function () {
				Page.open();
				Page.toggleItem5.item.click();
				Page.toggleItem5.item.click();
				expect(Page.toggleItem5.isSelected).to.be.true();
				expect(Page.toggleItem5.icon.isVisible()).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		it('should have correct text', function () {
			Page.open();
			expect(Page.toggleItem6.valueText).to.equal('Toggle Item disabled');
		});

		it('should display icon', function () {
			Page.open();
			expect(Page.toggleItem6.icon.isVisible()).to.be.true();
		});

		it('should display icon before the text', function () {
			Page.open();
			expect(Page.toggleItem6.isBefore).to.be.true();
		});

		describe('5-way', function () {
			it('should not unselect item and hide the icon on spotlightSelect', function () {
				Page.open();
				Page.toggleItem6.focus();
				Page.spotlightSelect();
				expect(Page.toggleItem6.isSelected).to.be.true();
				expect(Page.toggleItem6.icon.isVisible()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect item and hide the icon on click', function () {
				Page.open();
				Page.toggleItem6.item.click();
				expect(Page.toggleItem6.isSelected).to.be.true();
				expect(Page.toggleItem6.icon.isVisible()).to.be.true();
			});
		});
	});
});

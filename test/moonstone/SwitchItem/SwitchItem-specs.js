const Page = require('./SwitchItemPage'),
	{expectSelected, expectUnselected} = require('./SwitchItem-utils.js');

describe('SwitchItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.switchDefault.item.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const switchItem = Page.components.switchDefault;

		it('should have correct text', function () {
			expect(switchItem.valueText).to.equal('Switch Item1');
		});

		it('should not be checked', function () {
			expectUnselected(switchItem);
		});

		describe('5-way', function () {
			it('should check the item when selected', function () {
				Page.spotlightSelect();
				expectSelected(switchItem);
			});

			it('should re-uncheck the item when selected twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectUnselected(switchItem);
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(Page.components.switchDefaultSelected.item.hasFocus()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.switchDefaultSelected.focus();
				Page.spotlightUp();
				expect(switchItem.item.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should check the item when clicked', function () {
				switchItem.item.click();
				expectSelected(switchItem);
			});

			it('should re-uncheck the item when clicked twice', function () {
				switchItem.item.click();
				switchItem.item.click();
				expectUnselected(switchItem);
			});
		});
	});

	describe('default selected', function () {
		const switchItem = Page.components.switchDefaultSelected;

		it('should have correct text', function () {
			expect(switchItem.valueText).to.equal('Switch Item selected');
		});

		it('should be checked', function () {
			expectSelected(switchItem);
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				switchItem.focus();
				Page.spotlightSelect();
				expectUnselected(switchItem);
			});

			it('should re-check the item when selected twice', function () {
				switchItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(switchItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				switchItem.item.click();
				expectUnselected(switchItem);
			});

			it('should re-check the item when clicked twice', function () {
				switchItem.item.click();
				switchItem.item.click();
				expectSelected(switchItem);
			});
		});
	});

	describe('inline', function () {
		const switchItem = Page.components.switchInline;

		it('should have correct text', function () {
			expect(switchItem.valueText).to.equal('Switch Item inline');
		});

		it('should be checked', function () {
			expectSelected(switchItem);
		});

		it('should display item inline', function () {
			expect(switchItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should uncheck the item when selected', function () {
				switchItem.focus();
				Page.spotlightSelect();
				expectUnselected(switchItem);
			});

			it('should re-check the item when selected twice', function () {
				switchItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(switchItem);
			});
		});

		describe('pointer', function () {
			it('should uncheck the item when clicked', function () {
				switchItem.item.click();
				expectUnselected(switchItem);
			});

			it('should re-check the item when clicked twice', function () {
				switchItem.item.click();
				switchItem.item.click();
				expectSelected(switchItem);
			});
		});
	});

	describe('disabled', function () {
		const switchItem = Page.components.switchDisabled;

		it('should have correct text', function () {
			expect(switchItem.valueText).to.equal('Switch Item disabled');
		});

		it('should be checked', function () {
			expectSelected(switchItem);
		});

		it('should not focus the item', function () {
			switchItem.focus();
			expect(switchItem.item.hasFocus()).to.be.false();
		});

		describe('5-way', function () {
			it('should not uncheck the item when selected', function () {
				switchItem.focus();
				Page.spotlightSelect();
				expectSelected(switchItem);
			});
		});

		describe('pointer', function () {
			it('should not uncheck the item when clicked', function () {
				switchItem.item.click();
				expectSelected(switchItem);
			});
		});
	});
});

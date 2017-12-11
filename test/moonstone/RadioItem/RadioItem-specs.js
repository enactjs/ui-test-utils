const Page = require('./RadioItemPage'),
	{expectSelected, expectUnselected} = require('./RadioItem-utils.js');

describe('RadioItem', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.radioDefault.item.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const radioItem = Page.components.radioDefault;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item1');
		});

		it('should not be selected', function () {
			expectUnselected(radioItem);
		});

		describe('5-way', function () {
			it('should select the item when selected', function () {
				Page.spotlightSelect();
				expectSelected(radioItem);
			});

			it('should re-unselect the item when selected twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectUnselected(radioItem);
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(Page.components.radioDefaultSelected.item.hasFocus()).to.be.true();
			});

			it('should move focus up on SpotlightUp', function () {
				Page.components.radioDefaultSelected.focus();
				Page.spotlightUp();
				expect(radioItem.item.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should select the item when clicked', function () {
				radioItem.item.click();
				expectSelected(radioItem);
			});

			it('should re-unselect the item when clicked twice', function () {
				radioItem.item.click();
				radioItem.item.click();
				expectUnselected(radioItem);
			});
		});
	});

	describe('default selected', function () {
		const radioItem = Page.components.radioDefaultSelected;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item selected');
		});

		it('should be selected', function () {
			expectSelected(radioItem);
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				radioItem.focus();
				Page.spotlightSelect();
				expectUnselected(radioItem);
			});

			it('should re-select the item when selected twice', function () {
				radioItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(radioItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				radioItem.item.click();
				expectUnselected(radioItem);
			});

			it('should re-select the item when clicked twice', function () {
				radioItem.item.click();
				radioItem.item.click();
				expectSelected(radioItem);
			});
		});
	});

	describe('inline', function () {
		const radioItem = Page.components.radioInline;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item inline');
		});

		it('should be selected', function () {
			expectSelected(radioItem);
		});

		it('should display item inline', function () {
			expect(radioItem.isInline).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the item when selected', function () {
				radioItem.focus();
				Page.spotlightSelect();
				expectUnselected(radioItem);
			});

			it('should re-select the item when selected twice', function () {
				radioItem.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectSelected(radioItem);
			});
		});

		describe('pointer', function () {
			it('should unselect the item when clicked', function () {
				radioItem.item.click();
				expectUnselected(radioItem);
			});

			it('should re-select the item when clicked twice', function () {
				radioItem.item.click();
				radioItem.item.click();
				expectSelected(radioItem);
			});
		});
	});

	describe('disabled', function () {
		const radioItem = Page.components.radioDisabled;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item disabled');
		});

		it('should be selected', function () {
			expectSelected(radioItem);
		});

		it('should not focus the item', function () {
			radioItem.focus();
			expect(radioItem.item.hasFocus()).to.be.false();
		});

		describe('5-way', function () {
			it('should not unselect the item when selected', function () {
				radioItem.focus();
				Page.spotlightSelect();
				expectSelected(radioItem);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				radioItem.item.click();
				expectSelected(radioItem);
			});
		});
	});

	describe('inline disabled', function () {
		const radioItem = Page.components.radioInlineDisabled;

		it('should have correct text', function () {
			expect(radioItem.valueText).to.equal('Radio Item inline disabled');
		});

		it('should be selected', function () {
			expectSelected(radioItem);
		});

		it('should display item inline', function () {
			expect(radioItem.isInline).to.be.true();
		});

		it('should not focus the item', function () {
			radioItem.focus();
			expect(radioItem.item.hasFocus()).to.be.false();
		});

		describe('5-way', function () {
			it('should not unselect the item when selected', function () {
				radioItem.focus();
				Page.spotlightSelect();
				expectSelected(radioItem);
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
				radioItem.item.click();
				expectSelected(radioItem);
			});
		});
	});
});

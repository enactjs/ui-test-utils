const Page = require('./ToggleButtonPage');

describe('ToggleButton', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first item at start', function () {
		expect(Page.components.toggleDefault.self.hasFocus()).to.be.true();
	});

	// Note, the 5-way up/down tests require the next component to be known.  If you add components
	// before or after this test, please update the links
	describe('default', function () {
		const toggleButton = Page.components.toggleDefault;
		const nextButton = Page.components.toggleWithLabels;

		it('should have correct text', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('MISSING TOGGLE LABEL'.toLowerCase());
		});

		it('should be unselected', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the button when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should deselect the button when selected and deselected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should move focus down on SpotlightDown', function () {
				Page.spotlightDown();
				expect(nextButton.self.hasFocus()).to.be.true();
			});

			it('should move focus Up on SpotlightUp', function () {
				nextButton.focus();
				Page.spotlightUp();
				expect(toggleButton.self.hasFocus()).to.be.true();
			});

		});

		describe('pointer', function () {
			it('should select the toggleButton when clicked', function () {
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should re-unselect the item when clicked twice', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.false();
			});
		});
	});
	// Note, the 5-way up/down tests above require the next component to be known.  If you add
	// components before or after this test, please update the links

	describe('labelled', function () {
		const toggleButton = Page.components.toggleWithLabels;

		it('should have correct text', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('OFF'.toLowerCase());
		});

		it('should be unselected', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should have correct text when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('ON'.toLowerCase());
			});

			it('should have correct text when un-selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('OFF'.toLowerCase());
			});
		});

		describe('pointer', function () {
			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('ON'.toLowerCase());
			});

			it('should have correct text when un-selected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('OFF'.toLowerCase());
			});
		});
	});

	describe('missed off label', function () {
		const toggleButton = Page.components.toggleWithOnlyOnLabel;

		it('should have correct text', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('MISSING TOGGLE OFF LABEL'.toLowerCase());
		});

		it('should be unselected', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should have correct text when selected - [GT-21950]', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('ON'.toLowerCase());
			});

			it('should have correct text when un-selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('MISSING TOGGLE OFF LABEL'.toLowerCase());
			});
		});

		describe('pointer', function () {
			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('ON'.toLowerCase());
			});

			it('should have correct text when un-selected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('MISSING TOGGLE OFF LABEL'.toLowerCase());
			});
		});
	});

	describe('missed on label', function () {
		const toggleButton = Page.components.toggleWithOnlyOffLabel;

		it('should have correct text - [GT-21951]', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('OFF'.toLowerCase());
		});

		it('should be unselected', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should have correct text when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('MISSING TOGGLE ON LABEL'.toLowerCase());
			});

			it('should have correct text when un-selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('OFF'.toLowerCase());
			});
		});

		describe('pointer', function () {
			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('MISSING TOGGLE ON LABEL'.toLowerCase());
			});

			it('should have correct text when un-selected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('OFF'.toLowerCase());
			});
		});
	});

	describe('default selected', function () {
		const toggleButton = Page.components.toggleDefaultSelected;

		it('should have correct text', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('ON'.toLowerCase());
		});

		it('should be selected by default', function () {
			expect(toggleButton.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should unselect the toggleButton when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should re-select the toggleButton when selected twice', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should unselect the toggleButton when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should re-select the toggleButton when selected twice', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.true();
			});
		});
	});

	// Note, the disabled test requires the previous and next component to be known for 5-way
	// navigation.  If you add components before or after this test, please update the links
	describe('disabled', function () {
		const toggleButton = Page.components.toggleDisabled;
		const previousToggle = Page.components.toggleDefaultSelected;

		it('should have correct text', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('ON'.toLowerCase());
		});

		it('should be selected by default', function () {
			expect(toggleButton.isSelected).to.be.true();
		});

		describe('5-way', function () {
			it('should be able to focus the toggleButton', function () {
				previousToggle.focus();
				Page.spotlightDown();
				expect(toggleButton.self.hasFocus()).to.be.true();
			});
			it('should not unselect the item when selected - [GT-21952]', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked - [GT-21952]', function () {
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.true();
			});
		});
	});
	// Note, the disabled test above requires the previous and next component to be known for 5-way
	// navigation.  If you add components before or after this test, please update the links

	describe('small', function () {
		const toggleButton = Page.components.toggleSmall;

		it('should have correct text', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('SMALL OFF'.toLowerCase());
		});

		it('should be unselected by default', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		it('should be small sized - [GT-22374]', function () {
			expect(toggleButton.isSmall).to.be.true();
		});

		describe('5-way', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.false();
			});
		});

		describe('pointer', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.false();
			});
		});
	});

	describe('casing preserve', function () {
		const toggleButton = Page.components.toggleCasePreserve;

		it('should have correct text - [GT-21947]', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('toggle off'.toLowerCase());
		});

		it('should be unselected by default', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should have correct text when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('toggle on'.toLowerCase());
			});

			it('should have correct text when unselected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('toggle off'.toLowerCase());
			});
		});

		describe('pointer', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('toggle on'.toLowerCase());
			});

			it('should have correct text when unselected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('toggle off'.toLowerCase());
			});
		});
	});

	describe('casing sentence', function () {
		const toggleButton = Page.components.toggleCaseSentence;

		it('should have correct text', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle off'.toLowerCase());
		});

		it('should be unselected by default', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should have correct text when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle on'.toLowerCase());
			});

			it('should have correct text when unselected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle off'.toLowerCase());
			});

		});

		describe('pointer', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle on'.toLowerCase());
			});

			it('should have correct text when unselected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle off'.toLowerCase());
			});
		});
	});

	describe('casing word', function () {
		const toggleButton = Page.components.toggleCaseWord;

		it('should have correct text', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle Off'.toLowerCase());
		});

		it('should be unselected by default', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should have correct text when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle On'.toLowerCase());
			});

			it('should have correct text when unselected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle Off'.toLowerCase());
			});

		});

		describe('pointer', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle On'.toLowerCase());
			});

			it('should have correct text when unselected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('Toggle Off'.toLowerCase());
			});
		});
	});

	describe('casing upper', function () {
		const toggleButton = Page.components.toggleCaseUpper;

		it('should have correct text', function () {
			expect(toggleButton.valueText.toLowerCase()).to.equal('TOGGLE OFF'.toLowerCase());
		});

		it('should be unselected by default', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should have correct text when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('TOGGLE ON'.toLowerCase());
			});

			it('should have correct text when unselected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText.toLowerCase()).to.equal('TOGGLE OFF'.toLowerCase());
			});

		});

		describe('pointer', function () {
			it('should select the toggleButton when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.true();
			});

			it('should un-select the toggleButton when selected twice', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.isSelected).to.be.false();
			});

			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('TOGGLE ON'.toLowerCase());
			});

			it('should have correct text when unselected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText.toLowerCase()).to.equal('TOGGLE OFF'.toLowerCase());
			});
		});
	});
});

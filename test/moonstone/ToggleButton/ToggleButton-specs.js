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
			expect(toggleButton.valueText).to.equal('MISSING TOGGLE LABEL');
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
			expect(toggleButton.valueText).to.equal('OFF');
		});

		it('should be unselected', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should have correct text when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('ON');
			});

			it('should have correct text when un-selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('OFF');
			});
		});

		describe('pointer', function () {
			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('ON');
			});

			it('should have correct text when un-selected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('OFF');
			});
		});
	});

	describe('missed off label', function () {
		const toggleButton = Page.components.toggleWithOnlyOnLabel;

		it('should have correct text', function () {
			expect(toggleButton.valueText).to.equal('MISSING TOGGLE OFF LABEL');
		});

		it('should be unselected', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should have correct text when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('ON');
			});

			it('should have correct text when un-selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('MISSING TOGGLE OFF LABEL');
			});
		});

		describe('pointer', function () {
			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('ON');
			});

			it('should have correct text when un-selected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('MISSING TOGGLE OFF LABEL');
			});
		});
	});

	describe('missed on label', function () {
		const toggleButton = Page.components.toggleWithOnlyOffLabel;

		it('should have correct text', function () {
			expect(toggleButton.valueText).to.equal('OFF');
		});

		it('should be unselected', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		describe('5-way', function () {
			it('should have correct text when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('MISSING TOGGLE ON LABEL');
			});

			it('should have correct text when un-selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('OFF');
			});
		});

		describe('pointer', function () {
			it('should have correct text when selected', function () {
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('MISSING TOGGLE ON LABEL');
			});

			it('should have correct text when un-selected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('OFF');
			});
		});
	});

	describe('default selected', function () {
		const toggleButton = Page.components.toggleDefaultSelected;

		it('should have correct text', function () {
			expect(toggleButton.valueText).to.equal('ON');
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
		const nextToggle = Page.components.toggleSmall;

		it('should have correct text', function () {
			expect(toggleButton.valueText).to.equal('ON');
		});

		it('should be selected by default', function () {
			expect(toggleButton.isSelected).to.be.true();
		});

		it('should not focus the toggleButton', function () {
			previousToggle.focus();
			Page.spotlightDown();
			expect(nextToggle.self.hasFocus()).to.be.true();
		});

		describe('5-way', function () {
			it('should not unselect the item when selected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				expect(toggleButton.isSelected).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should not unselect the item when clicked', function () {
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
			expect(toggleButton.valueText).to.equal('SMALL OFF');
		});

		it('should be unselected by default', function () {
			expect(toggleButton.isSelected).to.be.false();
		});

		it('should be small sized', function () {
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
	})

	describe('casing preserve', function () {
		const toggleButton = Page.components.toggleCasePreserve;

		it('should have correct text', function () {
			expect(toggleButton.valueText).to.equal('toggle off');
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
				expect(toggleButton.valueText).to.equal('toggle on');
			});

			it('should have correct text when unselected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('toggle off');
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
				expect(toggleButton.valueText).to.equal('toggle on');
			});

			it('should have correct text when unselected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('toggle off');
			});
		});
	});

	describe('casing sentence', function () {
		const toggleButton = Page.components.toggleCaseSentence;

		it('should have correct text', function () {
			expect(toggleButton.valueText).to.equal('Toggle off');
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
				expect(toggleButton.valueText).to.equal('Toggle on');
			});

			it('should have correct text when unselected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('Toggle off');
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
				expect(toggleButton.valueText).to.equal('Toggle on');
			});

			it('should have correct text when unselected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('Toggle off');
			});
		});
	});

	describe('casing word', function () {
		const toggleButton = Page.components.toggleCaseWord;

		it('should have correct text', function () {
			expect(toggleButton.valueText).to.equal('Toggle Off');
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
				expect(toggleButton.valueText).to.equal('Toggle On');
			});

			it('should have correct text when unselected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('Toggle Off');
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
				expect(toggleButton.valueText).to.equal('Toggle On');
			});

			it('should have correct text when unselected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('Toggle Off');
			});
		});
	});

	describe('casing upper', function () {
		const toggleButton = Page.components.toggleCaseUpper;

		it('should have correct text', function () {
			expect(toggleButton.valueText).to.equal('TOGGLE OFF');
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
				expect(toggleButton.valueText).to.equal('TOGGLE ON');
			});

			it('should have correct text when unselected', function () {
				toggleButton.focus();
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(toggleButton.valueText).to.equal('TOGGLE OFF');
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
				expect(toggleButton.valueText).to.equal('TOGGLE ON');
			});

			it('should have correct text when unselected', function () {
				toggleButton.self.click();
				toggleButton.self.click();
				expect(toggleButton.valueText).to.equal('TOGGLE OFF');
			});
		});
	});
});

const Page = require('./ExpandableInputPage'),
	{validateTitle, expectClosed, expectOpen} = require('./ExpandableInput-utils.js');

describe('ExpandableInput', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first expandable at start', function () {
		expect(Page.components.default.title.hasFocus()).to.be.true();
	});

	describe('default', function () {
		const expandable = Page.components.default;

		validateTitle(expandable, 'ExpandableInput Default');

		it('should have correct none text', function () {
			expect(expandable.labelText).to.equal('No Input Text');
		});

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot input on select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.hasFocus()).to.be.true();
			});

			it('should have correct input value', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.getValue()).to.equal('');
			});

			it('should close when moving up to title', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable);
				Page.spotlightUp();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should close and move focus down on SpotlightDown', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable);
				Page.spotlightDown();
				expectClosed(expandable);
				expect(Page.components.defaultValue.title.hasFocus()).to.be.true();
			});

			it('should close on select twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectClosed(expandable);
			});

			it('should close on escape', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable);
				Page.escape();
				expectClosed(expandable);
			});

			describe('input value', function () {
				it('should update value text on input and then closed by moving up to title', function () {
					Page.spotlightSelect();
					browser.pause(250);
					expectOpen(expandable);
					expandable.input.setValue('New Value');
					Page.spotlightUp();
					browser.pause(250);
					expectClosed(expandable);
					expect(expandable.labelText).to.equal('New Value');
				});

				it('should update value text on input and then closed by SpotlightDown', function () {
					Page.spotlightSelect();
					browser.pause(250);
					expectOpen(expandable);
					expandable.input.setValue('New Value');
					Page.spotlightDown();
					browser.pause(250);
					expectClosed(expandable);
					expect(expandable.labelText).to.equal('New Value');
				});

				it('should not update value text on input and then closed by escape key', function () {
					Page.spotlightSelect();
					browser.pause(250);
					expectOpen(expandable);
					expandable.input.setValue('New Value');
					Page.escape();
					expectClosed(expandable);
					expect(expandable.labelText).to.equal('No Input Text');
				});
			});
		});

		describe('pointer', function () {
			it('should open and focus input on title click when closed', function () {
				expandable.title.click();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.hasFocus()).to.be.true();
			});

			it('should close on title click when open', function () {
				expandable.title.click();
				browser.pause(250);
				expectOpen(expandable);
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
			});

			it('should not close on input click', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.input.click();
				expectOpen(expandable);
			});

			it('should close on two title clicks', function () {
				expandable.title.click();
				expandable.title.click();
				expectClosed(expandable);
			});

			it('should retain the focus on input when hovered on other expandable', function () {
				expandable.title.click();
				browser.pause(250);
				expectOpen(expandable);
				Page.hover();
				expect(expandable.input.hasFocus()).to.be.true();
			});

			describe('input value', function () {
				it('should update value text on input and then closed by title click', function () {
					expandable.title.click();
					browser.pause(250);
					expectOpen(expandable);
					expandable.input.setValue('New Value');
					expandable.title.click();
					browser.pause(250);
					expectClosed(expandable);
					expect(expandable.labelText).to.equal('New Value');
				});
			});
		});
	});

	describe('default value', function () {
		const expandable = Page.components.defaultValue;

		validateTitle(expandable, 'ExpandableInput Default Value');

		it('should have correct value text', function () {
			expect(expandable.labelText).to.equal('Default Value');
		});

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {

			beforeEach(function () {
				expandable.focus();
			});

			it('should open and spot input on select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.hasFocus()).to.be.true();
			});

			it('should have correct input value', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.getValue()).to.equal('Default Value');
			});

			it('should close when moving up to title', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable);
				Page.spotlightUp();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should close on select twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectClosed(expandable);
			});
		});

		describe('pointer', function () {
			it('should open and focus input on title click when closed', function () {
				expandable.title.click();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.hasFocus()).to.be.true();
			});

			it('should close on title click when open', function () {
				expandable.title.click();
				browser.pause(250);
				expectOpen(expandable)
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
			});

			it('should not close on input click', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.input.click();
				expectOpen(expandable);
			});

			it('should close on two title clicks', function () {
				expandable.title.click();
				expandable.title.click();
				expectClosed(expandable);
			});
		});
	});

	describe('default open', function () {
		const expandable = Page.components.defaultOpen;

		validateTitle(expandable, 'ExpandableInput Default Open');

		it('should be initially open', function () {
			expectOpen(expandable);
		});

		it('should have correct input value', function () {
			expect(expandable.input.getValue()).to.equal('');
		});

		describe('5-way', function () {

			beforeEach(function () {
				expandable.focus();
			});

			it('should close on select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should focus input on spotlightDown', function () {
				Page.spotlightDown();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.hasFocus()).to.be.true();
			});

			it('should open on select twice', function () {
				Page.spotlightSelect();
				Page.spotlightSelect();
				expectOpen(expandable);
			});
		});

		describe('pointer', function () {
			it('should close on title click', function () {
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
			});

			it('should open on title click when closed', function () {
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
				expandable.title.click();
				browser.pause(250);
				expectOpen(expandable)
			});

			it('should open on two title clicks', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.title.click();
				expectOpen(expandable);
			});
		});
	});

	describe('password type', function () {
		const expandable = Page.components.password;

		validateTitle(expandable, 'ExpandableInput Password');

		it('should not have value text', function () {
			expect(expandable.isLabelExists).to.be.false();
		});

		describe('5-way', function () {
			it('should not have value text on open and close', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable)
				Page.spotlightUp();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.isLabelExists).to.be.false();
			});

		});

		describe('pointer', function () {
			it('should not have value text on open and close', function () {
				expandable.title.click();
				browser.pause(250);
				expectOpen(expandable)
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.isLabelExists).to.be.false();
			});
		});
	});

	describe('placeholder', function () {
		const expandable = Page.components.placeholder;

		validateTitle(expandable, 'ExpandableInput Placeholder');

		it('should be initially open', function () {
			expectOpen(expandable);
		});

		it('should have correct input placeholder', function () {
			expect(expandable.placeHolder).to.equal('Placeholder');
		});

		describe('5-way', function () {

			beforeEach(function () {
				expandable.focus();
			});

			it('should close on select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should focus input on spotlightDown', function () {
				Page.spotlightDown();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click', function () {
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
			});
		});
	});

	describe('icon before', function () {
		const expandable = Page.components.iconBefore;

		validateTitle(expandable, 'ExpandableInput Icon Before');

		it('should be initially open', function () {
			expectOpen(expandable);
		});

		it('should have icon before the input', function () {
			expect(expandable.isIconBefore).to.be.true();
		});

		it('should display correct icon', function () {
			expect(expandable.iconBeforeSymbol).to.equal('-');
		});

		describe('5-way', function () {

			beforeEach(function () {
				expandable.focus();
			});

			it('should close on select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should focus input on spotlightDown', function () {
				Page.spotlightDown();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click', function () {
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
			});
		});
	});

	describe('icon after', function () {
		const expandable = Page.components.iconAfter;

		validateTitle(expandable, 'ExpandableInput Icon After');

		it('should be initially open', function () {
			expectOpen(expandable);
		});

		it('should have icon after the input', function () {
			expect(expandable.isIconAfter).to.be.true();
		});

		it('should display correct icon', function () {
			expect(expandable.iconAfterSymbol).to.equal('+');
		});

		describe('5-way', function () {

			beforeEach(function () {
				expandable.focus();
			});

			it('should close on select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should focus input on spotlightDown', function () {
				Page.spotlightDown();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click', function () {
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
			});
		});
	});

	describe('icon before and after', function () {
		const expandable = Page.components.iconBeforeAfter;

		validateTitle(expandable, 'ExpandableInput Icon Before and After');

		it('should be initially open', function () {
			expectOpen(expandable);
		});

		it('should have icon before and after the input', function () {
			expect(expandable.isIconBefore).to.be.true();
			expect(expandable.isIconAfter).to.be.true();
		});

		it('should display correct before icon', function () {
			expect(expandable.iconBeforeSymbol).to.equal('-');
		});

		it('should display correct after icon', function () {
			expect(expandable.iconAfterSymbol).to.equal('+');
		});

		describe('5-way', function () {

			beforeEach(function () {
				expandable.focus();
			});

			it('should close on select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should focus input on spotlightDown', function () {
				Page.spotlightDown();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.input.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click', function () {
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
			});
		});
	});

	describe('disabled', function () {
		const expandable = Page.components.disabled;

		validateTitle(expandable, 'ExpandableInput Disabled');

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should not be spottable', function () {
				Page.components.defaultOpen.focus();
				Page.spotlightDown();
				expect(expandable.title.hasFocus()).to.be.false();
			});
		});

		describe('pointer', function () {
			it('should stay closed on title click', function () {
				expandable.title.click();
				browser.pause(250);
				expectClosed(expandable);
			});
		});
	});

	describe('general 5-way navigation', function () {
		it('should not stop 5-way down when closed', function () {
			Page.spotlightDown();
			expect(Page.components.defaultValue.title.hasFocus()).to.be.true();
		});
	});

	describe('general pointer operation', function () {
		it('should close other expandable when opening', function () {
			Page.components.default.title.click();
			browser.pause(250);
			Page.components.defaultValue.title.click();
			browser.pause(250);
			expectClosed(Page.components.default);
			expectOpen(Page.components.defaultValue);
		});
	});
});

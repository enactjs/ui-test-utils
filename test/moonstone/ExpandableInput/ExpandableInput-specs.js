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
				expectOpen(expandable)
				Page.spotlightUp();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should close and move focus down on SpotlightDown', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable)
				Page.spotlightDown();
				expectClosed(expandable);
				expect(Page.components.defaultValue.title.hasFocus()).to.be.true();
			});

			it('should close on select twice', function () {
				Page.spotlightSelect();
				browser.pause(250);
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
				browser.pause(250);
				expandable.title.click();
				expectClosed(expandable);
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
				expectOpen(expandable)
				Page.spotlightUp();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should close on select twice', function () {
				Page.spotlightSelect();
				browser.pause(250);
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
				browser.pause(250);
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
				browser.pause(250);
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

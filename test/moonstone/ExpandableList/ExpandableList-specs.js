let Page = require('./ExpandableListPage');

describe('ExpandableList', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should have focus on first expandable at start', function () {
		expect(Page.components.radioSelect.title.hasFocus()).to.be.true();
	});

	describe('radio select', function () {
		const expandable = Page.components.radioSelect;

		validateTitle(expandable, 'ExpandableList Radio Select');

		it('should have correct none text', function () {
			expect(expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.item(0).hasFocus()).to.be.true();
			});

			it('should close when moving up to header', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				Page.spotlightUp();
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should not allow 5-way exit from bottom', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(expandable.item(2).hasFocus()).to.be.true();
				Page.spotlightDown();
				expect(expandable.item(2).hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text on select', function () {
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('option1');
			});

			it('should not unselect item', function () {
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should only allow one selected item', function () {
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				expandable.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectOpen(expandable);
			});

			it('should close on title click when open', function () {
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
			});

			it('should select item', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.valueText).to.equal('option1');
			});

			it('should not unselect item', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should only allow one selected item', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.item(1).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});
	});

	describe('multi select', function () {
		const expandable = Page.components.multiSelect;

		validateTitle(expandable, 'ExpandableList Multi Select');

		it('should have correct none text', function () {
			expect(expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				expandable.focus();
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.item(0).hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text on select', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('option1');
			});

			it('should allow unselecting item', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
			});

			it('should allow multiple selected items', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should combine value text with multi-select', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.spotlightUp();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('option1, option2');
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				expandable.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectOpen(expandable);
			});

			it('should close on title click when open', function () {
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
			});

			it('should select item', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.valueText).to.equal('option1');
			});

			it('should allow unselecting item', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
			});

			it('should allow multiple selected items', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.item(1).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});
	});

	describe('single select', function () {
		const expandable = Page.components.singleSelect;

		validateTitle(expandable, 'ExpandableList Single Select');

		it('should have correct none text', function () {
			expect(expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				expandable.focus();
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.item(0).hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text on select', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('option1');
			});

			it('should allow unselecting item', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
			});

			it('should reset none text if nothing selected', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('Nothing Selected');
			});

			it('should not allow multiple selected items', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				expandable.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expectOpen(expandable);
			});

			it('should close on title click when open', function () {
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
			});

			it('should select item', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.valueText).to.equal('option1');
			});

			it('should unselect item', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
			});

			it('should only allow one selected item', function () {
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.item(1).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.false();
				expect(expandable.item(1).isExisting(expandable.selectedClass)).to.be.true();
			});
		});
	});

	describe('no lock bottom', function () {
		const expandable = Page.components.noLockBottom;

		validateTitle(expandable, 'ExpandableList No Lock Bottom');

		describe('5-way', function () {
			it('should allow 5-way out when open', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(expandable.item(2).hasFocus()).to.be.true();
				Page.spotlightDown();
				expect(Page.components.noAutoClose.title.hasFocus()).to.be.true();
			});
		});
	});

	describe('no auto close', function () {
		const expandable = Page.components.noAutoClose;

		validateTitle(expandable, 'ExpandableList No Auto Close');

		it('should be initially closed', function () {
			expectClosed(expandable);
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(expandable);
				expect(expandable.item(0).hasFocus()).to.be.true();
			});

			it('should not close when navigating up to title', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightUp();
				expectOpen(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});
		});
	});

	describe('default open', function () {
		const expandable = Page.components.defaultOpen;

		validateTitle(expandable, 'ExpandableList Default Open');

		it('should be initially open', function () {
			expectOpen(expandable);
		});

		describe('5-way', function () {
			it('should close on select', function () {
				expandable.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(expandable);
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should close when navigating up to title', function () {
				expandable.focus();
				Page.spotlightDown();
				Page.spotlightUp();
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
				expect(expandable.chevron).to.equal('󯿭');
				expect(expandable.item(0).isVisible()).to.be.false();
				expect(expandable.title.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click', function () {
				expandable.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
				expect(expandable.chevron).to.equal('󯿭');
				expect(expandable.item(0).isVisible()).to.be.false();
			});

			it('should open on title click when closed', function () {
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		const expandable = Page.components.disabled;

		validateTitle(expandable, 'ExpandableList Disabled');

		it('should be initially closed', function () {
			expect(expandable.isOpen).to.be.false();
			expect(expandable.chevron).to.equal('󯿭');
			expect(expandable.item(0).isVisible()).to.be.false();
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
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				// Though, in this case, it should never fire, but we need to wait just in case.
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
				expect(expandable.chevron).to.equal('󯿭');
				expect(expandable.item(0).isVisible()).to.be.false();
			});
		});
	});

	describe('general 5-way navigation', function () {
		it('should not stop 5-way down when closed', function () {
			Page.spotlightDown();
			expect(Page.components.multiSelect.title.hasFocus()).to.be.true();
		});
	});

	describe('general pointer operation', function () {
		it('should not close other expandable when opening', function () {
			Page.components.radioSelect.title.click();
			browser.pause(250);
			Page.components.multiSelect.title.click();
			browser.pause(250);
			expect(Page.components.radioSelect.isOpen).to.be.true();
			expect(Page.components.multiSelect.isOpen).to.be.true();
		});
	});
});

// Validations are self-contained 'it' statements
function validateTitle (expandable, title) {
	it('should have correct title', function () {
		expect(expandable.titleText).to.equal(title);
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
function expectClosed (expandable) {
	expect(expandable.isOpen).to.be.false();
	expect(expandable.chevron).to.equal('󯿭');
	expect(expandable.item(0).isVisible()).to.be.false();
}

function expectOpen (expandable) {
	expect(expandable.isOpen).to.be.true();
	expect(expandable.chevron).to.equal('󯿮');
	expect(expandable.item(0).isVisible()).to.be.true();
}

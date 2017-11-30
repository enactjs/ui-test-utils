let Page = require('./ExpandableListPage');

describe('ExpandableList', function () {

	it('should have focus on first expandable at start', function () {
		Page.open();
		expect(Page.expandableRadio.title.hasFocus()).to.be.true();
	});

	describe('radio select', function () {
		const expandable = Page.expandableRadio;

		validateTitle(expandable, 'ExpandableList Radio Select');

		it('should have correct none text', function () {
			Page.open();
			expect(expandable.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			Page.open();
			expectClosed(expandable);
		});

		it('should be initially closed', function () {
			Page.open();
			expect(expandable.isOpen).to.be.false();
			expect(expandable.chevron).to.equal('󯿭');
			expect(expandable.item(0).isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				Page.open();
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				expect(expandable.chevron).to.equal('󯿮');
				expect(expandable.item(0).isVisible()).to.be.true();
				expect(expandable.item(0).hasFocus()).to.be.true();
			});

			it('should close when moving up to header', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				Page.spotlightUp();
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
				expect(expandable.title.hasFocus()).to.be.true();
			});

			it('should not allow 5-way exit from bottom', function () {
				Page.open();
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
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text on select', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(expandable.valueText).to.equal('option1');
			});

			it('should not unselect item', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should only allow one selected item', function () {
				Page.open();
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
				Page.open();
				expandable.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				expect(expandable.chevron).to.equal('󯿮');
				expect(expandable.item(0).isVisible()).to.be.true();
			});

			it('should close on title click when open', function () {
				Page.open();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.true();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.isOpen).to.be.false();
			});

			it('should select item', function () {
				Page.open();
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should update value text', function () {
				Page.open();
				Page.open();
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.title.click();
				browser.pause(250);
				expect(expandable.valueText).to.equal('option1');
			});

			it('should not unselect item', function () {
				Page.open();
				expandable.title.click();
				browser.pause(250);
				expandable.item(0).click();
				expandable.item(0).click();
				expect(expandable.item(0).isExisting(expandable.selectedClass)).to.be.true();
			});

			it('should only allow one selected item', function () {
				Page.open();
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
		it('should have correct title', function () {
			Page.open();
			expect(Page.expandable2.titleText).to.equal('ExpandableList Multi Select');
		});

		it('should have correct none text', function () {
			Page.open();
			expect(Page.expandable2.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			Page.open();
			expect(Page.expandable2.isOpen).to.be.false();
			expect(Page.expandable2.chevron).to.equal('󯿭');
			expect(Page.expandable2.item(0).isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				Page.open();
				Page.expandable2.focus();
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(Page.expandable2.isOpen).to.be.true();
				expect(Page.expandable2.chevron).to.equal('󯿮');
				expect(Page.expandable2.item(0).isVisible()).to.be.true();
				expect(Page.expandable2.item(0).hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				Page.open();
				Page.expandable2.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				expect(Page.expandable2.item(0).isExisting(Page.expandable2.selectedClass)).to.be.true();
			});

			it('should update value text on select', function () {
				Page.open();
				Page.expandable2.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(Page.expandable2.valueText).to.equal('option1');
			});

			it('should allow unselecting item', function () {
				Page.open();
				Page.expandable2.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(Page.expandable2.item(0).isExisting(Page.expandable2.selectedClass)).to.be.false();
			});

			it('should allow multiple selected items', function () {
				Page.open();
				Page.expandable2.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(Page.expandable2.item(0).isExisting(Page.expandable2.selectedClass)).to.be.true();
				expect(Page.expandable2.item(1).isExisting(Page.expandable2.selectedClass)).to.be.true();
			});

			it('should combine value text with multi-select', function () {
				Page.open();
				Page.expandable2.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.spotlightUp();
				Page.spotlightUp();
				expect(Page.expandable2.valueText).to.equal('option1, option2');
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				Page.open();
				Page.expandable2.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(Page.expandable2.isOpen).to.be.true();
				expect(Page.expandable2.chevron).to.equal('󯿮');
				expect(Page.expandable2.item(0).isVisible()).to.be.true();
			});

			it('should close on title click when open', function () {
				Page.open();
				Page.expandable2.title.click();
				browser.pause(250);
				expect(Page.expandable2.isOpen).to.be.true();
				Page.expandable2.title.click();
				browser.pause(250);
				expect(Page.expandable2.isOpen).to.be.false();
			});

			it('should select item', function () {
				Page.open();
				Page.expandable2.title.click();
				browser.pause(250);
				Page.expandable2.item(0).click();
				expect(Page.expandable2.item(0).isExisting(Page.expandable2.selectedClass)).to.be.true();
			});

			it('should update value text', function () {
				Page.open();
				Page.open();
				Page.expandable2.title.click();
				browser.pause(250);
				Page.expandable2.item(0).click();
				Page.expandable2.title.click();
				browser.pause(250);
				expect(Page.expandable2.valueText).to.equal('option1');
			});

			it('should allow unselecting item', function () {
				Page.open();
				Page.expandable2.title.click();
				browser.pause(250);
				Page.expandable2.item(0).click();
				Page.expandable2.item(0).click();
				expect(Page.expandable2.item(0).isExisting(Page.expandable2.selectedClass)).to.be.false();
			});

			it('should allow multiple selected items', function () {
				Page.open();
				Page.expandable2.title.click();
				browser.pause(250);
				Page.expandable2.item(0).click();
				Page.expandable2.item(1).click();
				expect(Page.expandable2.item(0).isExisting(Page.expandable2.selectedClass)).to.be.true();
				expect(Page.expandable2.item(1).isExisting(Page.expandable2.selectedClass)).to.be.true();
			});
		});
	});

	describe('single select', function () {
		it('should have correct title', function () {
			Page.open();
			expect(Page.expandable3.titleText).to.equal('ExpandableList Single Select');
		});

		it('should have correct none text', function () {
			Page.open();
			expect(Page.expandable3.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			Page.open();
			expect(Page.expandable3.isOpen).to.be.false();
			expect(Page.expandable3.chevron).to.equal('󯿭');
			expect(Page.expandable3.item(0).isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				Page.open();
				Page.expandable3.focus();
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(Page.expandable3.isOpen).to.be.true();
				expect(Page.expandable3.chevron).to.equal('󯿮');
				expect(Page.expandable3.item(0).isVisible()).to.be.true();
				expect(Page.expandable3.item(0).hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				Page.open();
				Page.expandable3.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				expect(Page.expandable3.item(0).isExisting(Page.expandable3.selectedClass)).to.be.true();
			});

			it('should update value text on select', function () {
				Page.open();
				Page.expandable3.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(Page.expandable3.valueText).to.equal('option1');
			});

			it('should allow unselecting item', function () {
				Page.open();
				Page.expandable3.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(Page.expandable3.item(0).isExisting(Page.expandable3.selectedClass)).to.be.false();
			});

			it('should reset none text if nothing selected', function () {
				Page.open();
				Page.expandable3.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(Page.expandable3.valueText).to.equal('Nothing Selected');
			});

			it('should not allow multiple selected items', function () {
				Page.open();
				Page.expandable3.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(Page.expandable3.item(0).isExisting(Page.expandable3.selectedClass)).to.be.false();
				expect(Page.expandable3.item(1).isExisting(Page.expandable3.selectedClass)).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open on title click when closed', function () {
				Page.open();
				Page.expandable3.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(Page.expandable3.isOpen).to.be.true();
				expect(Page.expandable3.chevron).to.equal('󯿮');
				expect(Page.expandable3.item(0).isVisible()).to.be.true();
			});

			it('should close on title click when open', function () {
				Page.open();
				Page.expandable3.title.click();
				browser.pause(250);
				expect(Page.expandable3.isOpen).to.be.true();
				Page.expandable3.title.click();
				browser.pause(250);
				expect(Page.expandable3.isOpen).to.be.false();
			});

			it('should select item', function () {
				Page.open();
				Page.expandable3.title.click();
				browser.pause(250);
				Page.expandable3.item(0).click();
				expect(Page.expandable3.item(0).isExisting(Page.expandable3.selectedClass)).to.be.true();
			});

			it('should update value text', function () {
				Page.open();
				Page.open();
				Page.expandable3.title.click();
				browser.pause(250);
				Page.expandable3.item(0).click();
				Page.expandable3.title.click();
				browser.pause(250);
				expect(Page.expandable3.valueText).to.equal('option1');
			});

			it('should unselect item', function () {
				Page.open();
				Page.expandable3.title.click();
				browser.pause(250);
				Page.expandable3.item(0).click();
				Page.expandable3.item(0).click();
				expect(Page.expandable3.item(0).isExisting(Page.expandable3.selectedClass)).to.be.false();
			});

			it('should only allow one selected item', function () {
				Page.open();
				Page.expandable3.title.click();
				browser.pause(250);
				Page.expandable3.item(0).click();
				Page.expandable3.item(1).click();
				expect(Page.expandable3.item(0).isExisting(Page.expandable3.selectedClass)).to.be.false();
				expect(Page.expandable3.item(1).isExisting(Page.expandable3.selectedClass)).to.be.true();
			});
		});
	});

	describe('no lock bottom', function () {
		describe('5-way', function () {
			it('should allow 5-way out when open', function () {
				Page.open();
				Page.expandable4.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.expandable4.isOpen).to.be.true();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(Page.expandable4.item(2).hasFocus()).to.be.true();
				Page.spotlightDown();
				expect(Page.expandable5.title.hasFocus()).to.be.true();
			});
		});
	});

	describe('no auto close', function () {
		it('should be initially closed', function () {
			Page.open();
			expect(Page.expandable5.isOpen).to.be.false();
			expect(Page.expandable5.chevron).to.equal('󯿭');
			expect(Page.expandable5.item(0).isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				Page.open();
				Page.expandable5.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.expandable5.isOpen).to.be.true();
				expect(Page.expandable5.chevron).to.equal('󯿮');
				expect(Page.expandable5.item(0).isVisible()).to.be.true();
				expect(Page.expandable5.item(0).hasFocus()).to.be.true();
			});

			it('should not close when navigating up to title', function () {
				Page.open();
				Page.expandable5.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightUp();
				expect(Page.expandable5.isOpen).to.be.true();
				expect(Page.expandable5.chevron).to.equal('󯿮');
				expect(Page.expandable5.item(0).isVisible()).to.be.true();
				expect(Page.expandable5.title.hasFocus()).to.be.true();
			});
		});
	});

	describe('default open', function () {
		it('should be initially open', function () {
			Page.open();
			expect(Page.expandable6.isOpen).to.be.true();
			expect(Page.expandable6.chevron).to.equal('󯿮');
			expect(Page.expandable6.item(0).isVisible()).to.be.true();
		});

		describe('5-way', function () {
			it('should close on select', function () {
				Page.open();
				Page.expandable6.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.expandable6.isOpen).to.be.false();
				expect(Page.expandable6.chevron).to.equal('󯿭');
				expect(Page.expandable6.item(0).isVisible()).to.be.false();
				expect(Page.expandable6.title.hasFocus()).to.be.true();
			});

			it('should close when navigating up to title', function () {
				Page.open();
				Page.expandable6.focus();
				Page.spotlightDown();
				Page.spotlightUp();
				browser.pause(250);
				expect(Page.expandable6.isOpen).to.be.false();
				expect(Page.expandable6.chevron).to.equal('󯿭');
				expect(Page.expandable6.item(0).isVisible()).to.be.false();
				expect(Page.expandable6.title.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should close on title click', function () {
				Page.open();
				Page.expandable6.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(Page.expandable6.isOpen).to.be.false();
				expect(Page.expandable6.chevron).to.equal('󯿭');
				expect(Page.expandable6.item(0).isVisible()).to.be.false();
			});

			it('should open on title click when closed', function () {
				Page.open();
				Page.expandable6.title.click();
				browser.pause(250);
				expect(Page.expandable6.isOpen).to.be.false();
				Page.expandable6.title.click();
				browser.pause(250);
				expect(Page.expandable6.isOpen).to.be.true();
			});
		});
	});

	describe('disabled', function () {
		it('should be initially closed', function () {
			Page.open();
			expect(Page.expandable5.isOpen).to.be.false();
			expect(Page.expandable5.chevron).to.equal('󯿭');
			expect(Page.expandable5.item(0).isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should not be spottable', function () {
				Page.open();
				Page.expandable6.focus();
				Page.spotlightDown();
				expect(Page.expandable7.title.hasFocus()).to.be.false();
			});
		});

		describe('pointer', function () {
			it('should stay closed on title click', function () {
				Page.open();
				Page.expandable7.title.click();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				// Though, in this case, it should never fire, but we need to wait just in case.
				browser.pause(250);
				expect(Page.expandable7.isOpen).to.be.false();
				expect(Page.expandable7.chevron).to.equal('󯿭');
				expect(Page.expandable7.item(0).isVisible()).to.be.false();
			});
		});
	});

	describe('general 5-way navigation', function () {
		it('should not stop 5-way down when closed', function () {
			Page.open();
			Page.spotlightDown();
			expect(Page.expandable2.title.hasFocus()).to.be.true();
		});
	});

	describe('general pointer operation', function () {
		it('should not close other expandable when opening', function () {
			Page.open();
			Page.expandableRadio.title.click();
			browser.pause(250);
			Page.expandable2.title.click();
			browser.pause(250);
			expect(Page.expandableRadio.isOpen).to.be.true();
			expect(Page.expandable2.isOpen).to.be.true();
		});
	});
});

// Validations are self-contained 'it' statements
function validateTitle (expandable, title) {
	it('should have correct title', function () {
		Page.open();
		expect(expandable.titleText).to.equal(title);
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
function expectClosed (expandable) {
	expect(expandable.isOpen).to.be.false();
	expect(expandable.chevron).to.equal('󯿭');
	expect(expandable.item(0).isVisible()).to.be.false();
}


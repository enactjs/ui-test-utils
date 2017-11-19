let Page = require('./ExpandableListPage');

describe('ExpandableList', function () {

	describe('radio select', function () {
		it('should have focus on first expandable at start', function () {
			Page.open();
			expect(Page.expandable1.title.hasFocus()).to.be.true();
		});

		it('should have correct title', function () {
			Page.open();
			expect(Page.expandable1.titleText).to.equal('ExpandableList Radio Select');
		});

		it('should have correct none text', function () {
			Page.open();
			expect(Page.expandable1.valueText).to.equal('Nothing Selected');
		});

		it('should be initially closed', function () {
			Page.open();
			expect(Page.expandable1.isOpen).to.be.false();
			expect(Page.expandable1.chevron).to.equal('󯿭');
			expect(Page.expandable1.item1.isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				Page.open();
				Page.spotlightSelect();
				// TODO: Perhaps trap `ontransitionend` so we don't have to rely on magic numbers?
				browser.pause(250);
				expect(Page.expandable1.isOpen).to.be.true();
				expect(Page.expandable1.chevron).to.equal('󯿮');
				expect(Page.expandable1.item1.isVisible()).to.be.true();
				expect(Page.expandable1.item1.hasFocus()).to.be.true();
			});

			it('should close when moving up to header', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.expandable1.isOpen).to.be.true();
				Page.spotlightUp();
				browser.pause(250);
				expect(Page.expandable1.isOpen).to.be.false();
				expect(Page.expandable1.title.hasFocus()).to.be.true();
			});

			it('should not allow 5-way exit from bottom', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.expandable1.isOpen).to.be.true();
				Page.spotlightDown();
				Page.spotlightDown();
				expect(Page.expandable1.item3.hasFocus()).to.be.true();
				Page.spotlightDown();
				expect(Page.expandable1.item3.hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				expect(Page.expandable1.item1.isExisting('.RadioItem__selected')).to.be.true();
			});

			it('should update value text on select', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightUp();
				expect(Page.expandable1.valueText).to.equal('option1');
			});

			it('should not unselect item', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightSelect();
				expect(Page.expandable1.item1.isExisting('.RadioItem__selected')).to.be.true();
			});

			it('should only allow one selected item', function () {
				Page.open();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(Page.expandable1.item1.isExisting('.RadioItem__selected')).to.be.false();
				expect(Page.expandable1.item2.isExisting('.RadioItem__selected')).to.be.true();
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
			expect(Page.expandable2.item1.isVisible()).to.be.false();
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
				expect(Page.expandable2.item1.isVisible()).to.be.true();
				expect(Page.expandable2.item1.hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				Page.open();
				Page.expandable2.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				expect(Page.expandable2.item1.isExisting('.Checkbox__selected')).to.be.true();
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
				expect(Page.expandable2.item1.isExisting('.Checkbox__selected')).to.be.false();
			});

			it('should allow multiple selected items', function () {
				Page.open();
				Page.expandable2.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightSelect();
				expect(Page.expandable2.item1.isExisting('.Checkbox__selected')).to.be.true();
				expect(Page.expandable2.item2.isExisting('.Checkbox__selected')).to.be.true();
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
			expect(Page.expandable3.item1.isVisible()).to.be.false();
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
				expect(Page.expandable3.item1.isVisible()).to.be.true();
				expect(Page.expandable3.item1.hasFocus()).to.be.true();
			});

			it('should select item when pressing select', function () {
				Page.open();
				Page.expandable3.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightSelect();
				expect(Page.expandable3.item1.isExisting('.RadioItem__selected')).to.be.true();
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
				expect(Page.expandable3.item1.isExisting('.RadioItem__selected')).to.be.false();
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
				expect(Page.expandable3.item1.isExisting('.RadioItem__selected')).to.be.false();
				expect(Page.expandable3.item2.isExisting('.RadioItem__selected')).to.be.true();
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
				expect(Page.expandable4.item3.hasFocus()).to.be.true();
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
			expect(Page.expandable5.item1.isVisible()).to.be.false();
		});

		describe('5-way', function () {
			it('should open and spot first item on select', function () {
				Page.open();
				Page.expandable5.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.expandable5.isOpen).to.be.true();
				expect(Page.expandable5.chevron).to.equal('󯿮');
				expect(Page.expandable5.item1.isVisible()).to.be.true();
				expect(Page.expandable5.item1.hasFocus()).to.be.true();
			});

			it('should not close when navigating up to title', function () {
				Page.open();
				Page.expandable5.focus();
				Page.spotlightSelect();
				browser.pause(250);
				Page.spotlightUp();
				expect(Page.expandable5.isOpen).to.be.true();
				expect(Page.expandable5.chevron).to.equal('󯿮');
				expect(Page.expandable5.item1.isVisible()).to.be.true();
				expect(Page.expandable5.title.hasFocus()).to.be.true();
			});
		});
	});

	describe('default open', function () {
		it('should be initially open', function () {
			Page.open();
			expect(Page.expandable6.isOpen).to.be.true();
			expect(Page.expandable6.chevron).to.equal('󯿮');
			expect(Page.expandable6.item1.isVisible()).to.be.true();
		});

		describe('5-way', function () {
			it('should close on select', function () {
				Page.open();
				Page.expandable6.focus();
				Page.spotlightSelect();
				browser.pause(250);
				expect(Page.expandable6.isOpen).to.be.false();
				expect(Page.expandable6.chevron).to.equal('󯿭');
				expect(Page.expandable6.item1.isVisible()).to.be.false();
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
				expect(Page.expandable6.item1.isVisible()).to.be.false();
				expect(Page.expandable6.title.hasFocus()).to.be.true();
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
});


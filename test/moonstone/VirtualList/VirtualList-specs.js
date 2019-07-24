
const Page = require('./VirtualListPage'),
	{expectList1FocusedItem, expectList2FocusedItem, expectList3FocusedItem} = require('./VirtualList-utils');

describe('VirtualList', function () {

	it('should meet initial conditions', function () {
		Page.open();
		expect(Page.list1ButtonLeft.hasFocus(), 'focus').to.be.true();
		expect(Page.list1ButtonScrollUp.getAttribute('disabled'), 'Up disabled').to.be.equal('true');
		expect(Page.list1ButtonScrollDown.getAttribute('disabled'), 'Down disabled').to.be.null();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should focus first item on first focus', function () {
			Page.spotlightRight();
			expectList1FocusedItem(0);
		});

		it('should focus and Scroll with Up/Down and 5-way [GT_24451]', function () {
			Page.spotlightRight();
			Page.spotlightDown();
			expectList1FocusedItem(1, 'step 3 focus');
			Page.pageDown();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			expectList1FocusedItem(9, 'step 4 focus');
			Page.spotlightDown();
			expectList1FocusedItem(10, 'step 5 focus');
			Page.pageUp();
			Page.delay(1500);
			expectList1FocusedItem(2, 'step 6 focus');
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectList1FocusedItem(5, 'step 7 focus');
			Page.pageUp();
			Page.delay(1500);
			// TODO: This seems wrong, should be item 0, I think!
			expectList1FocusedItem(5, 'step 8 focus');
		});

		it('should focus scroll up/down buttons with 5-way [GT-24811]', function () {
			Page.spotlightRight();
			Page.spotlightDown();
			expectList1FocusedItem(1);
			Page.spotlightRight();
			expect(Page.list1ButtonScrollUp.hasFocus(), 'step 5 focus').to.be.true();
			Page.spotlightLeft();
			expectList1FocusedItem(0, 'step 6.1 focus');
			// expectFocusedItem(1);  // TODO: VL should remember last focused!
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();	// TODO: Should remove 1 when focus returns right
			Page.spotlightRight();
			expect(Page.list1ButtonScrollDown.hasFocus(), 'step 6.3 focus').to.be.true();
		});

		it('should not scroll when leaving list with 5-way up/down [GT-25987]', function () {
			Page.spotlightRight();
			expectList1FocusedItem(0, 'step 5 focus');
			Page.spotlightUp();
			expect(Page.list1ButtonTop.hasFocus(), 'step 6 focus').to.be.true();
			Page.spotlightDown();
			expectList1FocusedItem(0);
			for (let i = 0; i < 49; ++i) {
				Page.spotlightDown();
				Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
			}
			expectList1FocusedItem(49, 'step 7 focus');
			Page.delay(1500);
			Page.spotlightDown();
			expect(Page.list1ButtonBottom.hasFocus(), 'step 8 focus').to.be.true();
		});

		it('should have same height list and scrollbar [GT-22079]', function () {
			expect(Page.list1Size.height).to.equal(Page.list1ScrollBarSize.height);
		});

		it('should retain focus on paging control when they become disabled [GT-23899]', function () {
			Page.spotlightRight();
			Page.spotlightDown();
			expectList1FocusedItem(1);
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectList1FocusedItem(6, 'step 4.1 focus');
			Page.spotlightRight();
			expect(Page.list1ButtonScrollDown.hasFocus(), 'step 4.2 focus').to.be.true();
			Page.spotlightSelect();
			Page.delay(1500);
			Page.spotlightSelect();
			Page.delay(1500);
			Page.spotlightUp();
			expect(Page.list1ButtonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			Page.spotlightSelect();
			Page.delay(1500);
			Page.spotlightSelect();
			expect(Page.list1ButtonScrollUp.hasFocus()).to.be.true();
		});

		it('should retain focus on scroll buttons when using paging controls [GT-23845]', function () {
			Page.spotlightRight();
			Page.spotlightDown();
			expectList1FocusedItem(1);
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectList1FocusedItem(6);
			Page.spotlightRight();
			expect(Page.list1ButtonScrollDown.hasFocus(), 'step 4 focus').to.be.true();
			Page.pageDown();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			Page.pageDown();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			expect(Page.list1ButtonScrollDown.hasFocus(), 'step 5 focus').to.be.true();
			Page.pageUp();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			expect(Page.buttonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			Page.pageUp();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			Page.pageUp();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			expect(Page.buttonScrollUp.hasFocus(), 'step 7 focus').to.be.true();
		});

		it('should position scrollbar on right side [GT-21271]', function () {
			Page.spotlightRight();
			Page.spotlightDown();
			expectList1FocusedItem(1);
			Page.spotlightRight();
			expect(Page.list1ButtonScrollUp.hasFocus(), 'step 2.2 focus').to.be.true();
		});

		it('should navigate inside and outside of scroll buttons via 5way [GT-22761]', function () {
			Page.spotlightRight();
			Page.spotlightDown();
			expectList1FocusedItem(1);
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectList1FocusedItem(6);
			Page.spotlightRight();
			expect(Page.list1ButtonScrollDown.hasFocus(), 'step 4.2 focus').to.be.true();
			Page.spotlightDown();
			expect(Page.list1ButtonBottom.hasFocus()).to.be.true();
			Page.spotlightUp();
			expect(Page.list1ButtonScrollDown.hasFocus(), 'step 5 focus').to.be.true();
			Page.spotlightUp();
			expect(Page.list1ButtonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			Page.spotlightUp();
			expect(Page.list1ButtonTop.hasFocus(), 'step 7 focus').to.be.true();
		});

		it('should navigate between items and scroll buttons via 5way right [GT-21163]', function () {
			Page.spotlightRight();
			expectList1FocusedItem(0, 'step 5.1 focus');
			Page.spotlightRight();
			expect(Page.list1ButtonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			Page.spotlightLeft();
			expectList1FocusedItem(0);
			for (let i = 0; i < 49; ++i) {
				Page.spotlightDown();
				Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
			}
			expectList1FocusedItem(49, 'step 7.1 focus');
			Page.spotlightRight();
			expect(Page.list1ButtonScrollDown.hasFocus(), 'step 8 focus').to.be.true();
		});

		describe('onKeyDown event behavior [GT-27663]', function () {
			it('should stop bubbling while navigating within a list', function () {
				Page.spotlightRight();
				expectList1FocusedItem(0, 'focus 1');
				Page.spotlightDown();
				expectList1FocusedItem(1, 'focus 2');
				Page.spotlightUp();
				expectList1FocusedItem(0, 'focus 3');
				Page.spotlightRight();
				expect(Page.list1ButtonScrollUp.hasFocus(), 'focus 4').to.be.true();
				Page.spotlightDown();
				expect(Page.list1ButtonScrollDown.hasFocus(), 'focus 5').to.be.true();
				Page.spotlightUp();
				expect(Page.list1ButtonScrollUp.hasFocus(), 'focus 6').to.be.true();
				Page.spotlightLeft();
				expectList1FocusedItem(0, 'focus 7');
				expect(Page.list1.getAttribute('data-keydown-events')).to.equal('0');
			});

			it('should allow bubbling while navigating out of a focusableScrollbar list via scroll buttons', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.list1ButtonScrollUp.hasFocus(), 'focus 1').to.be.true();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightUp();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightDown();
				expect(Page.list1.getAttribute('data-keydown-events'), 'step 8').to.equal('4');
			});

			it('should allow bubbling while navigating out of a list using visible focusableScrollbar via items', function () {
				Page.spotlightRight();
				expectList1FocusedItem(0, 'focus 1');
				Page.spotlightUp();
				Page.spotlightDown();
				Page.spotlightLeft();
				Page.spotlightRight();
				expectList1FocusedItem(0, 'focus 2');
				for (let i = 0; i < 49; ++i) {
					Page.spotlightDown();
					Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
				}
				expectList1FocusedItem(49, 'focus 3');
				Page.spotlightDown();
				expect(Page.list1.getAttribute('data-keydown-events')).to.equal('3');
			});

			it('should allow bubbling while navigating out of a list using hidden focusableScrollbar via items', function () {
				Page.setList2Focus();
				Page.spotlightRight();
				expectList2FocusedItem(0, 'focus 1');
				Page.spotlightUp();
				expect(Page.list2ButtonTop.hasFocus(), 'focus 2').to.be.true();
				Page.spotlightDown();
				Page.spotlightLeft();
				expect(Page.list2ButtonLeft.hasFocus(), 'focus 3').to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.list2ButtonRight.hasFocus(), 'focus 4').to.be.true();
				Page.spotlightLeft();
				expectList2FocusedItem(0, 'focus 5');
				for (let i = 0; i < 49; ++i) {
					Page.spotlightDown();
					Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
				}
				expectList2FocusedItem(49, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.list2ButtonBottom.hasFocus(), 'focus 7').to.be.true();
				expect(Page.list2.getAttribute('data-keydown-events')).to.equal('4');
			});

			it('should allow bubbling while navigating out of a list using non-focusableScrollbar via items', function () {
				Page.setList3Focus();
				Page.spotlightRight();
				expectList3FocusedItem(0, 'focus 1');
				Page.spotlightUp();
				expect(Page.list3ButtonTop.hasFocus(), 'focus 2').to.be.true();
				Page.spotlightDown();
				Page.spotlightLeft();
				expect(Page.list3ButtonLeft.hasFocus(), 'focus 3').to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.list3ButtonRight.hasFocus(), 'focus 4').to.be.true();
				Page.spotlightLeft();
				expectList3FocusedItem(0, 'focus 5');
				for (let i = 0; i < 49; ++i) {
					Page.spotlightDown();
					Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
				}
				expectList3FocusedItem(49, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.list3ButtonBottom.hasFocus(), 'focus 7').to.be.true();
				expect(Page.list3.getAttribute('data-keydown-events')).to.equal('4');
			});
		});
	});

	describe('RTL locale', function () {

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should position scrollbar on left side [GT-21270]', function () {
			Page.spotlightLeft();
			Page.spotlightDown();
			expectList1FocusedItem(1);
			Page.spotlightLeft();
			expect(Page.list1ButtonScrollUp.hasFocus(), 'step 3 focus').to.be.true();
		});
	});
});

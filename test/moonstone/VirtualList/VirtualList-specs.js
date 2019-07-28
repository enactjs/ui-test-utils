
const Page = require('./VirtualListPage'),
	{expectFocusedItem} = require('./VirtualList-utils');

describe('VirtualList', function () {

	it('should meet initial conditions', function () {
		Page.open();
		expect(Page.buttonFocusableScrollbar.hasFocus(), 'focus').to.be.true();
		expect(Page.buttonScrollUp.getAttribute('disabled'), 'Up disabled').to.be.equal('true');
		expect(Page.buttonScrollDown.getAttribute('disabled'), 'Down disabled').to.be.null();
	});

	describe('LTR locale', function () {
		beforeEach(function () {
			Page.open();
		});

		it('should focus first item on first focus', function () {
			Page.spotlightDown();
			Page.spotlightRight();
			expectFocusedItem(0);
		});

		it('should focus and Scroll with Up/Down and 5-way [GT-24451]', function () {
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightDown();
			expectFocusedItem(1, 'step 3 focus');
			Page.pageDown();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			expectFocusedItem(9, 'step 4 focus');
			Page.spotlightDown();
			expectFocusedItem(10, 'step 5 focus');
			Page.pageUp();
			Page.delay(1500);
			expectFocusedItem(2, 'step 6 focus');
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectFocusedItem(5, 'step 7 focus');
			Page.pageUp();
			Page.delay(1500);
			// TODO: This seems wrong, should be item 0, I think!
			expectFocusedItem(5, 'step 8 focus');
		});

		it('should focus scroll up/down buttons with 5-way [GT-24811]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightDown();
			expectFocusedItem(1);
			Page.spotlightRight();
			expect(Page.buttonScrollUp.hasFocus(), 'step 5 focus').to.be.true();
			Page.spotlightLeft();
			expectFocusedItem(0, 'step 6.1 focus');
			// expectFocusedItem(1);  // TODO: VL should remember last focused!
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();	// TODO: Should remove 1 when focus returns right
			Page.spotlightRight();
			expect(Page.buttonScrollDown.hasFocus(), 'step 6.3 focus').to.be.true();
		});

		it('should not scroll when leaving list with 5-way up/down [GT-25987]', function () {
			Page.spotlightDown();
			Page.spotlightRight();
			expectFocusedItem(0, 'step 5 focus');
			Page.spotlightUp();
			expect(Page.buttonTop.hasFocus(), 'step 6 focus').to.be.true();
			Page.spotlightDown();
			expectFocusedItem(0);
			for (let i = 0; i < 49; ++i) {
				Page.spotlightDown();
				Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
			}
			expectFocusedItem(49, 'step 7 focus');
			Page.delay(1500);
			Page.spotlightDown();
			expect(Page.buttonBottom.hasFocus(), 'step 8 focus').to.be.true();
		});

		it('should have same height list and scrollbar [GT-22079]', function () {
			expect(Page.listSize.height).to.equal(Page.scrollBarSize.height);
		});

		it('should retain focus on paging control when they become disabled [GT-23899]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightDown();
			expectFocusedItem(1);
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectFocusedItem(6, 'step 4.1 focus');
			Page.spotlightRight();
			expect(Page.buttonScrollDown.hasFocus(), 'step 4.2 focus').to.be.true();
			Page.spotlightSelect();
			Page.delay(1500);
			Page.spotlightSelect();
			Page.delay(1500);
			Page.spotlightUp();
			expect(Page.buttonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			Page.spotlightSelect();
			Page.delay(1500);
			Page.spotlightSelect();
			expect(Page.buttonScrollUp.hasFocus()).to.be.true();
		});

		it('should retain focus on scroll buttons when using paging controls [GT-23845]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightDown();
			expectFocusedItem(1);
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectFocusedItem(6);
			Page.spotlightRight();
			expect(Page.buttonScrollDown.hasFocus(), 'step 4 focus').to.be.true();
			Page.pageDown();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			Page.pageDown();
			Page.delay(1500);  // TODO: Need better way to detect scroll end
			expect(Page.buttonScrollDown.hasFocus(), 'step 5 focus').to.be.true();
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
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightDown();
			expectFocusedItem(1);
			Page.spotlightRight();
			expect(Page.buttonScrollUp.hasFocus(), 'step 2.2 focus').to.be.true();
		});

		it('should navigate inside and outside of scroll buttons via 5way [GT-22761]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			Page.spotlightDown();
			expectFocusedItem(1);
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			expectFocusedItem(6);
			Page.spotlightRight();
			expect(Page.buttonScrollDown.hasFocus(), 'step 4.2 focus').to.be.true();
			Page.spotlightDown();
			expect(Page.buttonBottom.hasFocus()).to.be.true();
			Page.spotlightUp();
			expect(Page.buttonScrollDown.hasFocus(), 'step 5 focus').to.be.true();
			Page.spotlightUp();
			expect(Page.buttonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			Page.spotlightUp();
			expect(Page.buttonTop.hasFocus(), 'step 7 focus').to.be.true();
		});

		it('should navigate between items and scroll buttons via 5way right [GT-21163]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightRight();
			expectFocusedItem(0, 'step 5.1 focus');
			Page.spotlightRight();
			expect(Page.buttonScrollUp.hasFocus(), 'step 6 focus').to.be.true();
			Page.spotlightLeft();
			expectFocusedItem(0);
			for (let i = 0; i < 49; ++i) {
				Page.spotlightDown();
				Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
			}
			expectFocusedItem(49, 'step 7.1 focus');
			Page.spotlightRight();
			expect(Page.buttonScrollDown.hasFocus(), 'step 8 focus').to.be.true();
		});

		describe('onKeyDown event behavior [GT-27663]', function () {
			it('should prevent bubbling while navigating within a list', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightDown();
				expectFocusedItem(1, 'focus 2');
				Page.spotlightUp();
				expectFocusedItem(0, 'focus 3');
				Page.spotlightRight();
				expect(Page.buttonScrollUp.hasFocus(), 'focus 4').to.be.true();
				Page.spotlightDown();
				expect(Page.buttonScrollDown.hasFocus(), 'focus 5').to.be.true();
				Page.spotlightUp();
				expect(Page.buttonScrollUp.hasFocus(), 'focus 6').to.be.true();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 7');
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
			});

			it('should prevent bubbling when wrapping', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				Page.delay(1500);  // TODO: Need better way to detect scroll end
				expectFocusedItem(49, 'focus 2');
				Page.spotlightDown();
				Page.delay(1500);  // TODO: Need better way to detect scroll end
				expectFocusedItem(0, 'focus 3');
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('0');
			});

			it('should allow bubbling while navigating out of a focusableScrollbar list via scroll buttons', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonScrollUp.hasFocus(), 'focus 1').to.be.true();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightUp();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightLeft();
				Page.spotlightDown();
				expect(Page.list.getAttribute('data-keydown-events'), 'step 8').to.equal('4');
			});

			it('should allow bubbling while navigating out of a list using visible focusableScrollbar via items', function () {
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				Page.spotlightDown();
				Page.spotlightLeft();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 2');
				for (let i = 0; i < 49; ++i) {
					Page.spotlightDown();
					Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
				}
				expectFocusedItem(49, 'focus 3');
				Page.spotlightDown();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('3');
			});

			it('should allow bubbling while navigating out of a list using hidden focusableScrollbar via items', function () {
				Page.spotlightSelect();
				Page.spotlightRight();
				Page.spotlightSelect();
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				expect(Page.buttonTop.hasFocus(), 'focus 2').to.be.true();
				Page.spotlightDown();
				Page.spotlightLeft();
				expect(Page.buttonLeft.hasFocus(), 'focus 3').to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonRight.hasFocus(), 'focus 4').to.be.true();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 5');
				for (let i = 0; i < 49; ++i) {
					Page.spotlightDown();
					Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
				}
				expectFocusedItem(49, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.buttonBottom.hasFocus(), 'focus 7').to.be.true();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
			});

			it('should allow bubbling while navigating out of a list using non-focusableScrollbar via items', function () {
				Page.spotlightDown();
				Page.spotlightRight();
				expectFocusedItem(0, 'focus 1');
				Page.spotlightUp();
				expect(Page.buttonTop.hasFocus(), 'focus 2').to.be.true();
				Page.spotlightDown();
				Page.spotlightLeft();
				expect(Page.buttonLeft.hasFocus(), 'focus 3').to.be.true();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(Page.buttonRight.hasFocus(), 'focus 4').to.be.true();
				Page.spotlightLeft();
				expectFocusedItem(0, 'focus 5');
				for (let i = 0; i < 49; ++i) {
					Page.spotlightDown();
					Page.delay(80); // TODO: 80 is an arbitrary value to help provide expected behavior between rapidly repeating keydown events
				}
				expectFocusedItem(49, 'focus 6');
				Page.delay(1500);
				Page.spotlightDown();
				expect(Page.buttonBottom.hasFocus(), 'focus 7').to.be.true();
				expect(Page.list.getAttribute('data-keydown-events')).to.equal('4');
			});
		});
	});

	describe('RTL locale', function () {

		beforeEach(function () {
			Page.open('?locale=ar-SA');
		});

		it('should position scrollbar on left side [GT-21270]', function () {
			Page.spotlightSelect();
			Page.spotlightDown();
			Page.spotlightLeft();
			Page.spotlightDown();
			expectFocusedItem(1);
			Page.spotlightLeft();
			expect(Page.buttonScrollUp.hasFocus(), 'step 3 focus').to.be.true();
		});
	});
});

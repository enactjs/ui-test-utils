
const Page = require('./VirtualListPage'),
	{expectFocusedItem} = require('./VirtualList-utils');

describe('VirtualList', function () {

	beforeEach(function () {
		Page.open();
	});

	it('should focus the left button on start', function () {
		expect(Page.buttonLeft.hasFocus()).to.be.true();
	});

	it('should focus first item on first focus', function () {
		Page.spotlightRight();
		expectFocusedItem(0);
	});

	it('should focus disabled scroll button on right', function () {
		Page.spotlightRight();
		expectFocusedItem(0);
		Page.spotlightRight();
		expect(Page.buttonScrollUp.hasFocus()).to.be.true();
	});

	it('should focus and Scroll with Up/Down and 5-way - GT_24451', function () {
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
});

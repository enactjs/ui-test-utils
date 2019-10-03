
const Page = require('./VL_ScrollerPage'),
	{expectFocusedItem} = require('./VL_Scroller-utils');

describe('VL_Scroller', function () {

	it('should meet initial conditions', function () {
		Page.open();
		expect(Page.button1.hasFocus(), 'Button 1 has focus initially').to.be.true();
	});

	describe('VL in scroller', function () {
		beforeEach(function () {
			Page.open();
		});

		// it('should focus button1 on first focus', function () {
		// 	// Page.spotlightDown();
		// 	Page.spotlightRight();
		// 	expectFocusedItem(0);
		// });

		it('should focus Button 1 after Page up', function () {
			// 5-way focus to "page 1 button" (the button is in the center of the screen)
			Page.spotlightRight();
			// expect focus on 'Page 1 Button'
			expect(Page.button1.hasFocus(), 'button 1 has focus').to.be.true();
			// expectFocusedItem(1, 'Page 1 Button has focus');

			// 5-way "down" to set focus to "page 2 button" (the button is on the bottom edge of the screen)
			Page.spotlightDown();
			expect(Page.button2.hasFocus(), 'button 2 has focus').to.be.true();
			// expectFocusedItem(2, 'Page 2 Button has focus');

			// "page up"
			Page.pageUp();
			Page.delay(1500);
			// expect focus to "page 1 button"
			expect(Page.button1.hasFocus(), 'step 6 focus').to.be.true();

			// expect(radioItem.valueText).to.equal('Radio Item1');
		});
	});
});

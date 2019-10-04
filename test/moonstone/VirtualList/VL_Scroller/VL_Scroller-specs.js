
const VL_ScrollerPage = require('./VL_ScrollerPage');

describe('VL_Scroller', function () {

	it('should meet initial conditions', function () {
		VL_ScrollerPage.open();
		expect(VL_ScrollerPage .button1.hasFocus(), 'Button 1 has focus initially').to.be.true();
	});

	// ?? do we need the 2 describe here?
	describe('VL in scroller', function () {
		beforeEach(function () {
			VL_ScrollerPage.open();
		});

		it('should focus Button 1 after Page Up [ENYO-6281]', function () {
			// 5-way focus to "page 1 button" (the button is in the center of the screen)
			VL_ScrollerPage.spotlightRight();
			// expect focus on 'Page 1 Button'
			expect(VL_ScrollerPage .button1.hasFocus(), 'button 1 has focus').to.be.true();
			// 5-way "down" to set focus to "page 2 button" (the button is on the bottom edge of the screen)
			VL_ScrollerPage.spotlightDown();
			expect(VL_ScrollerPage .button2.hasFocus(), 'button 2 has focus').to.be.true();
			// page Up
			VL_ScrollerPage.pageUp();
			VL_ScrollerPage.delay(1500);
			// expect focus to "page 1 button"
			expect(VL_ScrollerPage.button1.hasFocus(), 'button 1 has focus again').to.be.true();
		});
	});
});

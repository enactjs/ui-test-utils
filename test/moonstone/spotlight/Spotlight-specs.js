let Page = require('./SpotlightMultiplePage');
const {spotlight} = require('../../utils');

describe('Spotlight', function () {

	describe('initialization', function () {
		it('should focus first item on load', function () {
			Page.open();
			expect(Page.item1.hasFocus()).to.be.true();
		});
	});

	describe('pointerMode', function () {
		it('should enable pointer mode on mouse move', function () {
			Page.open();
			Page.movePointer();
			Page.updateStatus();
			expect(Page.pointerMode).to.be.true();
		});

		it('should disable pointer mode on directional key down', function () {
			Page.open();

			// enable pointer mode by moving the pointer
			Page.movePointer();
			Page.updateStatus();
			expect(Page.pointerMode).to.be.true();

			// disable by sending a directional key event
			Page.spotlightUp();
			Page.updateStatus();
			expect(Page.pointerMode).to.be.false();
		});

		it('should enable pointer mode on pointerShow key down', function () {
			Page.open();

			// disable by sending a directional key event
			spotlight.showPointer();
			Page.updateStatus();
			expect(Page.pointerMode).to.be.true();
		});

		it('should disable pointer mode on pointerHide key down', function () {
			Page.open();

			// enable pointer mode by moving the pointer
			Page.movePointer();
			Page.updateStatus();
			expect(Page.pointerMode).to.be.true();

			// disable by sending a directional key event
			spotlight.hidePointer();
			Page.updateStatus();
			expect(Page.pointerMode).to.be.false();
		});

		it('should not enable pointer mode on mouse move when paused', function () {
			Page.open();

			Page.pause();
			Page.movePointer();
			Page.updateStatus();
			expect(Page.pointerMode).to.be.false();
		});
	});

	describe('containers', function () {
		it('should focus item 2 on 5-way down', function () {
			Page.open();
			Page.spotlightDown();
			expect(Page.item2.hasFocus()).to.be.true();
		});

		it('should not change focus on 5-way left', function () {
			Page.open();
			Page.spotlightLeft();
			expect(Page.item1.hasFocus()).to.be.true();
		});

		it('should not change focus on 5-way up', function () {
			Page.open();
			Page.spotlightUp();
			expect(Page.item1.hasFocus()).to.be.true();
		});

		it('should spot default item in next container', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightRight();
			expect(Page.itemA.hasFocus()).to.be.true();
		});

		it('should spot last spotted control in container when re-entering', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightRight();
			expect(Page.itemA.hasFocus(), 'moved containers').to.be.true();
			Page.spotlightLeft();
			expect(Page.item2.hasFocus(), 'moved back').to.be.true();
		});

		it('should spot nearest control in container when leaving pointer mode with a target in direction', function () {
			Page.open();
			// Hovering non-focusable item with pointer
			Page.item2.moveToObject()
			// move down (no more spotted controls)
			Page.spotlightDown();
			// Should re-spot item 1
			expect(Page.item3.hasFocus()).to.be.true();
		});

		it('should spot next container when leaving pointer mode with focus on spottable item', function () {
			Page.open();
			// Hovering non-focusable item with pointer
			Page.item2.moveToObject()
			// move down (no more spotted controls)
			Page.spotlightRight();
			// Should re-spot item 1
			expect(Page.itemA.hasFocus()).to.be.true();
		});

		it('should spot closest control in container when leaving pointer in new container', function () {
			Page.open();
			// Hovering non-focusable item in different container with pointer
			Page.nonSpottableItemB.moveToObject()
			// move down
			Page.spotlightDown();
			// Should spot item A
			expect(Page.itemA.hasFocus()).to.be.true();
		});
	});
});

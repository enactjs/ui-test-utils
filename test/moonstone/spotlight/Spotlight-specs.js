let Page = require('./SpotlightMultiplePage');

describe('Spotlight', function () {

	// Note: On TV, we might want to check pointer mode first?
	it('should have no focus on load', function () {
		Page.open();
		Page.spotlightDown();
		expect(Page.item1.hasFocus()).to.be.true();
	});

	it('should focus item 2 on 5-way down', function () {
		Page.open();
		Page.spotlightDown();
		Page.spotlightDown();
		expect(Page.item2.hasFocus()).to.be.true();
	});

	it('should not change focus on 5-way left', function () {
		Page.open();
		Page.spotlightDown();
		Page.spotlightLeft();
		expect(Page.item1.hasFocus()).to.be.true();
	});

	it('should not change focus on 5-way up', function () {
		Page.open();
		Page.spotlightDown();
		Page.spotlightUp();
		expect(Page.item1.hasFocus()).to.be.true();
	});

	it('should return to last spotted control in container', function () {
		Page.open();
		Page.spotlightDown();
		Page.spotlightDown();
		Page.spotlightRight();
		expect(Page.itemA.hasFocus()).to.be.true();
		Page.spotlightLeft();
		expect(Page.item2.hasFocus()).to.be.true();
	});
});

let Page = require('./PanelsPage');

describe('Panels', function () {

	it('should load first panel.', function () {
		Page.open();
		const actual = Page.panelTitle;
		const expected = 'FIRST';

		expect(actual).to.equal(expected);
	});

	it('should move from first panel to the second', function () {
		Page.open();
		Page.button1.click()
		browser.pause(1000)

		const actual = Page.panelTitle;
		const expected = 'SECOND';

		expect(actual).to.equal(expected);
	});

	it('should have breadcrumb on second panel', function () {
		Page.open();
		expect(false).to.be.true();
	});

	describe('Transition', function () {
		it('should have transitioning class', function () {
			Page.open();
			expect(false).to.be.true();
		});
		it('should have have before pseudo-element while transitioning', function () {
			Page.open();
			expect(false).to.be.true();
		});
	})

	describe('Spotlight', function () {
		it('should spot first item on render', function () {
			Page.open();
			const actual = Page.closeButton.hasFocus();
			expect(actual).to.be.true();
		});

		it('should spot first item on second panel', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightSelect();

			browser.pause(2000)
			const actual = Page.item5.hasFocus();

			expect(actual).to.be.true();
		});

		it('should spot first item on second panel', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightSelect();
			browser.pause(2000)
			Page.spotlightLeft();
			Page.spotlightSelect();
			browser.pause(2000)

			const actual = Page.item1.hasFocus();

			expect(actual).to.be.true();
		});
	})

});

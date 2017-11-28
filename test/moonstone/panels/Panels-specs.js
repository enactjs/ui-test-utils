let Page = require('./PanelsPage');

describe('Panels', function () {

	it.only('should load first panel.', function () {
		Page.open();
		// const header = browser.element('header');
		const headerText = browser.getText('.Marquee__text=SECOND');
		console.log(headerText);
		
		expect(false).to.be.true();
	});

	it('should move from first panel to the second', function () {
		Page.open();
		browser.element()
		expect(false).to.be.true();
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
			expect(false).to.be.true();
		});

		it('should spot last spotted item on back', function () {
			Page.open();
			expect(false).to.be.true();
		});
	})

});

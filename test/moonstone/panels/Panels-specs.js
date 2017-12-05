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

	it('should move from first panel to the third', function () {
		Page.open();
		Page.button1.moveToObject();
		Page.spotlightSelect();
		browser.pause(1000)
		Page.item8.moveToObject();
		Page.spotlightSelect();
		browser.pause(1000)

		const actual = Page.panelTitle;
		const expected = 'THIRD';

		expect(actual).to.equal(expected);
	});

	it('should have breadcrumb on second panel', function () {
		Page.open();
		Page.button1.click()
		browser.pause(1000)
		const breadcrumbHeader = Page.breadcrumbHeader.getText();

		const actual = breadcrumbHeader
		const expected = '01'

		expect(actual).to.include(expected);
	});

	it('should move to first panel from the third', function () {
		Page.open();
		Page.button1.moveToObject();
		Page.spotlightSelect();
		browser.pause(2000)
		Page.item8.moveToObject();
		Page.spotlightSelect();
		browser.pause(2000)
		Page.breadcrumbHeader.moveToObject();
		Page.spotlightSelect();
		browser.pause(2000)
		Page.item8.moveToObject();
		Page.breadcrumbHeader.moveToObject();
		Page.spotlightSelect();
		browser.pause(2000)

		const actual = Page.panelTitle;
		const expected = 'FIRST';

		expect(actual).to.equal(expected);
	});

	describe('Transition', function () {

		it('should transition back to First panel with back key', function () {
			Page.open();
			Page.button1.click();
			Page.backKey();

			browser.pause(2000)

			expect(Page.panelTitle).to.equal('FIRST');
		});



	});

	describe('Spotlight', function () {
		it('should spot close button on render', function () {
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

		it('should spot second item on first panel when using back key', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightSelect();
			browser.pause(2000)
			Page.backKey();

			browser.pause(2000)
			const actual = Page.item2.hasFocus();

			expect(actual).to.be.true();
		});


		it('should spot button 4 in Third panel', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightSelect();
			browser.pause(2000)
			Page.spotlightSelect();
			browser.pause(2000)
			Page.spotlightRight();
			Page.spotlightDown();
			browser.pause(2000)
			Page.spotlightSelect();
			browser.pause(2000)
			Page.spotlightSelect();

			browser.pause(2000)
			
			expect(Page.button4.hasFocus()).to.be.true();
		});

		it('should spot item 3 on First panel on Back key', function () {
			Page.open();
			Page.item3.moveToObject();
			browser.pause(5000)
			Page.spotlightSelect();
			browser.pause(1000)
			Page.spotlightSelect();
			browser.pause(1000)
			Page.backKey();
			browser.pause(1000)
			Page.backKey();
			browser.pause(1000)

			browser.pause(2000)
			const actual = Page.item3.hasFocus();

			expect(actual).to.be.true();
		});

		it('should spot button 1 on First panel on Back key', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightLeft();
			Page.spotlightSelect();
			Page.spotlightSelect();
			Page.backKey();
			Page.backKey();

			browser.pause(2000)
			const actual = Page.button1.hasFocus();

			expect(actual).to.be.true();
		});

		it('should spot eighth item on second panel', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightSelect();
			browser.pause(2000)
			Page.spotlightLeft();
			Page.spotlightRight();
			browser.pause(2000)
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightLeft();
			Page.spotlightRight();

			const actual = Page.item8.hasFocus();

			expect(actual).to.be.true();
		});

		it('should spot third item on first panel', function () {
			Page.open();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightDown();
			Page.spotlightSelect();
			browser.pause(2000)
			Page.spotlightLeft();
			Page.spotlightSelect();
			browser.pause(2000)

			const actual = Page.item3.hasFocus();

			expect(actual).to.be.true();
		})
	})
});

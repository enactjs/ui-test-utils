let Page = require('./ActivityPanelsPage');

describe('ActivityPanels', function () {
	it('should load first panel.', function () {
		Page.open();
		expect(Page.panelTitle).to.equal('FIRST');
	});

	it('should have breadcrumb on second panel', function () {
		Page.open();
		Page.button1.click();
		browser.pause(1000);

		expect(Page.breadcrumbHeader.getText()).to.include('01');
	});

	describe('Transition', function () {
		it('should move from first panel to the second', function () {
			Page.open();
			Page.button1.click()
			browser.pause(1000)

			expect(Page.panelTitle).to.equal('SECOND');
		});
	});

	describe('Spotlight', function () {
		it('should spot close button on render', function () {
			Page.open();
			expect(Page.closeButton.hasFocus()).to.be.true();
		});

		describe('pointer', function () {
			it('should navigate to DEFAULT ELEMENT', function () {
				Page.open();
				browser.pause(1000)
				Page.item1.click();
				browser.pause(1000)
				Page.item5.click();
				browser.pause(1000)
				Page.button4.click();
				browser.pause(1000)
				Page.item2.click();
				browser.pause(1000)

				expect(Page.panelTitle).to.equal('DEFAULT ELEMENT');
			});

			it('should navigate back to the First panel from clicking on breadcrumb', function () {
				Page.open();
				browser.pause(1000)
				Page.item1.click();
				browser.pause(1000)
				Page.item5.click();
				browser.pause(1000)
				Page.button4.click();
				browser.pause(1000)
				Page.item2.click();
				browser.pause(1000)
				Page.breadcrumbHeader.click();
				browser.pause(1000)
				Page.breadcrumbHeader.click();
				browser.pause(1000)
				Page.breadcrumbHeader.click();
				browser.pause(1000)
				Page.breadcrumbHeader.click();
				browser.pause(1000)

				expect(Page.panelTitle).to.equal('FIRST');
			});


			it('should navigate back to the First panel from clicking on breadcrumb', function () {
				Page.open();
				browser.pause(1000)
				Page.item1.click();
				browser.pause(1000)
				Page.item5.click();
				browser.pause(1000)
				Page.breadcrumbHeader.click();
				browser.pause(1000)
				Page.item8.click();
				browser.pause(1000)
				Page.button4.click();
				browser.pause(1000)
				Page.breadcrumbHeader.click();
				browser.pause(1000)

				expect(Page.panelTitle).to.equal('THIRD');

			});




		})

		describe('5way', function () {
			it('should transition back to First panel with back key', function () {
				Page.open();
				Page.button1.click();
				Page.backKey();

				browser.pause(1000)

				expect(Page.panelTitle).to.equal('FIRST');
			});

			it('should spot first item on second panel', function () {
				Page.open();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(1000)

				expect(Page.item5.hasFocus()).to.be.true();
			});


			it('should spot second item on first panel when using back key', function () {
				Page.open();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.backKey();
				browser.pause(1000)

				expect(Page.item2.hasFocus()).to.be.true();
			});

			it('should spot button 4 in Third panel', function () {
				Page.open();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightRight();
				Page.spotlightDown();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)

				expect(Page.button4.hasFocus()).to.be.true();
			});

			it('should spot button 1 on First panel on Back key', function () {
				Page.open();
				Page.spotlightDown();
				Page.spotlightLeft();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)
				Page.backKey();
				browser.pause(1000)
				Page.backKey();
				browser.pause(1000)

				expect(Page.button1.hasFocus()).to.be.true();
			});

			it('should spot eighth item on second panel', function () {
				Page.open();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightLeft();
				Page.spotlightRight();
				browser.pause(1000)
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightLeft();
				Page.spotlightRight();

				expect(Page.item8.hasFocus()).to.be.true();
			});


			it('should spot third item on first panel', function () {
				Page.open();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightLeft();
				Page.spotlightSelect();
				browser.pause(1000);

				expect(Page.item3.hasFocus()).to.be.true();
			})
		});

		describe('both', function () {
			it('should move from first panel to the third', function () {
				Page.open();
				Page.button1.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.item8.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)

				expect(Page.panelTitle).to.equal('THIRD');
			});


			it('should move to first panel from the third', function () {
				Page.open();
				Page.button1.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.item8.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.breadcrumbHeader.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.item8.moveToObject();
				Page.breadcrumbHeader.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)

				expect(Page.panelTitle).to.equal('FIRST');
			});

			it('should not spot in None panel', function () {
				Page.open();
				Page.button1.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.item8.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)

				expect(Page.body.hasFocus()).to.be.true();

			});

			it('should spot in Default panel', function () {
				Page.open();
				Page.button1.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.item8.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(1000)


				expect(Page.item5.hasFocus()).to.be.true();

			});

			it('should spot in Default panel', function () {
				Page.open();
				Page.button1.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.item8.moveToObject();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightDown();
				browser.pause(1000)
				Page.backKey();
				browser.pause(1000)
				Page.spotlightDown();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(1000)

				expect(Page.item5.hasFocus()).to.be.true();

			});

			it('should spot item 3 on First panel on Back key', function () {
				Page.open();
				Page.item3.moveToObject();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)
				Page.spotlightSelect();
				browser.pause(1000)
				Page.backKey();
				browser.pause(1000)
				Page.backKey();
				browser.pause(1000)

				expect(Page.item3.hasFocus()).to.be.true();
			});
		})
	})
});

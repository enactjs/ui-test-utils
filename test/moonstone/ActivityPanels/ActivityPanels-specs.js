let Page = require('./ActivityPanelsPage');

describe('ActivityPanels', function () {
	beforeEach(function () {
		Page.open();
	});

	it('should load first panel.', function () {
		expect(Page.panelTitle).to.equal('FIRST');
	});

	it('should have breadcrumb on second panel', function () {
		Page.button1.click();
		Page.waitTransitionEnd();

		expect(Page.breadcrumbHeader.getText()).to.include('01');
	});

	describe('Transition', function () {
		it('should move from first panel to the second', function () {
			Page.button1.click();
			Page.waitTransitionEnd();

			expect(Page.panelTitle).to.equal('SECOND');
		});

		it('should navigate to DEFAULT ELEMENT', function () {
			Page.item1.click();
			Page.waitTransitionEnd();
			Page.item5.click();
			Page.waitTransitionEnd();
			Page.button4.click();
			Page.waitTransitionEnd();
			Page.item2.click();
			Page.waitTransitionEnd();

			expect(Page.panelTitle).to.equal('DEFAULT ELEMENT');
		});

		it('should navigate back to the First panel from clicking on breadcrumb', function () {
			Page.item1.click();
			Page.waitTransitionEnd();
			Page.item5.click();
			Page.waitTransitionEnd();
			Page.button4.click();
			Page.waitTransitionEnd();
			Page.item2.click();
			Page.waitTransitionEnd();
			Page.breadcrumbHeader.click();
			Page.waitTransitionEnd();
			Page.breadcrumbHeader.click();
			Page.waitTransitionEnd();
			Page.breadcrumbHeader.click();
			Page.waitTransitionEnd();
			Page.breadcrumbHeader.click();
			Page.waitTransitionEnd();

			expect(Page.panelTitle).to.equal('FIRST');
		});

		it('should navigate back to the Third panel from clicking on breadcrumb', function () {
			Page.item1.click();
			Page.waitTransitionEnd();
			Page.item5.click();
			Page.waitTransitionEnd();
			Page.breadcrumbHeader.click();
			Page.waitTransitionEnd();
			Page.item8.click();
			Page.waitTransitionEnd();
			Page.button4.click();
			Page.waitTransitionEnd();
			Page.breadcrumbHeader.click();
			Page.waitTransitionEnd();

			expect(Page.panelTitle).to.equal('THIRD');
		});

		it('should move from first panel to the third', function () {
			Page.button1.moveToObject();
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expect(Page.panelTitle).to.equal('SECOND');
			Page.item8.moveToObject();
			Page.spotlightSelect();
			Page.waitTransitionEnd();

			expect(Page.panelTitle).to.equal('THIRD');
		});

		it('should move to first panel from the third', function () {
			Page.button1.moveToObject();
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expect(Page.panelTitle).to.equal('SECOND');
			Page.item8.moveToObject();
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expect(Page.panelTitle).to.equal('THIRD');
			Page.breadcrumbHeader.moveToObject();
			Page.spotlightSelect();
			Page.waitTransitionEnd();
			expect(Page.panelTitle).to.equal('SECOND');
			Page.item8.moveToObject();
			Page.breadcrumbHeader.moveToObject();
			Page.spotlightSelect();
			Page.waitTransitionEnd();

			expect(Page.panelTitle).to.equal('FIRST');
		});

		it('should transition back to First panel with back key', function () {
			Page.button1.click();
			Page.waitTransitionEnd();
			expect(Page.panelTitle).to.equal('SECOND');
			Page.backKey();
			Page.waitTransitionEnd();

			expect(Page.panelTitle).to.equal('FIRST');
		});
	});

	describe('Spotlight', function () {
		it('should spot item 1 on render', function () {
			expect(Page.item1.hasFocus()).to.be.true();
		});

		describe('pointer', function () {
			it('should spot last focused item when transitioning back', function () {
				Page.item2.click();
				Page.waitTransitionEnd();
				Page.backKey();
				Page.waitTransitionEnd();

				expect(Page.item2.hasFocus()).to.be.true();
			});

			it('should spot last focused item when transitioning back after moving pointer', function () {
				Page.item2.click();
				Page.waitTransitionEnd();
				Page.item8.moveToObject();
				Page.backKey();
				Page.waitTransitionEnd();

				expect(Page.item2.hasFocus()).to.be.true();
			});
		});


		describe('5way', function () {
			it('should spot first item on second panel', function () {
				Page.spotlightSelect();
				Page.waitTransitionEnd();

				expect(Page.item5.hasFocus()).to.be.true();
			});


			it('should spot last focused item when transitioning back using back key', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.item5.hasFocus()).to.be.true();
				Page.backKey();
				Page.waitTransitionEnd();

				expect(Page.item2.hasFocus()).to.be.true();
			});

			// Revisit this test.  As we can't focus the breadcrumb with 5-way by going down right now
			// we can't have button 4 have the last focus.  Possibly related to ENYO-5151.
			it.only('should spot last focused item when transitioning back from Third panel', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.item5.hasFocus(), 'Item 5 focus').to.be.true();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.button3.hasFocus(), 'Button 3 focus').to.be.true();
				Page.spotlightRight();
				expect(Page.button4.hasFocus(), 'Button 4 focus').to.be.true();
				Page.spotlightLeft();
				Page.spotlightLeft();
				expect(Page.breadcrumb.hasFocus(), 'Breadcrumb focus').to.be.true();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.item5.hasFocus(), 'Item 5 refocus').to.be.true();
			});

			it('should spot last focused item in first panel when transitioning after deep navigation', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				Page.spotlightDown();
				expect(Page.item6.hasFocus(), 'Item 6 focus').to.be.true();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.button3.hasFocus(), 'Button 3 focus').to.be.true();
				Page.backKey();
				Page.waitTransitionEnd();
				expect(Page.item6.hasFocus(), 'Item 6 refocus').to.be.true();
				Page.backKey();
				Page.waitTransitionEnd();

				expect(Page.item2.hasFocus(), 'Item 2 refocus').to.be.true();
			});

			it('should spot eighth item on second panel', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.item5.hasFocus()).to.be.true();
				Page.spotlightLeft();
				expect(Page.breadcrumb.hasFocus()).to.be.true();
				Page.spotlightRight();
				expect(Page.item5.hasFocus()).to.be.true();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightLeft();
				Page.spotlightRight();

				expect(Page.item8.hasFocus()).to.be.true();
			});


			it('should spot third item on first panel', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.item5.hasFocus()).to.be.true();
				Page.spotlightLeft();
				Page.spotlightSelect();
				Page.waitTransitionEnd();

				expect(Page.item3.hasFocus()).to.be.true();
			});
		});

		describe('5way and pointer', function () {
			it('should not spot in None panel', function () {
				Page.button1.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.panelTitle).to.equal('SECOND');
				Page.item8.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.button3.hasFocus()).to.be.true();
				Page.spotlightSelect();
				Page.waitTransitionEnd();

				expect(Page.body.hasFocus()).to.be.true();

			});

			it('should spot default item in Default panel', function () {
				Page.button1.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.panelTitle).to.equal('SECOND');
				Page.item8.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.panelTitle).to.equal('THIRD');
				Page.button4.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.panelTitle).to.equal('NONE');
				Page.button2.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();

				expect(Page.item5.hasFocus()).to.be.true();
			});

			it('should re-spot in Default panel', function () {
				Page.button1.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.item5.hasFocus(), 'item 5 focus 1').to.be.true();
				Page.item8.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.button3.hasFocus(), 'button 3 focus').to.be.true();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.body.hasFocus(), 'body focus').to.be.true();
				Page.spotlightDown();
				expect(Page.breadcrumb.hasFocus(), 'breadcrumb focus').to.be.true();
				Page.button1.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.item5.hasFocus(), 'item 5 focus 2').to.be.true();
				Page.spotlightDown();
				Page.backKey();
				Page.waitTransitionEnd();
				Page.spotlightDown();
				Page.spotlightSelect();
				Page.waitTransitionEnd();

				expect(Page.item5.hasFocus(), 'item 5 focus 3').to.be.true();

			});

			it('should spot last focused item when transitioning back with Back key, deep navigation', function () {
				Page.item3.moveToObject();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.item5.hasFocus()).to.be.true();
				Page.spotlightSelect();
				Page.waitTransitionEnd();
				expect(Page.button3.hasFocus()).to.be.true();
				Page.backKey();
				Page.waitTransitionEnd();
				expect(Page.item5.hasFocus()).to.be.true();
				Page.backKey();
				Page.waitTransitionEnd();

				expect(Page.item3.hasFocus()).to.be.true();
			});
		});
	});
});

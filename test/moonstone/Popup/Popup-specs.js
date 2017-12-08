let Page = require('./PopupPage'),
	{validateTitle, expectClosed, expectOpen} = require('./Popup-utils.js');

describe('Popup', function () {
	const popup = Page.components.popupCommon;

	beforeEach(function () {
		Page.open();
	});

	it('should focus the first button on start', function () {
		expect(popup.buttonPopup1.hasFocus()).to.be.true();
	});

	it('should not have the popup on start', function () {
		expectClosed(popup);
	});

	describe('popup1', function () {
		const popup1 = Page.components.popup1;

		it('should have correct title', function () {
			popup.buttonPopup1.click();
			browser.pause(250);
			expectOpen(popup);
			validateTitle(popup1, 'Hello Popup1');
		});

		describe('auto dismiss', function () {

			it('should dismiss the popup on escape key', function () {
				popup.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popup);
				Page.escButton();
				browser.pause(250);
				expectClosed(popup);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popup.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popup);
				Page.clickPopup();
				browser.pause(250);
				expectClosed(popup);
			});
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				expect(popup1.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				expect(popup1.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot close button on two 5-way right in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightRight();
				console.log(popup1.buttonClose)
				expect(popup1.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way up in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup1.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup1.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup1.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popup);
				expect(popup.buttonPopup1.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.escButton();
				browser.pause(250);
				expectClosed(popup);
				expect(popup.buttonPopup1.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', function () {
				popup.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popup);
			});

			it('should show close button in the popup container on display', function () {
				popup.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popup);
				expect(popup1.isCloseButton).to.be.true();
			});

			it('should close the popup and scrim on click in popup container', function () {
				popup.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popup);
				popup1.buttonOK.click();
				browser.pause(250);
				expectClosed(popup);
			});

			it('should close the popup and scrim on cancel click in popup container', function () {
				popup.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popup);
				popup1.buttonCancel.click();
				browser.pause(250);
				expectClosed(popup);
			});

			it('should close the popup and scrim on close click in popup container', function () {
				popup.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popup);
				popup1.buttonClose.click();
				browser.pause(250);
				expectClosed(popup);
			});
		});
	});

	describe('popup2', function () {
		const popup2 = Page.components.popup2;

		it('should have correct title', function () {
			popup.buttonPopup2.click();
			browser.pause(250);
			expectOpen(popup);
			validateTitle(popup2, 'Hello Popup2');
		});

		describe('no auto dismiss', function () {
			it('should not dismiss the popup on escape key', function () {
				popup.buttonPopup2.click();
				browser.pause(250);
				expectOpen(popup);
				Page.escButton();
				browser.pause(250);
				expectOpen(popup);
			});

			it('should not dismiss the popup on click on outside the popup', function () {
				popup.buttonPopup2.click();
				browser.pause(250);
				expectOpen(popup);
				Page.clickPopup();
				browser.pause(250);
				expectOpen(popup);
			});
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				expect(popup2.buttonOK.hasFocus()).to.be.true();
			});

			it('should not dismiss the popup and should not move spotlight from the popup container', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.escButton();
				browser.pause(250);
				expectOpen(popup);
				expect(popup2.buttonOK.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {
			it('should open the popup with scrim on click', function () {
				popup.buttonPopup2.click();
				browser.pause(250);
				expectOpen(popup);
			});

			it('should show close button in the popup container on display', function () {
				popup.buttonPopup2.click();
				browser.pause(250);
				expectOpen(popup);
				expect(popup2.isCloseButton).to.be.true();
			});

			it('should close the popup and scrim on click in popup container', function () {
				popup.buttonPopup2.click();
				browser.pause(250);
				expectOpen(popup);
				popup2.buttonOK.click();
				browser.pause(250);
				expectClosed(popup);
			});
		});
	});

	describe('popup3', function () {
		const popup3 = Page.components.popup3;

		it('should have correct title', function () {
			popup.buttonPopup3.click();
			browser.pause(250);
			expectOpen(popup);
			validateTitle(popup3, 'Hello Popup3');
		});
		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				expect(popup3.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				expect(popup3.buttonCancel.hasFocus()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup3.buttonCancel.hasFocus()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup3.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup3.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popup);
				expect(popup.buttonPopup3.hasFocus()).to.be.true();
			});

			it('should close the popup on spotlight select on cancel in the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popup);
				expect(popup.buttonPopup3.hasFocus()).to.be.true();
			});

			it('hould close the popup on spotlight select on close in the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popup);
				expect(popup.buttonPopup3.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.escButton();
				browser.pause(250);
				expectClosed(popup);
				expect(popup.buttonPopup3.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', function () {
				popup.buttonPopup3.click();
				browser.pause(250);
				expectOpen(popup);
			});

			it('should not show close button in the popup container on display', function () {
				popup.buttonPopup3.click();
				browser.pause(250);
				expectOpen(popup);
				expect(popup3.isCloseButton).to.be.false();
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				popup.buttonPopup3.click();
				browser.pause(250);
				expectOpen(popup);
				popup3.buttonOK.click();
				browser.pause(250);
				expectClosed(popup);
			});
		});
	});

	describe('popup4', function () {
		const popup4 = Page.components.popup4;

		it('should have correct title', function () {
			popup.buttonPopup4.click();
			browser.pause(250);
			expectOpen(popup);
			validateTitle(popup4, 'Hello Popup4');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				expect(popup4.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot close button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				expect(popup4.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup4.buttonOK.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup4.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup4.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup4.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popup);
				expect(popup.buttonPopup4.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popup);
				Page.escButton();
				browser.pause(250);
				expectClosed(popup);
				expect(popup.buttonPopup4.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', function () {
				popup.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popup);
			});

			it('should show close button in the popup container on display', function () {
				popup.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popup);
				expect(popup4.isCloseButton).to.be.true();
			});

			it('should close the popup and scrim on click in popup container', function () {
				popup.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popup);
				popup4.buttonOK.click();
				browser.pause(250);
				expectClosed(popup);
			});
		});
	});
});

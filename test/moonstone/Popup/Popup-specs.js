let Page = require('./PopupPage'),
	{validateTitle, expectClosed, expectOpen, expectNoneScrimOpen, expectCloseButton} = require('./Popup-utils.js');

describe('Popup', function () {

	const popupCommon = Page.popupCommon;

	beforeEach(function () {
		Page.open();
	});

	it('should focus the first button on start', function () {
		expect(popupCommon.buttonPopup1.hasFocus()).to.be.true();
	});

	it('should not have the popup on start', function () {
		expectClosed(popupCommon);
	});

	describe('Popup with AutoDismiss', function () {

		const popup = Page.components.popup1;

		it('should have correct title', function () {
			popupCommon.buttonPopup1.click();
			browser.pause(250);
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup with AutoDismiss');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot close button on two 5-way right in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way up in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup1.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup1.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.clickPopupFloatLayer();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				popupCommon.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on click in popup container', function () {
				popupCommon.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonOK.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', function () {
				popupCommon.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonCancel.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on close click in popup container', function () {
				popupCommon.buttonPopup1.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonClose.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup without AutoDismiss', function () {

		const popup = Page.components.popup2;

		it('should have correct title', function () {
			popupCommon.buttonPopup2.click();
			browser.pause(250);
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup without AutoDismiss');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not dismiss the popup and should not move spotlight from the popup container', function () {
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should not dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup2.click();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.clickPopupFloatLayer();
				browser.pause(250);
				expectOpen(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup2.click();
				browser.pause(250);
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				popupCommon.buttonPopup2.click();
				browser.pause(250);
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				popupCommon.buttonPopup2.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonOK.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup with no Component', function () {

		const popup = Page.components.popup3;

		it('should have correct title', function () {
			popupCommon.buttonPopup3.click();
			browser.pause(250);
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup with no Component');
		});

		describe('5-way', function () {

			it('should open the popup in no Component button select', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup3.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup3.click();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup3.click();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.clickPopupFloatLayer();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup3.click();
				browser.pause(250);
				expectOpen(popupCommon);
			});
		});
	});

	describe('Popup with noAnimation', function () {

		const popup = Page.components.popup4;

		it('should have correct title', function () {
			popupCommon.buttonPopup4.click();
			browser.pause(250);
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup without Animation');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot close button on two 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way up in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup4.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup4.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.clickPopupFloatLayer();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on click in popup container', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonOK.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonCancel.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on close click in popup container', function () {
				popupCommon.buttonPopup4.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonClose.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup without Close Button', function () {

		const popup = Page.components.popup5;

		it('should have correct title', function () {
			popupCommon.buttonPopup5.click();
			browser.pause(250);
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup without Close button');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should not move spot from cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.hasFocus()).to.be.true();
			});
			it('should close the popup on spotlight select on cancel in the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.hasFocus()).to.be.true();
			});
			it('should close the popup on spotlight select on close in the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup5.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup5.click();
				browser.pause(250);
				expectOpen(popupCommon);
			});

			it('should not show close button in the popup container on display', function () {
				popupCommon.buttonPopup5.click();
				browser.pause(250);
				expectOpen(popupCommon);
				expect(popup.isCloseButton).to.be.false();
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				popupCommon.buttonPopup5.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonOK.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup spotlightRight - none', function () {

		const popup = Page.components.popup6;

		it('should have correct title', function () {
			popupCommon.buttonPopup6.click();
			browser.pause(250);
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup spotlightRestrict is none');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup6.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup6.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup6.click();
				browser.pause(250);
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				popupCommon.buttonPopup6.click();
				browser.pause(250);
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				popupCommon.buttonPopup6.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonOK.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup spotlightRight - self-first', function () {

		const popup = Page.components.popup7;

		it('should have correct title', function () {
			popupCommon.buttonPopup7.click();
			browser.pause(250);
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup spotlightRestrict is self-first');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way left in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup7.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup7.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup7.click();
				browser.pause(250);
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				popupCommon.buttonPopup7.click();
				browser.pause(250);
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on ok click in popup container', function () {
				popupCommon.buttonPopup7.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonOK.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup scrimType - transparent', function () {

		const popup = Page.components.popup8;

		it('should have correct title', function () {
			popupCommon.buttonPopup8.click();
			browser.pause(250);
			expectOpen(popupCommon);
			validateTitle(popup, 'Popup scrimType is transparent');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup8.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup8.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup8.click();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup8.click();
				browser.pause(250);
				expectOpen(popupCommon);
				Page.clickPopupFloatLayer();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should open the popup with scrim on click', function () {
				popupCommon.buttonPopup8.click();
				browser.pause(250);
				expectOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				popupCommon.buttonPopup8.click();
				browser.pause(250);
				expectOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup and scrim on click in popup container', function () {
				popupCommon.buttonPopup8.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonOK.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on cancel click in popup container', function () {
				popupCommon.buttonPopup8.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonCancel.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should close the popup and scrim on close click in popup container', function () {
				popupCommon.buttonPopup8.click();
				browser.pause(250);
				expectOpen(popupCommon);
				popup.buttonClose.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});
		});
	});

	describe('Popup scrimType - none', function () {

		const popup = Page.components.popup9;

		it('should have correct title', function () {
			popupCommon.buttonPopup9.click();
			browser.pause(3250);
			expectNoneScrimOpen(popupCommon);
			validateTitle(popup, 'Popup scrimType is none');
		});

		describe('5-way', function () {

			it('should spot default button in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot cancel button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				expect(popup.buttonCancel.hasFocus()).to.be.true();
			});

			it('should spot back the ok button on 5-way right then left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way left in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightUp();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should not move spot from close button on 5-way right in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightRight();
				expect(popup.buttonClose.hasFocus()).to.be.true();
			});

			it('should spot the cancel button on 5-way right then down in popup container', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				Page.spotlightRight();
				Page.spotlightLeft();
				expect(popup.buttonOK.hasFocus()).to.be.true();
			});

			it('should spot back the popup button on closing the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				Page.spotlightSelect();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup9.hasFocus()).to.be.true();

			});

			it('should spot back the popup button on auto dismiss the popup', function () {
				Page.spotlightRight();
				Page.spotlightRight();
				Page.spotlightDown();
				Page.spotlightDown();
				Page.spotlightSelect();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
				expect(popupCommon.buttonPopup9.hasFocus()).to.be.true();
			});
		});

		describe('pointer', function () {

			it('should dismiss the popup on escape key', function () {
				popupCommon.buttonPopup9.click();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				Page.escButton();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should dismiss the popup on click on outside the popup', function () {
				popupCommon.buttonPopup9.click();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				Page.clickPopupMain();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should open the popup without scrim on click', function () {
				popupCommon.buttonPopup9.click();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
			});

			it('should show close button in the popup container on display', function () {
				popupCommon.buttonPopup9.click();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				expectCloseButton(popup);
			});

			it('should close the popup on click in popup container', function () {
				popupCommon.buttonPopup9.click();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				popup.buttonOK.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should close the popup on cancel click in popup container', function () {
				popupCommon.buttonPopup9.click();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				popup.buttonCancel.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});

			it('should close the popup on close click in popup container', function () {
				popupCommon.buttonPopup9.click();
				browser.pause(250);
				expectNoneScrimOpen(popupCommon);
				popup.buttonClose.click();
				browser.pause(250);
				expectClosed(popupCommon);
			});
		});
	});
});

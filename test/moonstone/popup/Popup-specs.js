let Page = require('./PopupPage');

describe('Popup', function () {

	it('should focus the button on start', function () {
		Page.open();
		expect(Page.buttonPopup.hasFocus()).to.be.true();
	});

	it('should not have the popup on start', function () {
		Page.open();
		expect(Page.popupLayer.isExisting(Page.popupClass)).to.be.false();
	});

	describe('5-way', function () {

		it('should spot button on 5-way down', function () {
			Page.open();
			Page.spotlightDown();
			expect(Page.buttonPopup.hasFocus()).to.be.true();
		});

		it('should spot default button in popup container', function () {
			Page.open();
			Page.spotlightSelect();
			browser.pause(250);
			expect(Page.buttonOK.hasFocus()).to.be.true();
		});

		it('should spot cancel button on 5-way right in popup container', function () {
			Page.open();
			Page.spotlightSelect();
			browser.pause(250);
			Page.spotlightRight();
			expect(Page.buttonCancel.hasFocus()).to.be.true();
		});

		it('should spot close button on two 5-way right in popup container', function () {
			Page.open();
			Page.spotlightSelect();
			browser.pause(250);
			Page.spotlightRight();
			Page.spotlightRight();
			expect(Page.buttonClose.hasFocus()).to.be.true();
		});

		it('should not move spot from close button on 5-way up in popup container', function () {
			Page.open();
			Page.spotlightSelect();
			browser.pause(250);
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightUp();
			expect(Page.buttonClose.hasFocus()).to.be.true();
		});

		it('should not move spot from close button on 5-way right in popup container', function () {
			Page.open();
			Page.spotlightSelect();
			browser.pause(250);
			Page.spotlightRight();
			Page.spotlightRight();
			Page.spotlightRight();
			expect(Page.buttonClose.hasFocus()).to.be.true();
		});

		it('should spot back the ok button on 5-way right then left in popup container', function () {
			Page.open();
			Page.spotlightSelect();
			browser.pause(250);
			Page.spotlightRight();
			Page.spotlightLeft();
			expect(Page.buttonOK.hasFocus()).to.be.true();
		});

		it('should spot back the popup button on closing the popup', function () {
			Page.open();
			Page.spotlightSelect();
			browser.pause(250);
			Page.spotlightSelect();
			browser.pause(250);
			expect(Page.buttonPopup.hasFocus()).to.be.true();
		});

		it('should spot back the popup button on closing the popup', function () {
			Page.open();
			Page.spotlightSelect();
			browser.pause(250);
			Page.escButton();
			browser.pause(250);
			expect(Page.buttonPopup.hasFocus()).to.be.true();
		});
	});

	describe('pointer', function () {

		it('should open the popup on click', function () {
			Page.open();
			Page.buttonPopup.click();
			browser.pause(250);
			expect(Page.popupLayer.isExisting(Page.popupClass)).to.be.true();
		});

		it('should show popup title on display', function () {
			Page.open();
			Page.buttonPopup.click();
			browser.pause(250);
			expect(Page.popupTitle).to.equal(Page.popupTitleText);
		});

		it('should show close button in the popup container on display', function () {
			Page.open();
			Page.buttonPopup.click();
			browser.pause(250);
			expect(Page.popupMain.isExisting(Page.iconButtonClass)).to.be.true();
		});

		it('should enable the scrim on popup display', function () {
			Page.open();
			Page.buttonPopup.click();
			browser.pause(250);
			expect(Page.popupLayer.isExisting(Page.scrimClass)).to.be.true();
		});

		it('should close the popup on click in popup container', function () {
			Page.open();
			Page.buttonPopup.click();
			browser.pause(250);
			Page.buttonOK.click();
			browser.pause(250);
			expect(Page.popupLayer.isExisting(Page.popupClass)).to.be.false();
		});

		it('should close the scrim on click in popup container', function () {
			Page.open();
			Page.buttonPopup.click();
			browser.pause(250);
			Page.buttonOK.click();
			browser.pause(250);
			expect(Page.popupLayer.isExisting(Page.scrimClass)).to.be.false();
		});
	});
});
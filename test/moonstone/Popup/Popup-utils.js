// Utility methods for testing

function validateTitle (popup, title) {
	expect(popup.title).to.equal(title);
}

function expectClosed (popup) {
	expect(popup.isPopup).to.be.false();
	expect(popup.isScrim).to.be.false();
}

function expectOpen (popup) {
	expect(popup.isPopup).to.be.true();
	expect(popup.isScrim).to.be.true();
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen
}

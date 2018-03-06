// A set of utility methods for testing
module.exports = {
	expectChecked,
	expectRTL,
	expectUnchecked
};

// Expect blocks
function expectChecked (checkboxItem) {
	expect(checkboxItem.isChecked).to.be.true();
	expect(checkboxItem.icon.isVisible()).to.be.true();
}

function expectUnchecked (checkboxItem) {
	expect(checkboxItem.isChecked).to.be.false();
	expect(checkboxItem.icon.isVisible()).to.be.false();
}

function expectRTL ({leftElement, rightElement}) {
	expect(browser.getLocation(leftElement, 'x') > browser.getLocation(rightElement, 'x')).to.be.true();
}

// A set of utility methods for testing
module.exports = {
	expectChecked,
	expectInline,
	expectLTR,
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

function expectInline ({checkboxItem1, checkboxItem2}) {
	expect(browser.getLocation(checkboxItem1, 'x') === browser.getLocation(checkboxItem2, 'x')).to.be.false();
}

function expectLTR ({leftElement, rightElement}) {
	expect(browser.getLocation(leftElement, 'x') < browser.getLocation(rightElement, 'x')).to.be.true();
}

function expectRTL ({leftElement, rightElement}) {
	expect(browser.getLocation(leftElement, 'x') > browser.getLocation(rightElement, 'x')).to.be.true();
}

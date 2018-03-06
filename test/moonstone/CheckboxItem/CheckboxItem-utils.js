// A set of utility methods for testing
module.exports = {
	expectChecked,
	expectUnchecked,
	expectRTL
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
	expect(leftElement > rightElement).to.be.true();
}

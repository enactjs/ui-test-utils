// A set of utility methods for testing
module.exports = {
	expectChecked,
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

// A set of utility methods for testing
module.exports = {
	expectSelected,
	expectUnselected
};

// Expect blocks
function expectSelected (checkboxItem) {
	expect(checkboxItem.isSelected).to.be.true();
	expect(checkboxItem.isToggled).to.be.true();
}

function expectUnselected (checkboxItem) {
	expect(checkboxItem.isSelected).to.be.false();
	expect(checkboxItem.isToggled).to.be.false();
}

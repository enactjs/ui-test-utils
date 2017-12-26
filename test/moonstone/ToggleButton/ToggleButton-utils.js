// A set of utility methods for testing
module.exports = {
	expectSelected,
	expectUnselected
};

// Expect blocks
function expectSelected (toggleButton) {
	expect(toggleButton.isSelected).to.be.true();
}

function expectUnselected (toggleButton) {
	expect(toggleButton.isSelected).to.be.false();
}

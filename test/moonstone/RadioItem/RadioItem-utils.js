// A set of utility methods for testing
module.exports = {
	expectSelected,
	expectUnselected
};

// Expect blocks
function expectSelected (radioItem) {
	expect(radioItem.isSelected).to.be.true();
}

function expectUnselected (radioItem) {
	expect(radioItem.isSelected).to.be.false();
}

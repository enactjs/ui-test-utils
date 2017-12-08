// A set of utility methods for testing
module.exports = {
	expectSelected,
	expectUnselected
};

// Expect blocks
function expectSelected (switchItem) {
	expect(switchItem.isSelected).to.be.true();
}

function expectUnselected (switchItem) {
	expect(switchItem.isSelected).to.be.false();
}

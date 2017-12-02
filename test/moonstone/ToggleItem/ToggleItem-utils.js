// A set of utility methods for testing
module.exports = {
	expectSelected,
	expectUnselected
};

// Expect blocks
function expectSelected (toggleItem) {
	expect(toggleItem.isSelected).to.be.true();
	expect(toggleItem.icon.isVisible()).to.be.true();
}

function expectUnselected (toggleItem) {
	expect(toggleItem.isSelected).to.be.false();
	expect(toggleItem.icon.isVisible()).to.be.false();
}

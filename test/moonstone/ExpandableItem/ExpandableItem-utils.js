// Utility methods for testing

// Validations are self-contained 'it' statements
function validateTitle (item, title) {
	it('should have correct title', function () {
		const match = item.titleText === title;
		expect(match).to.be.true();
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
function expectClosed (item) {
	expect(item.isOpen).to.be.false();
	expect(item.chevron).to.equal('󯿭');
}

function expectOpen (item) {
	expect(item.isOpen).to.be.true();
	expect(item.chevron).to.equal('󯿮');
}

module.exports = {
	expectClosed,
	expectOpen,
	validateTitle
};

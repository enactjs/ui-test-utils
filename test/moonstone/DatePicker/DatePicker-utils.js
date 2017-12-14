// Utility methods for testing

// Validations are self-contained 'it' statements
function validateTitle (picker, title) {
	it('should have correct title', function () {
		expect(picker.titleText).to.equal(title);
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
function expectClosed (picker) {
	expect(picker.isOpen).to.be.false();
	expect(picker.chevron).to.equal('󯿭');
	expect(picker.month.isVisible()).to.be.false();
}

function expectOpen (picker) {
	expect(picker.isOpen).to.be.true();
	expect(picker.chevron).to.equal('󯿮');
	expect(picker.month.isVisible()).to.be.true();
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen
}

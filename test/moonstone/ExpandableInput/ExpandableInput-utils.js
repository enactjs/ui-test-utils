// Utility methods for testing

// Validations are self-contained 'it' statements
function validateTitle (expandable, title) {
	it('should have correct title', function () {
		expect(expandable.titleText).to.equal(title);
	});
}

// Expects are blocks of expects or other commands to be embedded in an 'it' statement
function expectClosed (expandable) {
	expect(expandable.isOpen).to.be.false();
	expect(expandable.chevron).to.equal('󯿭');
	expect(expandable.input.isVisible()).to.be.false();
}

function expectOpen (expandable) {
	expect(expandable.isOpen).to.be.true();
	expect(expandable.chevron).to.equal('󯿮');
	expect(expandable.input.isVisible()).to.be.true();
}

function expectLTR ({leftElement, rightElement}) {
	expect(browser.getLocation(leftElement, 'x') < browser.getLocation(rightElement, 'x')).to.be.true();
}

function expectRTL ({leftElement, rightElement}) {
	expect(browser.getLocation(leftElement, 'x') > browser.getLocation(rightElement, 'x')).to.be.true();
}

module.exports = {
	validateTitle,
	expectClosed,
	expectOpen,
	expectLTR,
	expectRTL
}

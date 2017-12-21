// Utility methods for testing

function validateTitle (tooltip, title) {
	expect(tooltip.title).to.equal(title);
}

function expectOpen (tooltip) {
	browser.pause(200);
	expect(tooltip.isTooltipExist).to.be.false();
	browser.pause(600);
	expect(tooltip.isTooltipExist).to.be.true();
}

function expectDelayOpen (tooltip) {
	browser.pause(200);
	expect(tooltip.isTooltipExist).to.be.false();
	browser.pause(1100);
	expect(tooltip.isTooltipExist).to.be.true();
}

function expectClosed (tooltip) {
	browser.pause(200);
	expect(tooltip.isTooltipExist).to.be.false();
}

function expectAboveCenterArrow (tooltip) {
	expect(tooltip.isAbovePosition).to.be.true();
	expect(tooltip.isCenterArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,4,1,3,3,2.5C1,2,0,1,0,0V5Z');
}

function expectAboveLeftArrow (tooltip) {
	expect(tooltip.isAbovePosition).to.be.true();
	expect(tooltip.isLeftArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,3,1,0,3,0H0V5Z');
}

function expectAboveRightArrow (tooltip) {
	expect(tooltip.isAbovePosition).to.be.true();
	expect(tooltip.isRightArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,3,1,0,3,0H0V5Z');
}

function expectBelowCenterArrow (tooltip) {
	expect(tooltip.isBelowPosition).to.be.true();
	expect(tooltip.isCenterArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,4,1,3,3,2.5C1,2,0,1,0,0V5Z');
}

function expectBelowLeftArrow (tooltip) {
	expect(tooltip.isBelowPosition).to.be.true();
	expect(tooltip.isLeftArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,3,1,0,3,0H0V5Z');
}

function expectBelowRightArrow (tooltip) {
	expect(tooltip.isBelowPosition).to.be.true();
	expect(tooltip.isRightArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,3,1,0,3,0H0V5Z');
}

function expectLeftMiddleArrow (tooltip) {
	expect(tooltip.isLeftPosition).to.be.true();
	expect(tooltip.isMiddleArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,4,1,3,3,2.5C1,2,0,1,0,0V5Z');
}

function expectLeftTopArrow (tooltip) {
	expect(tooltip.isLeftPosition).to.be.true();
	expect(tooltip.isTopArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,3,1,0,3,0H0V5Z');
}

function expectLeftBottomArrow (tooltip) {
	expect(tooltip.isLeftPosition).to.be.true();
	expect(tooltip.isBottomArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,3,1,0,3,0H0V5Z');
}

function expectRightMiddleArrow (tooltip) {
	expect(tooltip.isRightPosition).to.be.true();
	expect(tooltip.isMiddleArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,4,1,3,3,2.5C1,2,0,1,0,0V5Z');
}

function expectRightTopArrow (tooltip) {
	expect(tooltip.isRightPosition).to.be.true();
	expect(tooltip.isTopArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,3,1,0,3,0H0V5Z');
}

function expectRightBottomArrow (tooltip) {
	expect(tooltip.isRightPosition).to.be.true();
	expect(tooltip.isBottomArrow).to.be.true();
	expect(tooltip.getPath).to.equal('M0,5C0,3,1,0,3,0H0V5Z');
}

module.exports = {
	validateTitle,
	expectOpen,
	expectDelayOpen,
	expectClosed,
	expectAboveCenterArrow,
	expectAboveLeftArrow,
	expectAboveRightArrow,
	expectBelowCenterArrow,
	expectBelowLeftArrow,
	expectBelowRightArrow,
	expectLeftMiddleArrow,
	expectLeftTopArrow,
	expectLeftBottomArrow,
	expectRightMiddleArrow,
	expectRightTopArrow,
	expectRightBottomArrow
};

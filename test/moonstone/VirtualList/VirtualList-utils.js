/* global document */
function expectFocusedItem (itemNum, comment = 'focused item') {
	const focusedId = browser.execute(function () { return document.activeElement.id; }).value;
	expect(focusedId, comment).to.equal(`item${itemNum}`);
}

exports.expectFocusedItem = expectFocusedItem;

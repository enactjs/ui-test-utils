/* global document */
function expectFocusedItem (listNum, itemNum, comment = 'focused item') {
	const focusedId = browser.execute(function () { return document.activeElement.id; }).value;
	expect(focusedId, comment).to.equal(`list${listNum}Item${itemNum}`);
}

function expectList1FocusedItem (itemNum, comment) {
	expectFocusedItem(1, itemNum, comment);
}

function expectList2FocusedItem (itemNum, comment) {
	expectFocusedItem(2, itemNum, comment);
}

function expectList3FocusedItem (itemNum, comment) {
	expectFocusedItem(3, itemNum, comment);
}

exports.expectList1FocusedItem = expectList1FocusedItem;
exports.expectList2FocusedItem = expectList2FocusedItem;
exports.expectList3FocusedItem = expectList3FocusedItem;

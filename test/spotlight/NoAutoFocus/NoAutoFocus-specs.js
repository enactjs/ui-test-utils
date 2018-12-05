const Page = require('./NoAutoFocusPage');

describe('NoAutoFocus', () => {

	before(() => {
		Page.open();
	});

	const {view} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(view.isFocused).to.be.false();
	});
});

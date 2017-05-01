let Page = require('./Page');

describe('Spotlight', function () {

	it('should focus and unfocus the button', function () {
		Page.open('localhost:4567');
		Page.button.moveToObject().buttonDown();
		expect(Page.button.hasFocus()).to.be.true();
		browser.moveToObject('body', 0, 0);
		expect(Page.button.hasFocus()).to.be.false();
	});
});

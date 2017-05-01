let Page = require('./Page');

describe('Spotlight', function () {

	it('should focus and unfocus the button', function () {
		browser.url('http://webdriver.io').elements('div').getAttribute('id')
		//Page.open('http://webdriver.io/');
		//Page.button.moveToObject();
		//$('#docsearch').moveToObject(0,0);
		//		browser.url('localhost:4567');
		Page.open('localhost:4567');
		Page.button.moveToObject().buttonDown();
		expect(Page.button.hasFocus()).to.be.true();
		browser.moveToObject('body', 0, 0);
		expect(Page.button.hasFocus()).to.be.false();
	});
});

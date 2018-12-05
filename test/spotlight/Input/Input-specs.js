const Page = require('./InputPage');

describe('Input', () => {

	before(() => {
		Page.open();
	});

	const {defaultInput, button} = Page.components;

	it('1. Verify the first default item has focus.', () => {
		expect(defaultInput.item.hasFocus()).to.be.true();
	});

	it('2. Verify Input has focus when default ExpandableItem is opened.', () => {
		Page.spotlightSelect();
		Page.delay();
		expect(defaultInput.input.hasFocus()).to.be.true();
	});

	// it('4. Verify Input has focus when VKB is closed by pressing the UP key.', () => {
	// 	if (!window.PalmSystem) {
	// 		console.log('It has to be verified on TV.');
	// 		expect(true).toEqual(true);
	// 		return;
	// 	}
	// 	for (let i = 0; i < 3; i++) {
	// 		Page.spotlightUp();
	//
	// 	}
	//
	// 	focusedId = await page.$eval(':focus', item => (item.tagName));
	// 	expect(focusedId).toEqual('INPUT');
	// });

	it('3. Verify button has focus when input is focused after pressing the RIGHT key.', () => {
		Page.spotlightRight();
		expect(button.item.hasFocus()).to.be.true();
	});
});

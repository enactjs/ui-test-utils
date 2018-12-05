const Page = require('./ExpandableInputPage');

describe('ExpandableInput', () => {

	before(() => {
		Page.open();
	});

	const {expandableInput, button} = Page.components;

	it('1. Verify the first default item has focus.', () => {
		expect(expandableInput.body.hasFocus()).to.be.true();
	});

	it('2. Verify Input has focus when default ExpandableItem opens.', () => {
		Page.spotlightSelect();
		Page.delay();
		expect(expandableInput.input.hasFocus()).to.be.true();
	});

	// it('4. VKB shows and close VKB via UP key only. And then verify Input has focus.', () => {
	// 	if (!window.PalmSystem) {
	// 		console.log('It has to be verified on TV.');
	// 		expect(true).to.be.true();
	// 		return;
	// 	}
	// 	Page.spotlightUp();
	// 	Page.spotlightUp();
	// 	Page.spotlightUp();
	// 	expect(expandableInput.input.hasFocus()).to.be.true();
	// });

	it('3. Verify picker body has focus when picker is closed by pressing the DOWN key.', () => {
		Page.spotlightDown();
		Page.delay();
		expect(expandableInput.body.hasFocus()).to.be.true();
	});

	// it('6. Open Picker again. Close VKB by tapping ENTER button of VKB and verify picker body has focus.', () => {
	// 	if (!window.PalmSystem) {
	// 		console.log('It has to be verified on TV.');
	// 		expect(true).to.be.true();
	// 		return;
	// 	}
	// 	Page.spotlightSelect();
	// 	for (let i = 0; i < 6; i++) {
	// 		Page.spotlightRight();
	//
	// 	}
	// 	Page.spotlightUp();
	// 	Page.spotlightSelect();
	// 	expect(expandableInput.body.hasFocus()).to.be.true();
	// });

	it('4. Verify button has focus when press the DOWN key.', () => {
		Page.spotlightDown();
		expect(button.item.hasFocus()).to.be.true();
	});
});

const Page = require('./ExpandableListPage');

describe('ExpandableList', () => {

	before(() => {
		Page.open();
	});

	const {
		expandableListDefault,
		expandableListCOS,
		expandableListNLB,
		extraItem,
		option1,
		option2,
		option4,
		option7
	} = Page.components;

	it('1. Verify the first default item has focus.', () => {
		expect(expandableListDefault.body.hasFocus()).to.be.true();
	});

	it('3.  Verify option1 has focus when default ExpandableItem is opened.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(option1.item.hasFocus()).to.be.true();
	});

	it('4. Verify selected item has focus when select option2, close and open.', () => {
		Page.spotlightDown();
		Page.spotlightSelect();
		Page.spotlightUp();
		Page.spotlightUp();
		Page.waitTransitionEnd();
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(option2.item.hasFocus()).to.be.true();
	});

	it('5. Verify that picker is closed using with UP key only. (no closeOnSelect, autoClose)', () => {
		Page.spotlightUp();
		Page.spotlightUp();
		Page.waitTransitionEnd();
		expect(expandableListDefault.body.hasFocus()).to.be.true();
	});

	it('6. Verify closeOnSelect ExpandableItem has focus by pressing the DOWN key.', () => {
		Page.spotlightDown();
		expect(expandableListCOS.body.hasFocus()).to.be.true();
	});

	it('7. Open picker and verify option4 has focus.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(option4.item.hasFocus()).to.be.true();
	});

	it('8. Select option4, Verify picker is closed automatically.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(expandableListCOS.body.hasFocus()).to.be.true();
	});

	it('9. Verify noLockBottom ExpandableItem has focus by pressing the DOWN key.', () => {
		Page.spotlightDown();
		expect(expandableListNLB.body.hasFocus()).to.be.true();
	});

	it('10. Open picker and verify option7 has focus.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(option7.item.hasFocus()).to.be.true();
	});

	it('11. Even if pressing the DOWN key many times, verify spotlight moves out of picker. (lockBottom) (noLockBottom)', () => {
		Page.spotlightDown();
		Page.spotlightDown();
		Page.spotlightDown();
		expect(extraItem.item.hasFocus()).to.be.true();
	});
});

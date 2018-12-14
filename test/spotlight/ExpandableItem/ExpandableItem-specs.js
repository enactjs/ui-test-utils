const Page = require('./ExpandableItemPage');

describe('ExpandableItem', () => {

	before(() => {
		Page.open();
	});

	const {
		expandableItemDefault,
		expandableAutoClose,
		expandableLockBottom,
		itemInDefault,
		itemInAutoClose,
		itemInLockBottom,
		item2InLockBottom,
		extraItem
	} = Page.components;

	it('1. Verify the first default item has focus.', () => {
		expect(expandableItemDefault.body.hasFocus()).to.be.true();
	});

	it('2. Verify spotlight moves to the first item when default ExpandableItem opens.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(itemInDefault.item.hasFocus()).to.be.true();
	});

	it('3. Close picker and verify spotlight.', () => {
		Page.spotlightUp();
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(expandableItemDefault.body.hasFocus()).to.be.true();
	});

	it('4. Move spotlight to autoClose ExpandableItem.', () => {
		Page.spotlightDown();
		expect(expandableAutoClose.body.hasFocus()).to.be.true();
	});

	it('5. Oepn autoClose ExpandableItem, verify the first item has focus.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(itemInAutoClose.item.hasFocus()).to.be.true();
	});

	it('6. Close picker by pressing the UP key only (autoClose), verify spotlight.', () => {
		Page.spotlightUp();
		Page.waitTransitionEnd();
		expect(expandableAutoClose.body.hasFocus()).to.be.true();
	});

	it('7. Move spotlight to lockBottom ExpandableItem, verify spotlight.', () => {
		Page.spotlightDown();
		expect(expandableLockBottom.body.hasFocus()).to.be.true();
	});

	it('8. Open lockBottom ExpandableItem, Verify the first item has focus.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		expect(itemInLockBottom.item.hasFocus()).to.be.true();
	});

	it('9. Even if pressing the DOWN key many times, verify spotlight does not move out of picker. (lockBottom)', () => {
		for (let i = 0; i < 5; i++) {
			Page.spotlightDown();

		}
		expect(item2InLockBottom.item.hasFocus()).to.be.true();
	});

	it('10. Try to move spotlight to disabledExpandable item and verify spotlight does not move to that.', () => {
		Page.spotlightUp();
		Page.spotlightUp();
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		Page.spotlightDown();
		expect(extraItem.item.hasFocus()).to.be.true();
	});

	it('11.  Try to move spotlight to disabledExpandable again.', () => {
		Page.spotlightDown();
		Page.spotlightDown();
		expect(extraItem.item.hasFocus()).to.be.true();
	});
});

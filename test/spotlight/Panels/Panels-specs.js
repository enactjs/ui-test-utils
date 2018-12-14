const Page = require('./PanelsPage');

describe('Panels', () => {

	before(() => {
		Page.open();
	});

	const {
		item1InFirstPanel,
		item2InFirstPanel,
		item3InFirstPanel,
		item4InFirstPanel,
		item1InSecondPanel,
		headerButton
	} = Page.components;

	it('1. Verify the first item has focus.', () => {
		expect(item1InFirstPanel.item.hasFocus()).to.be.true();
	});

	it('2. Move spotlight to item2 and click to move to the next panel. And verify spotlight after transition.', () => {
		Page.spotlightDown();
		expect(item2InFirstPanel.item.hasFocus()).to.be.true();
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		Page.delay();
		expect(item1InSecondPanel.item.hasFocus()).to.be.true();
	});

	it('3. Move spotlight to breadcrumb and click to back to the previous panel. And verify spotlight after transition.', () => {
		Page.spotlightLeft();
		expect(item1InSecondPanel.breadcrumb.hasFocus()).to.be.true();

		Page.spotlightSelect();
		Page.waitTransitionEnd();

		expect(item2InFirstPanel.item.hasFocus()).to.be.true();
	});

	it('4. Move spotlight to item3 and click to move to the next panel. And verify scrollitem1 has focus after transition.', () => {
		Page.spotlightDown();

		expect(item3InFirstPanel.item.hasFocus()).to.be.true();

		Page.spotlightSelect();
		Page.waitTransitionEnd();
		Page.delay();

		expect(item1InSecondPanel.item.hasFocus()).to.be.true();
	});

	it('5. Press Back key to back to the previous panel. And verify item has focus after transition.', () => {
		Page.backKey();
		Page.waitTransitionEnd();

		expect(item3InFirstPanel.item.hasFocus()).to.be.true();
	});

	it('6.  Move to the next panel and move spotlight to breadcrumb. Veirfy item3 has focus after transition by pressint the BACK key.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		Page.delay();

		expect(item1InSecondPanel.item.hasFocus()).to.be.true();

		Page.spotlightLeft();
		expect(item1InSecondPanel.breadcrumb.hasFocus()).to.be.true();

		Page.backKey();
		Page.waitTransitionEnd();

		expect(item3InFirstPanel.item.hasFocus()).to.be.true();
	});

	it('7.  Move to the next panel and move spotlight to scroll down button. Veirfy item3 has focus after transition by pressint the BACK key.', () => {
		Page.spotlightSelect();
		Page.waitTransitionEnd();
		Page.delay();

		expect(item1InSecondPanel.item.hasFocus()).to.be.true();

		Page.spotlightRight();
		expect(item1InSecondPanel.scrollDown.hasFocus()).to.be.true();

		Page.backKey();
		Page.waitTransitionEnd();

		expect(item3InFirstPanel.item.hasFocus()).to.be.true();
	});

	it('8. Verify item4 has focus when press the DOWN key.', () => {
		Page.spotlightDown();

		expect(item4InFirstPanel.item.hasFocus()).to.be.true();
	});

	it('9. Move spotlight to scroll down button by scrolling down. And verify header button has focus even if pressing the UP key many times.', () => {
		Page.spotlightRight();
		Page.spotlightSelect();
		Page.spotlightUp();
		Page.spotlightUp();

		expect(headerButton.item.hasFocus()).to.be.true();
	});

	it('10. Click header button to hide scroller. And move spotlight to item1.', () => {
		Page.spotlightSelect();
		Page.spotlightDown();

		expect(item1InFirstPanel.item.hasFocus()).to.be.true();
	});

	it('11. Verify item1 retains focus even if pressing the RIGHT key.', () => {
		Page.spotlightRight();

		expect(item1InFirstPanel.item.hasFocus()).to.be.true();
	});
});

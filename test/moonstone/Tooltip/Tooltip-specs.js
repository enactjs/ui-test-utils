let Page = require('./TooltipPage'),
	{
		validateTitle,
		expectOpen,
		expectDelayOpen,
		expectClosed,
		expectAboveCenterArrow,
		expectAboveLeftArrow,
		expectAboveRightArrow,
		expectBelowCenterArrow,
		expectBelowLeftArrow,
		expectBelowRightArrow,
		expectLeftMiddleArrow,
		expectLeftTopArrow,
		expectLeftBottomArrow,
		expectRightMiddleArrow,
		expectRightTopArrow,
		expectRightBottomArrow
	} = require('./Tooltip-utils.js');

describe('Tooltip', function () {

	const tooltip = Page.Tooltip;

	beforeEach(function () {
		Page.open();
	});

	it('should not have the tooltip on start', function () {
		expect(tooltip.isTooltipExist).to.be.false();
	});

	describe('Tooltip position above-center', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmac');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmac');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - above center');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmac');
			expectOpen(tooltip);
			expectAboveCenterArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmac');
			expectOpen(tooltip);
			Page.blur('tooltipmac');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position above-right', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmar');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmar');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - above right');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmar');
			expectOpen(tooltip);
			expectAboveRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmar');
			expectOpen(tooltip);
			Page.blur('tooltipmar');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position above-left', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmal');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmal');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - above left');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmal');
			expectOpen(tooltip);
			expectAboveLeftArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmal');
			expectOpen(tooltip);
			Page.blur('tooltipmal');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position below-center', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmbc');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmbc');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - below center');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmbc');
			expectOpen(tooltip);
			expectBelowCenterArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmbc');
			expectOpen(tooltip);
			Page.blur('tooltipmbc');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position below-right', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmbr');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmbr');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - below right');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmbr');
			expectOpen(tooltip);
			expectBelowRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmbr');
			expectOpen(tooltip);
			Page.blur('tooltipmbr');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position below-left', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmbl');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmbl');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - below left');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmbl');
			expectOpen(tooltip);
			expectBelowLeftArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmbl');
			expectOpen(tooltip);
			Page.blur('tooltipmbl');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position right-top', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmrt');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmrt');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - right top');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmrt');
			expectOpen(tooltip);
			expectRightTopArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmrt');
			expectOpen(tooltip);
			Page.blur('tooltipmrt');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position right-middle', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmrm');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmrm');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - right middle');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmrm');
			expectOpen(tooltip);
			expectRightMiddleArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmrm');
			expectOpen(tooltip);
			Page.blur('tooltipmrm');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position right-bottom', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmrb');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmrb');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - right bottom');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmrb');
			expectOpen(tooltip);
			expectRightBottomArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmrb');
			expectOpen(tooltip);
			Page.blur('tooltipmrb');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position left-top', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmlt');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmlt');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - left top');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmlt');
			expectOpen(tooltip);
			expectLeftTopArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmlt');
			expectOpen(tooltip);
			Page.blur('tooltipmlt');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position left-middle', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmlm');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmlm');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - left middle');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmlm');
			expectOpen(tooltip);
			expectLeftMiddleArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmlm');
			expectOpen(tooltip);
			Page.blur('tooltipmlm');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip position left-bottom', function () {

		it('should display the tooltip on focus', function () {
			Page.focus('tooltipmlb');
			expectOpen(tooltip);
		});

		it('should have correct title', function () {
			Page.focus('tooltipmlb');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - left bottom');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmlb');
			expectOpen(tooltip);
			expectLeftBottomArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmlb');
			expectOpen(tooltip);
			Page.blur('tooltipmlb');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip casing upper', function () {

		it('should have correct title', function () {
			Page.focus('tooltipmup');
			expectOpen(tooltip);
			validateTitle(tooltip, 'TOOLTIP CASING - UPPER');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmup');
			expectOpen(tooltip);
			expectAboveRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmup');
			expectOpen(tooltip);
			Page.blur('tooltipmup');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip casing sentence', function () {

		it('should have correct title', function () {
			Page.focus('tooltipmst');
			expectOpen(tooltip);
			validateTitle(tooltip, 'Tooltip casing - sentence');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmst');
			expectOpen(tooltip);
			expectBelowRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmst');
			expectOpen(tooltip);
			Page.blur('tooltipmst');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip casing word', function () {

		it('should have correct title', function () {
			Page.focus('tooltipmwd');
			expectOpen(tooltip);
			validateTitle(tooltip, 'Tooltip Casing - Word');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmwd');
			expectOpen(tooltip);
			expectAboveRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmwd');
			expectOpen(tooltip);
			Page.blur('tooltipmwd');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip on cornor components - top left', function () {

		it('should have correct title', function () {
			Page.focus('tooltipctl');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - top left');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltictl');
			expectOpen(tooltip);
			expectBelowRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipctl');
			expectOpen(tooltip);
			Page.blur('tooltipctl');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip on cornor components - top center', function () {

		it('should have correct title', function () {
			Page.focus('tooltipctc');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - top center');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltictc');
			expectOpen(tooltip);
			expectBelowRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipctc');
			expectOpen(tooltip);
			Page.blur('tooltipctc');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip on cornor components - top right', function () {

		it('should have correct title', function () {
			Page.focus('tooltipctr');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - top right');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipctr');
			expectOpen(tooltip);
			expectBelowLeftArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipctr');
			expectOpen(tooltip);
			Page.blur('tooltipctr');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip on cornor components - bottom left', function () {

		it('should have correct title', function () {
			Page.focus('tooltipcbl');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - bottom left');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipcbl');
			expectOpen(tooltip);
			expectAboveRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipcbl');
			expectOpen(tooltip);
			Page.blur('tooltipcbl');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip on cornor components - middle left', function () {

		it('should have correct title', function () {
			Page.focus('tooltipcml');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - middle left');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipcml');
			expectOpen(tooltip);
			expectBelowRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipcml');
			expectOpen(tooltip);
			Page.blur('tooltipcml');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip on cornor components - middle right', function () {

		it('should have correct title', function () {
			Page.focus('tooltipcmr');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - middle right');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipcmr');
			expectOpen(tooltip);
			expectBelowLeftArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipcmr');
			expectOpen(tooltip);
			Page.blur('tooltipcmr');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip on cornor components - bottom center', function () {

		it('should have correct title', function () {
			Page.focus('tooltipcbc');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - bottom center');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipcbc');
			expectOpen(tooltip);
			expectAboveRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipcbc');
			expectOpen(tooltip);
			Page.blur('tooltipcbc');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip on cornor components - bottom right', function () {

		it('should have correct title', function () {
			Page.focus('tooltipcbr');
			expectOpen(tooltip);
			validateTitle(tooltip, 'tooltip position - bottom right');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipcbr');
			expectOpen(tooltip);
			expectAboveLeftArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipcbr');
			expectOpen(tooltip);
			Page.blur('tooltipcbr');
			expectClosed(tooltip);
		});
	});

	describe('Tooltip with delay 1000', function () {

		it('should have correct title', function () {
			Page.focus('tooltipmdl');
			expectDelayOpen(tooltip);
			validateTitle(tooltip, 'tooltip delay - 1000');
		});

		it('should have correct tip position and arrow', function () {
			Page.focus('tooltipmdl');
			expectDelayOpen(tooltip);
			expectAboveRightArrow(tooltip);
		});

		it('should hide the tooltip on blur', function () {
			Page.focus('tooltipmdl');
			expectDelayOpen(tooltip);
			Page.blur('tooltipmdl');
			expectClosed(tooltip);
		});
	});
});

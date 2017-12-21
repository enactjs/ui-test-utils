'use strict';

const Page = require('../../Page.js');
const {element, getText} = require('../../utils.js');

class TooltipInterface {

	constructor (id) {
		this.id = id;
	}

	get self            () { return element(`#${this.id}`, browser); }
	get pathElement     () { return element(`#${this.id} path`, browser); }
	get title           () { return getText(element(`#${this.id} .Tooltip__tooltipLabel`, browser)); }
	get isTooltipExist  () { return this.self.isExisting('.Tooltip__tooltip'); }
	get isAbovePosition () { return this.self.isExisting('.Tooltip__above'); }
	get isBelowPosition () { return this.self.isExisting('.Tooltip__below'); }
	get isLeftPosition  () { return this.self.isExisting('.Tooltip__left'); }
	get isRightPosition () { return this.self.isExisting('.Tooltip__right'); }
	get isCenterArrow   () { return this.self.isExisting('.Tooltip__centerArrow'); }
	get isLeftArrow     () { return this.self.isExisting('.Tooltip__leftArrow'); }
	get isRightArrow    () { return this.self.isExisting('.Tooltip__rightArrow'); }
	get isMiddleArrow   () { return this.self.isExisting('.Tooltip__middleArrow'); }
	get isTopArrow      () { return this.self.isExisting('.Tooltip__topArrow'); }
	get isBottomArrow   () { return this.self.isExisting('.Tooltip__bottomArrow'); }
	get getPath         () { return this.pathElement.getAttribute('d'); }
}

class TooltipPage extends Page {

	constructor () {
		super();
		this.title = 'Tooltip Test';
		this.Tooltip = new TooltipInterface('floatLayer');
	}

	open (urlExtra) {
		super.open('Tooltip-View', urlExtra);
	}

	focus (id) {
		return browser.selectorExecute(`#${id}`, (els) => els && !els[0].focus());
	}

	blur (id) {
		return browser.selectorExecute(`#${id}`, (els) => els && !els[0].blur());
	}
}

module.exports = new TooltipPage();

'use strict';

const converge = require('ramda/src/converge');
const curry = require('ramda/src/curry');
const identity = require('ramda/src/identity');
const toLower = require('ramda/src/toLower');
const useWith = require('ramda/src/useWith');

// Given a selector and a starting element, returns the first matching descendant Element
// String => Element => Element
const element = curry((selector, el) => el.element(selector));

// Given an element, returns its inner text
// Element => String
const getText = (el) => el.getText();

// Given n CSS class names, return a selector with them joined per our CSS Module plugin rules
// String... => String
const cssModuleSelector = (...args) => `.${args.join('_')}`;

const toEnactPath = (lib, component) => `enact_${lib}_${component}`;

// Given a component name and starting element, returns the first matching descendant Element
// String => Element => Element
const getComponent = curry((lib, component, el) => element(
	cssModuleSelector(toEnactPath(lib, component), component, toLower(component)),
	el
));

// Given a component name, child name, and starting element, returns the first matching descendant Element
// String => String => Element => Element
const getSubComponent = curry((lib, component, child, el) => element(
	cssModuleSelector(toEnactPath(lib, component), component, child),
	getComponent(lib, component, el)
));

module.exports = {
	element,
	getComponent,
	getSubComponent,
	getText
};

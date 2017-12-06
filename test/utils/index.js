'use strict';

const converge = require('ramda/src/converge');
const curry = require('ramda/src/curry');
const identity = require('ramda/src/identity');
const toLower = require('ramda/src/toLower');
const useWith = require('ramda/src/useWith');

const spotlight = require('./spotlight');

// Given a selector and a starting element, returns the first matching descendant Element
// String => Element => Element
const element = curry((selector, el) => el.element(selector));

// Given an element, returns its inner text
// Element => String
const getText = (el) => el.getText();

// Given n CSS class names, return a selector with them joined per our CSS Module plugin rules
// String... => String
const cssModuleSelector = (...args) => `.${args.join('__')}`;

// Given a component name, generates a CSS selector in the form: ComponentName__componentname
// String => String
const componentSelector = converge(cssModuleSelector, [identity, toLower]);

// Given a component name and starting element, returns the first matching descendant Element
// String => Element => Element
const getComponent = useWith(element, [componentSelector, identity]);

// Given a component name, child name, and starting element, returns the first matching descendant Element
// String => String => Element => Element
const getSubComponent = curry((name, child, el) => element(
	cssModuleSelector(name, child),
	getComponent(name, el)
));

module.exports = {
	element,
	getComponent,
	getSubComponent,
	getText,
	spotlight
};

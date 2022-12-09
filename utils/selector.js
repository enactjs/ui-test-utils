// 'use strict';

// const curry = require('ramda/src/curry');
import curry from 'ramda/src/curry';

const toLower = (str) => str.replace(/^\w/, (chr) => chr.toLowerCase());

// Given a selector and a starting element, returns the first matching descendant Element
// String => Element => Element
const element = curry((selector, el) => el.$(selector));

// Given an element, returns its inner text
// Element => String
const getText = (el) => el.getText();

const join = (...args) => args.filter(Boolean).join('_');

// Given n CSS class names, return a selector with them joined per our CSS Module plugin rules
// String... => String
const cssModuleSelector = (...args) => `.${join(...args)}`;

const getBasePath = (lib, internal, component) => join(lib && 'enact', lib, internal && 'internal', component);

const componentSelector = ({lib, component, child, internal}) => cssModuleSelector(
	getBasePath(lib, internal, component),
	component,
	child ? child : toLower(component)
);

// Given a component name and starting element, returns the first matching descendant Element
// String => Element => Element
const getComponent = curry((opts, el) => element(
	componentSelector(opts),
	el
));

// Given a component name, child name, and starting element, returns the first matching descendant Element
// String => String => Element => Element
const getSubComponent = curry((opts, el) => element(
	componentSelector(opts),
	getComponent(Object.assign({}, opts, {child: null}), el)
));

// Given two elements, determine if the first element is to the left of the second element
// element, element => Boolean
async function expectOrdering (firstElement, secondElement) {
	expect(await firstElement.getLocation().x < secondElement.getLocation().x).to.be.true();
}

const hasClass = curry(async (className, el) => {
	if (className[0] === '.') {
		className = className.slice(1);
	}
	const elementClass = await el.getAttribute('className') || await el.getAttribute('class');
	return elementClass.includes(className);
});

// module.exports = {
// 	componentSelector,
// 	element,
// 	expectOrdering,
// 	getComponent,
// 	getSubComponent,
// 	getText,
// 	hasClass
// };
export {
	componentSelector,
	element,
	expectOrdering,
	getComponent,
	getSubComponent,
	getText,
	hasClass
};

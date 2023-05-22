"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.element = exports.componentSelector = void 0;
exports.expectOrdering = expectOrdering;
exports.hasClass = exports.getText = exports.getSubComponent = exports.getComponent = void 0;
var _ramda = require("ramda");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // 'use strict';
// const curry = require('ramda/src/curry');
var toLower = function toLower(str) {
  return str.replace(/^\w/, function (chr) {
    return chr.toLowerCase();
  });
};

// Given a selector and a starting element, returns the first matching descendant Element
// String => Element => Element
var element = (0, _ramda.curry)(function (selector, el) {
  return el.$(selector);
});

// Given an element, returns its inner text
// Element => String
exports.element = element;
var getText = function getText(el) {
  return el.getText();
};
exports.getText = getText;
var join = function join() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return args.filter(Boolean).join('_');
};

// Given n CSS class names, return a selector with them joined per our CSS Module plugin rules
// String... => String
var cssModuleSelector = function cssModuleSelector() {
  return ".".concat(join.apply(void 0, arguments));
};
var getBasePath = function getBasePath(lib, internal, component) {
  return join(lib && 'enact', lib, internal && 'internal', component);
};
var componentSelector = function componentSelector(_ref) {
  var lib = _ref.lib,
    component = _ref.component,
    child = _ref.child,
    internal = _ref.internal;
  return cssModuleSelector(getBasePath(lib, internal, component), component, child ? child : toLower(component));
};

// Given a component name and starting element, returns the first matching descendant Element
// String => Element => Element
exports.componentSelector = componentSelector;
var getComponent = (0, _ramda.curry)(function (opts, el) {
  return element(componentSelector(opts), el);
});

// Given a component name, child name, and starting element, returns the first matching descendant Element
// String => String => Element => Element
exports.getComponent = getComponent;
var getSubComponent = (0, _ramda.curry)(function (opts, el) {
  return element(componentSelector(opts), getComponent(Object.assign({}, opts, {
    child: null
  }), el));
});

// Given two elements, determine if the first element is to the left of the second element
// element, element => Boolean
exports.getSubComponent = getSubComponent;
function expectOrdering(_x, _x2) {
  return _expectOrdering.apply(this, arguments);
}
function _expectOrdering() {
  _expectOrdering = _asyncToGenerator(function* (firstElement, secondElement) {
    expect((yield firstElement.getLocation().x) < secondElement.getLocation().x).to.be["true"]();
  });
  return _expectOrdering.apply(this, arguments);
}
var hasClass = (0, _ramda.curry)( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (className, el) {
    if (className[0] === '.') {
      className = className.slice(1);
    }
    var elementClass = (yield el.getAttribute('className')) || (yield el.getAttribute('class'));
    return elementClass.includes(className);
  });
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// module.exports = {
// 	componentSelector,
// 	element,
// 	expectOrdering,
// 	getComponent,
// 	getSubComponent,
// 	getText,
// 	hasClass
// };
exports.hasClass = hasClass;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _TestChooserModule = _interopRequireDefault(require("./TestChooser.module.css"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// eslint-disable-next-line enact/prop-types
var TestChooser = function TestChooser(_ref) {
  var metadata = _ref.metadata;
  var tests = Object.keys(metadata);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: _TestChooserModule["default"].index,
    children: tests.map(function (key) {
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
          className: _TestChooserModule["default"].component,
          children: key
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("ol", {
          start: "0",
          className: _TestChooserModule["default"].list,
          children: metadata[key].map(function (_ref2, index) {
            var title = _ref2.title;
            return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
              className: _TestChooserModule["default"].listitem,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
                href: "?component=".concat(key, "&testId=").concat(index),
                className: _TestChooserModule["default"].link,
                children: title
              })
            }, index);
          })
        })]
      }, key);
    })
  });
};
var _default = TestChooser;
exports["default"] = _default;
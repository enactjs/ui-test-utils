"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _client = require("react-dom/client");
var _UI_TEST_APP_ENTRY = _interopRequireDefault(require("UI_TEST_APP_ENTRY"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var url = new URL(window.location.href);
var locale = url.searchParams.get('locale');
var appElement = /*#__PURE__*/(0, _jsxRuntime.jsx)(_UI_TEST_APP_ENTRY["default"], {
  locale: locale
});
if (typeof window !== 'undefined') {
  (0, _client.createRoot)(document.getElementById('root')).render(appElement);
}
var _default = appElement;
exports["default"] = _default;
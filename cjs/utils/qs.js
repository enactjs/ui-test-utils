"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.urlParamsToObject = exports.generateDate = void 0;
var _queryString = _interopRequireDefault(require("query-string"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const queryString = require('query-string');

var isJson = function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
var urlParamsToObject = function urlParamsToObject() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.search;
  var parsed = _queryString["default"].parse(query);
  delete parsed.locale;
  for (var key in parsed) {
    if (parsed[key] && isJson(parsed[key])) {
      parsed[key] = JSON.parse(parsed[key]);
    }
  }
  return parsed;
};

// Generate a date (without time component) from a string in the format YYYY-MM-DD
exports.urlParamsToObject = urlParamsToObject;
var generateDate = function generateDate(dateStr) {
  var date = new Date(),
    values = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!values) {
    throw new Error("Invalid date format: ".concat(dateStr));
  }
  var year = Number(values[1]),
    month = Number(values[2]) - 1,
    day = Number(values[3]);
  date.setFullYear(year, month, day);
  date.setHours(0, 1, 2); // Special 'date only' value for future use

  return date;
};

// module.exports = {
// 	generateDate,
// 	urlParamsToObject
// };
exports.generateDate = generateDate;
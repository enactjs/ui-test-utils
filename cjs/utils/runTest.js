"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _crypto = _interopRequireDefault(require("crypto"));
var _minimist = _interopRequireDefault(require("minimist"));
var _excluded = ["concurrency", "filter", "Page", "testName"]; // 'use strict';
// const crypto = require('crypto');
// const parseArgs = require('minimist');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var args = (0, _minimist["default"])(process.argv);
var pattern = args.component,
  // Component group to match
  testToExecute = args.id,
  // Specific test ID
  titlePattern = args.title,
  // Pattern for matching test case title
  maxInstances = args.instances || 5; // concurrent instances for 'manual' concurrency

var runTest = function runTest(_ref) {
  var concurrency = _ref.concurrency,
    filter = _ref.filter,
    Page = _ref.Page,
    testName = _ref.testName,
    rest = _objectWithoutProperties(_ref, _excluded);
  if (concurrency && concurrency > maxInstances) {
    return;
  }
  describe(testName, function () {
    it('should fetch test cases', /*#__PURE__*/_asyncToGenerator(function* () {
      yield Page.open('?request');
      var testCases = yield browser.execute( /*#__PURE__*/_asyncToGenerator(function* () {
        return yield window.__TEST_DATA;
      }));
      yield expect(testCases).to.be.an('object', 'Test data failed to load');
      describe(testName, function () {
        var _loop = function _loop(component) {
          if (pattern && !component.match(pattern)) {
            return "continue";
          }
          if (filter && !component.match(filter)) {
            return "continue";
          }
          describe(component, function () {
            testCases[component].forEach(function (testCase, testId) {
              if (concurrency && testId % maxInstances !== concurrency - 1) {
                return;
              }
              if (testToExecute >= 0 && testToExecute !== testId) {
                return;
              }
              if (titlePattern && !testCase.title.match(titlePattern)) {
                return;
              }
              it("".concat(component, "~/").concat(testName, "~/").concat(testCase.title), /*#__PURE__*/_asyncToGenerator(function* () {
                var params = Page.serializeParams(Object.assign({
                  component: component,
                  testId: testId
                }, rest));
                var testNameParts = testCase.title.split('~/');
                var testCaseName = testNameParts.pop();
                // Replace problematic filenames. Windows is much more restrictive.
                testCaseName = testCaseName.replace(/[/\\:?*"|<>]/g, '_');
                // shorten the name with a little bit of leading context to help find the file manually if necessary
                testCaseName = testCaseName.substring(0, 128) + '-' + _crypto["default"].createHash('md5').update(testCaseName).digest('hex');
                var screenshotFileName = component + '/' + testName + '/' + testCaseName;
                var context = {
                  params: params,
                  component: component,
                  testName: testName,
                  url: Page.url,
                  fileName: screenshotFileName
                };
                this.test.context = context;
                yield Page.open("?".concat(params));
                expect(yield browser.checkScreen(screenshotFileName, {
                  disableCSSAnimation: true,
                  ignoreNothing: true,
                  rawMisMatchPercentage: true
                })).to.equal(0);
              }));
            });
          });
        };
        for (var component in testCases) {
          var _ret = _loop(component);
          if (_ret === "continue") continue;
        }
      });
    }));
  });
};

// module.exports = {
// 	runTest
// };
var _default = runTest;
exports["default"] = _default;
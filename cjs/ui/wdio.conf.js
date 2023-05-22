"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uiConfig = void 0;
var _buildApps = require("../src/build-apps.js");
var _fs = _interopRequireDefault(require("fs"));
var _chalk = _interopRequireDefault(require("chalk"));
var _wdioConf = require("../config/wdio.conf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const buildApps = require('../src/build-apps');
// const fs = require('fs');
// 	fs = require('fs'),
// 	chalk = require('chalk');

// const {configure} = require('../config/wdio.conf.js');

var config = (0, _wdioConf.configure)({
  base: 'ui',
  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare: function onPrepare() {
    return (0, _buildApps.buildApps)('ui');
  },
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  afterTest: function afterTest(testCase, _context, _ref) {
    var duration = _ref.duration,
      passed = _ref.passed;
    if (duration > 2000) {
      console.log(_chalk["default"].yellow("Long running test case: ".concat(testCase.title, ": ").concat(duration, "ms")));
    }
    this.__duration = (this.__duration || 0) + duration;
    // if test passed, ignore, else take and save screenshot.
    if (passed) {
      return;
    }
    // get current test title and clean it, to use it as file name
    var filename = encodeURIComponent(testCase.title.replace(/\s+/g, '-'));
    // build file path
    var filePath = this.screenshotPath + filename + '.png';
    if (!_fs["default"].existsSync(this.screenshotPath)) {
      _fs["default"].mkdirSync(this.screenshotPath, {
        recursive: true
      }); // May only work recursively on Node 10.12+
    }
    // save screenshot
    browser.saveScreenshot(filePath);
    console.log('\n\tScreenshot location:', filePath, '\n');
  },
  afterSuite: function afterSuite(_suite) {
    // Note: This duration will be less than reported by the various reporters. This seems like
    // the best we can do without access to the internal runner
    if (this.__duration > 80000) {
      console.log(_chalk["default"].yellow("Long running suite: ".concat(_suite.title, ": ").concat(this.__duration, "ms")));
    }
  }
});
var uiConfig = {
  config: config
};
exports.uiConfig = uiConfig;
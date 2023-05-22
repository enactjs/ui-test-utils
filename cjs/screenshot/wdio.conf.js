"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _wdioConf = require("../config/wdio.conf.js");
var _confHelpers = require("./utils/confHelpers.js");
// const {configure} = require('../config/wdio.conf.js');

// const {afterTest, baselineFolder, beforeTest, onComplete, onPrepare, screenshotFolder} = require('./utils/confHelpers.js');

var config = (0, _wdioConf.configure)({
  base: 'screenshot',
  services: [['image-comparison', {
    baselineFolder: _confHelpers.baselineFolder,
    formatImageName: '{tag}',
    screenshotPath: _confHelpers.screenshotFolder,
    autoSaveBaseline: true
  }]],
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
  onPrepare: _confHelpers.onPrepare,
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  beforeTest: _confHelpers.beforeTest,
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  afterTest: _confHelpers.afterTest,
  /**
   * Gets executed after all workers got shut down and the process is about to exit. It is not
   * possible to defer the end of the process using a promise.
   * @param {Object} exitCode 0 - success, 1 - fail
   */
  onComplete: _confHelpers.onComplete
});
var _default = config;
exports["default"] = _default;
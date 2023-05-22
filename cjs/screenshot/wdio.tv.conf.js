"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ipAddress = _interopRequireDefault(require("../utils/ipAddress.js"));
var _wdioConf = _interopRequireDefault(require("./wdio.conf.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const ipAddress = require('../utils/ipAddress.js');

// const {config} = require('./wdio.conf.js');

var services = _wdioConf["default"].services.map(function (service) {
  if (service[0] === 'novus-visual-regression') {
    delete service[1].viewports;
  }
  return service;
});
var configTV = Object.assign({}, _wdioConf["default"], {
  services: services,
  // ============
  // Capabilities
  // ============
  // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
  // time. Depending on the number of capabilities, WebdriverIO launches several test
  // sessions. Within your capabilities you can overwrite the spec and exclude options in
  // order to group specific specs to a specific capability.
  //
  // If you have trouble getting all important capabilities together, check out the
  // Sauce Labs platform configurator - a great tool to configure your capabilities:
  // https://docs.saucelabs.com/reference/platforms-configurator
  //
  capabilities: [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    maxInstances: 1,
    //
    browserName: 'chrome',
    'goog:chromeOptions': {
      w3c: false,
      debuggerAddress: "".concat(process.env.TV_IP, ":9998")
    }
  }],
  //
  // Set a base URL in order to shorten url command calls. If your url parameter starts
  // with "/", then the base url gets prepended.
  baseUrl: "http://".concat((0, _ipAddress["default"])(), ":4567"),
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before: function before() {
    if (_wdioConf["default"].before) {
      _wdioConf["default"].before();
    }
    browser._options = {
      remote: true
    };

    // Have to stub out these methods to prevent exceptions when running against
    // remote chrome session
    browser.setViewportSize = function () {
      return Promise.resolve({
        height: 1080,
        width: 1920
      });
    };
    browser.windowHandleSize = function () {
      return Promise.resolve({
        height: 1080,
        width: 1920
      });
    };
  }
});
var _default = configTV;
exports["default"] = _default;
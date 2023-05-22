"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var _ipAddress = _interopRequireDefault(require("../utils/ipAddress.js"));
var _wdioConf = require("./wdio.conf.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const ipAddress = require('../utils/ipAddress.js');

// const {config} = require('./wdio.conf.js');

var config = Object.assign({}, _wdioConf.uiConfig, {
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      w3c: false,
      debuggerAddress: "".concat(process.env.TV_IP, ":9998")
    }
  }],
  baseUrl: "http://".concat((0, _ipAddress["default"])(), ":4567"),
  before: function before() {
    if (_wdioConf.uiConfig.before) {
      _wdioConf.uiConfig.before();
    }
    browser._options = {
      remote: true
    };
  }
});
exports.config = config;
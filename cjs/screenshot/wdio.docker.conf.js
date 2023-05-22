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

// Remove selenium-standalone and replace with docker service
var services = _wdioConf["default"].services.filter(function (service) {
  return service[0] !== 'selenium-standalone';
}).concat(['docker']);
var configDocker = Object.assign({}, _wdioConf["default"], {
  baseUrl: "http://".concat((0, _ipAddress["default"])(), ":4567"),
  services: services,
  dockerOptions: {
    image: 'selenium/standalone-chrome',
    healthCheck: 'http://localhost:4444',
    options: {
      e: ['NODE_MAX_INSTANCE=5', 'NODE_MAX_SESSION=5'],
      p: ['4444:4444'],
      shmSize: '2g'
    }
  }
});
var _default = configDocker;
exports["default"] = _default;
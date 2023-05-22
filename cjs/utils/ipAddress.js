"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _nodeOs = _interopRequireDefault(require("node:os"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const os = require('os');

function ipAddress() {
  var ifaces = _nodeOs["default"].networkInterfaces();
  var address = 'localhost';
  Object.keys(ifaces).forEach(function (ifname) {
    var iface = ifaces[ifname][0];
    if (!iface || 'IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }
    address = iface.address;
  });
  return address;
}

// module.exports = ipAddress;
var _default = ipAddress;
exports["default"] = _default;
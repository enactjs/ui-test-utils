"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _queryString = _interopRequireDefault(require("query-string"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // 'use strict';
// const queryString = require('query-string');
var Page = /*#__PURE__*/function () {
  function Page() {
    _classCallCheck(this, Page);
    this.title = 'Untitled Test';
    this._url = '';
  }
  _createClass(Page, [{
    key: "url",
    get: function get() {
      return this._url;
    }
  }, {
    key: "open",
    value: function () {
      var _open = _asyncToGenerator(function* (appPath) {
        var urlExtra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '?locale=en-US';
        yield browser.execute(function () {
          document.body.innerHTML = '';
        });
        this._url = "/".concat(appPath, "/").concat(urlExtra);
        // Can't resize browser window when connected to remote debugger!
        if (!browser._options || !browser._options.remote) {
          yield browser.setWindowSize(1920, 1080);
        }
        yield browser.url(this.url);
        var body = yield $('body');
        yield body.waitForDisplayed({
          timeout: 5000
        });
        yield this.delay(200);
      });
      function open(_x) {
        return _open.apply(this, arguments);
      }
      return open;
    }()
  }, {
    key: "serializeParams",
    value: function serializeParams(params) {
      var queryObject = _queryString["default"].stringify(params);
      return queryObject;
    }
  }, {
    key: "delay",
    value: function () {
      var _delay2 = _asyncToGenerator(function* () {
        var _delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
        yield browser.pause(_delay);
        return browser;
      });
      function delay() {
        return _delay2.apply(this, arguments);
      }
      return delay;
    }()
  }, {
    key: "keyDelay",
    value: function () {
      var _keyDelay = _asyncToGenerator(function* (key) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
        yield browser.keys(key);
        yield browser.pause(delay);
        return yield browser;
      });
      function keyDelay(_x2) {
        return _keyDelay.apply(this, arguments);
      }
      return keyDelay;
    }()
  }, {
    key: "spotlightLeft",
    value: function spotlightLeft() {
      return this.keyDelay('Left arrow');
    }
  }, {
    key: "spotlightRight",
    value: function spotlightRight() {
      return this.keyDelay('Right arrow');
    }
  }, {
    key: "spotlightUp",
    value: function spotlightUp() {
      return this.keyDelay('Up arrow');
    }
  }, {
    key: "spotlightDown",
    value: function spotlightDown() {
      return this.keyDelay('Down arrow');
    }
  }, {
    key: "spotlightSelect",
    value: function spotlightSelect() {
      return this.keyDelay('Enter');
    }
  }, {
    key: "backKey",
    value: function backKey() {
      return this.keyDelay('Escape');
    }
  }, {
    key: "pageUp",
    value: function pageUp() {
      return this.keyDelay('PageUp');
    }
  }, {
    key: "pageDown",
    value: function pageDown() {
      return this.keyDelay('PageDown');
    }

    // For testing "pointer off" by timeout.
  }, {
    key: "hidePointerByKeycode",
    value: function () {
      var _hidePointerByKeycode = _asyncToGenerator(function* () {
        yield browser.execute(function () {
          var event = document.createEvent('Events');
          event.initEvent('keydown', true, true);
          event.keyCode = 1537;
          document.getElementById('root').dispatchEvent(event);
        });
        yield this.delay();
        return browser;
      });
      function hidePointerByKeycode() {
        return _hidePointerByKeycode.apply(this, arguments);
      }
      return hidePointerByKeycode;
    }()
  }, {
    key: "showPointerByKeycode",
    value: function () {
      var _showPointerByKeycode = _asyncToGenerator(function* () {
        yield browser.execute(function () {
          var event = document.createEvent('Events');
          event.initEvent('keydown', true, true);
          event.keyCode = 1536;
          document.getElementById('root').dispatchEvent(event);
        });
        yield this.delay();
        return browser;
      });
      function showPointerByKeycode() {
        return _showPointerByKeycode.apply(this, arguments);
      }
      return showPointerByKeycode;
    }()
    /* global WheelEvent */
    // Not fully functional - do not use further - see [ENYO-6178] - kept a few existing TCs as-is
    // Do not delete
  }, {
    key: "mouseWheel",
    value: function mouseWheel(_deltaY, _element) {
      browser.execute(function (deltaY) {
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
        var _element$getBoundingC = element.getBoundingClientRect(),
          clientX = _element$getBoundingC.x,
          clientY = _element$getBoundingC.y;
        var payload = {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: clientX,
          clientY: clientY,
          deltaY: deltaY
        };
        var event = new WheelEvent('wheel', payload);
        element.dispatchEvent(event);
      }, _deltaY, _element ? _element.value : null);
    }
  }, {
    key: "windowSpotlightBlur",
    value: function windowSpotlightBlur() {
      browser.execute(function () {
        var event = document.createEvent('Events');
        event.initEvent('blur', true, true);
        document.getElementById('root').dispatchEvent(event);
      });
    }
  }, {
    key: "windowSpotlightFocus",
    value: function windowSpotlightFocus() {
      browser.execute(function () {
        var event = document.createEvent('Events');
        event.initEvent('focus', true, true);
        document.getElementById('root').dispatchEvent(event);
      });
    }

    /**
     * Wait for an element to appear and become focused
     *
     * @param {Element} target                      Target element to match
     * @param {Object} [config]                     Optional configuration
     * @param {String} [config.targetName="item"]   Human readable name for target, used in default `timeoutMsg`
     * @param {String} [config.timeoutMsg=`timed out waiting for ${targetName} focused`]  Error message on timeout
     * @param {Number} [config.timeout=1200]        Time to wait for focus condition
     * @param {Number} [config.interval=200]        Time between checks
     */
  }, {
    key: "waitForFocused",
    value: function () {
      var _waitForFocused = _asyncToGenerator(function* (target) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$targetName = _ref.targetName,
          targetName = _ref$targetName === void 0 ? 'item' : _ref$targetName,
          _ref$timeoutMsg = _ref.timeoutMsg,
          timeoutMsg = _ref$timeoutMsg === void 0 ? "timed out waiting for ".concat(targetName, " focused") : _ref$timeoutMsg,
          _ref$timeout = _ref.timeout,
          timeout = _ref$timeout === void 0 ? 1200 : _ref$timeout,
          _ref$interval = _ref.interval,
          interval = _ref$interval === void 0 ? 200 : _ref$interval;
        yield browser.waitUntil(function () {
          return target.isExisting() && target.isFocused();
        }, {
          timeout: timeout,
          timeoutMsg: timeoutMsg,
          interval: interval
        });
      });
      function waitForFocused(_x3) {
        return _waitForFocused.apply(this, arguments);
      }
      return waitForFocused;
    }()
  }, {
    key: "waitTransitionEnd",
    value: function () {
      var _waitTransitionEnd = _asyncToGenerator(function* () {
        var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
        var timeoutMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'timed out waiting for transitionend';
        var callback = arguments.length > 2 ? arguments[2] : undefined;
        var ignore = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ['opacity', 'filter'];
        yield browser.execute(
        /*#__PURE__*/
        // eslint-disable-next-line no-shadow
        function () {
          var _ref2 = _asyncToGenerator(function* (ignore) {
            window.ontransitionend = yield function (evt) {
              if (!ignore || ignore.indexOf(evt.propertyName) === -1) {
                window.__transition = true;
              }
            };
            window.__transition = false;
          });
          return function (_x4) {
            return _ref2.apply(this, arguments);
          };
        }(), ignore);
        if (callback) {
          yield callback();
        }
        yield browser.waitUntil( /*#__PURE__*/_asyncToGenerator(function* () {
          return yield browser.execute( /*#__PURE__*/_asyncToGenerator(function* () {
            return yield window.__transition;
          }));
        }), {
          timeout: timeout,
          timeoutMsg: timeoutMsg
        });
      });
      function waitTransitionEnd() {
        return _waitTransitionEnd.apply(this, arguments);
      }
      return waitTransitionEnd;
    }()
  }]);
  return Page;
}(); // module.exports = {
// 	Page
// };
var _default = Page;
exports["default"] = _default;
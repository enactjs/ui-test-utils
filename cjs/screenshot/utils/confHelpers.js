"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.afterTest = afterTest;
exports.baselineFolder = void 0;
exports.beforeTest = beforeTest;
exports.onComplete = onComplete;
exports.onPrepare = onPrepare;
exports.screenshotFolder = void 0;
var _nodeCrypto = _interopRequireDefault(require("node:crypto"));
var _nodePath = _interopRequireDefault(require("node:path"));
var _nodeFs = _interopRequireDefault(require("node:fs"));
var _buildApps = _interopRequireDefault(require("../../src/build-apps.js"));
var _headerTemplate = _interopRequireDefault(require("./headerTemplate.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } // const crypto = require('crypto'),
// 	path = require('path'),
// 	fs = require('fs');
// const buildApps = require('../../src/build-apps');
// const makeHeader = require('./headerTemplate');
var newScreenshotFilename = 'tests/screenshot/dist/newFiles.html',
  failedScreenshotFilename = 'tests/screenshot/dist/failedTests.html',
  newScreenshotHeader = (0, _headerTemplate["default"])('New Screenshots'),
  newScreenshotFooter = '];\n</script><script src="utils/newFiles.js"></script>\n</body></html>',
  failedScreenshotHeader = (0, _headerTemplate["default"])('Failed Screenshots'),
  failedScreenshotFooter = '];\n</script><script src="utils/failedTests.js"></script>\n</body></html>';
function getScreenshotName(basePath) {
  return function (context) {
    // Using '~/' as a path part separator in cases where '/' appears in a test name
    var testNameParts = context.test.title.split('~/');
    var testName = testNameParts.pop();
    // Replace problematic filenames. Windows is much more restrictive.
    testName = testName.replace(/[/\\:?*"|<>]/g, '_');

    // shorten the name with a little bit of leading context to help find the file manually if necessary
    testName = testName.substring(0, 128) + '-' + _nodeCrypto["default"].createHash('md5').update(testName).digest('hex');
    var screenshotFileName = _nodePath["default"].join.apply(_nodePath["default"], [basePath].concat(_toConsumableArray(testNameParts), ["".concat(testName, ".png")]));
    return screenshotFileName.replace(/ /g, '_');
  };
}
var distPath = _nodePath["default"].join(process.cwd(), 'tests', 'screenshot', 'dist');
var baselineRelativePath = 'screenshots/reference';
var screenshotRelativePath = 'screenshots/screen';
var baselineFolder = _nodePath["default"].join(distPath, baselineRelativePath);
exports.baselineFolder = baselineFolder;
var screenshotFolder = _nodePath["default"].join(distPath, screenshotRelativePath);
exports.screenshotFolder = screenshotFolder;
var generateReferenceName = getScreenshotName(baselineFolder);
function initFile(name, content) {
  var dir = _nodePath["default"].dirname(name);
  if (!_nodeFs["default"].existsSync(dir)) {
    _nodeFs["default"].mkdirSync(dir, {
      recursive: true
    });
  } else {
    try {
      _nodeFs["default"].unlinkSync(name);
    } catch (err) {
      // do nothing
    }
  }
  _nodeFs["default"].appendFileSync(name, content, 'utf8');
}
function onPrepare() {
  if (!_nodeFs["default"].existsSync('tests/screenshot/dist/screenshots/reference')) {
    console.log('No reference screenshots found, creating new references!');
  }
  initFile(failedScreenshotFilename, failedScreenshotHeader);
  initFile(newScreenshotFilename, newScreenshotHeader);
  return (0, _buildApps["default"])('screenshot');
}
function beforeTest(testData) {
  // If title doesn't have a '/', it's not a screenshot test, don't save
  if (testData && testData.title && testData.title.indexOf('/') > 0) {
    var filename = generateReferenceName({
      test: testData
    });
    testData.ctx.isNewScreenshot = !_nodeFs["default"].existsSync(filename);
  }
}
function afterTest(testData, _context, _ref) {
  var passed = _ref.passed;
  // If this doesn't include context data, not a screenshot test
  if (testData && testData.title && testData.context && testData.context.params) {
    var fileName = testData.context.fileName.replace(/ /g, '_') + '.png';
    var referencePath = _nodePath["default"].join(baselineRelativePath, fileName);
    if (_context.isNewScreenshot) {
      _nodeFs["default"].open(newScreenshotFilename, 'a', function (err, fd) {
        if (err) {
          console.error('Unable to create log file!');
        } else {
          var _testData$context = testData.context,
            params = _testData$context.params,
            url = _testData$context.url;
          var output = {
            title: testData.title.replace(/~\//g, '/'),
            path: referencePath,
            params: params,
            url: url
          };
          _nodeFs["default"].appendFile(fd, "".concat(JSON.stringify(output), ","), 'utf8', function () {
            _nodeFs["default"].close(fd);
          });
        }
      });
    }
    if (!passed) {
      var screenPath = _nodePath["default"].join(screenshotRelativePath, 'actual', fileName);
      var diffPath = _nodePath["default"].join(screenshotRelativePath, 'diff', fileName);
      _nodeFs["default"].open(failedScreenshotFilename, 'a', function (err, fd) {
        if (err) {
          console.error('Unable to create failed test log file!');
        } else {
          var title = testData.title.replace(/~\//g, '/');
          var _testData$context2 = testData.context,
            params = _testData$context2.params,
            url = _testData$context2.url;
          var output = {
            title: title,
            diffPath: diffPath,
            referencePath: referencePath,
            screenPath: screenPath,
            params: params,
            url: url
          };
          _nodeFs["default"].appendFile(fd, "".concat(JSON.stringify(output), ","), 'utf8', function () {
            _nodeFs["default"].close(fd);
          });
        }
      });
    }
  }
}
function onComplete() {
  var _fs$statSync = _nodeFs["default"].statSync(newScreenshotFilename),
    newSize = _fs$statSync.size,
    _fs$statSync2 = _nodeFs["default"].statSync(failedScreenshotFilename),
    failedSize = _fs$statSync2.size;
  if (newSize !== Buffer.byteLength(newScreenshotHeader, 'utf8')) {
    _nodeFs["default"].appendFileSync(newScreenshotFilename, newScreenshotFooter, 'utf8');
    process.on('exit', function () {
      console.log("New screenshots created.  Use 'open ".concat(newScreenshotFilename, "' to view."));
    });
  } else {
    _nodeFs["default"].appendFileSync(newScreenshotFilename, newScreenshotFooter, 'utf8');
  }
  if (failedSize !== Buffer.byteLength(failedScreenshotHeader, 'utf8')) {
    _nodeFs["default"].appendFileSync(failedScreenshotFilename, failedScreenshotFooter, 'utf8');
    process.on('exit', function () {
      console.log("Screenshot diffs created.  Use 'open ".concat(failedScreenshotFilename, "' to view."));
    });
  } else {
    _nodeFs["default"].appendFileSync(failedScreenshotFilename, failedScreenshotFooter, 'utf8');
  }
}

// module.exports = {
// 	afterTest,
// 	baselineFolder,
// 	beforeTest,
// 	onComplete,
// 	onPrepare,
// 	screenshotFolder
// };
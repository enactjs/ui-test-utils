"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildApps = buildApps;
var _path = _interopRequireDefault(require("path"));
var _chalk = _interopRequireDefault(require("chalk"));
var _crossSpawn = _interopRequireDefault(require("cross-spawn"));
var _fsExtra = _interopRequireDefault(require("fs-extra"));
var _readdirp = _interopRequireDefault(require("readdirp"));
var url = _interopRequireWildcard(require("url"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } // const path = require('path');
// const chalk = require('chalk');
// const spawn = require('cross-spawn');
// const fs = require('fs-extra');
// const readdirp = require('readdirp');
// import url from 'url'
// import esMain from 'es-main';

var _dirname = _path["default"].dirname(url.fileURLToPath(import.meta.url));
console.log(_dirname);
var env = {
  ILIB_BASE_PATH: '/framework/ilib',
  ILIB_ASSET_CREATE: 'false',
  SIMPLE_CSS_IDENT: 'true',
  BROWSERSLIST: 'Chrome 79'
};
function findViews(base) {
  return _readdirp["default"].promise(_path["default"].join('tests', base, 'apps'), {
    fileFilter: '*-View.js'
  });
}
function buildApps(base) {
  if (process.argv.includes('--skip-build')) return;
  console.log('Building content:\n');
  return Promise.resolve().then(function () {
    if (!process.argv.includes('--skip-enact')) {
      epack({
        file: {
          basename: 'Enact framework bundle',
          fullPath: 'framework'
        },
        opts: ['pack', '--output', _path["default"].join('tests', base, 'dist', 'framework'), '--framework', '--externals-polyfill']
      });
    }
  }).then(function () {
    if (!process.argv.includes('--skip-ilib')) {
      var ilibDist = _path["default"].join('tests', base, 'dist', 'framework', 'ilib');
      if (!_fsExtra["default"].existsSync(ilibDist)) {
        _fsExtra["default"].mkdirSync(ilibDist);
      }
      process.stdout.write('\tiLib locale data... ');
      return _fsExtra["default"].copy(_path["default"].join('node_modules', 'ilib', 'locale'), _path["default"].join(ilibDist, 'locale')).then(function () {
        if (process.stdout.isTTY) {
          clearLine();
          process.stdout.write(_chalk["default"].green('\t✔ ') + 'iLib locale data\n');
        } else {
          process.stdout.write('DONE\n');
        }
      });
    }
  }).then(function () {
    if (!process.argv.includes('--skip-tests')) {
      return findViews(base).then(function (files) {
        return files.forEach(function (file) {
          return epack({
            file: file,
            opts: ['pack', '--entry', _path["default"].join(_dirname, '..', base, 'index.js'), '--output', _path["default"].join('tests', base, 'dist', _path["default"].basename(file.fullPath, '.js')), '--externals', 'tests/' + base + '/dist/framework', '--externals-polyfill']
          });
        });
      });
    }
  }).then(function () {
    if (base.includes('screenshot')) {
      var distUtils = _path["default"].join('tests', base, 'dist', 'utils'),
        redistSrc = _path["default"].join(_dirname, '..', 'screenshot', 'utils', 'redist');
      if (!_fsExtra["default"].existsSync(distUtils)) {
        _fsExtra["default"].mkdirSync(distUtils);
      }
      return _fsExtra["default"].copy(redistSrc, distUtils);
    }
  })["catch"](function (err) {
    console.error(_chalk["default"].red('Build failed:'));
    console.error();
    console.error(err.message);
    process.exit(1);
  });
}
function clearLine() {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
}
function epack(_ref) {
  var file = _ref.file,
    opts = _ref.opts;
  process.stdout.write('\t' + _path["default"].basename(file.basename, '.js') + '... ');
  var result = _crossSpawn["default"].sync('enact', opts, {
    cwd: process.cwd(),
    env: _objectSpread(_objectSpread(_objectSpread({}, process.env), env), {}, {
      ILIB_CONTEXT: _path["default"].dirname(file.fullPath),
      ENACT_ALIAS: JSON.stringify({
        UI_TEST_APP_ENTRY: file.fullPath
      }),
      PUBLIC_URL: '/' + _path["default"].basename(file.fullPath, '.js')
    }),
    encoding: 'utf8'
  });
  if (result.status === 0) {
    if (process.stdout.isTTY) {
      clearLine();
      process.stdout.write(_chalk["default"].green('\t✔ ') + _path["default"].basename(file.basename, '.js') + '\n');
    } else {
      process.stdout.write('DONE\n');
    }
  } else {
    var err = '';
    if (result.stdout) {
      err += result.stdout.split(/\n+/).slice(2).join('\n');
    }
    if (result.stderr) err += '\n' + result.stderr;
    if (process.stdout.isTTY) {
      clearLine();
      process.stdout.write(_chalk["default"].red('\t✖ ') + _path["default"].basename(file.basename, '.js') + '\n\n');
    } else {
      process.stdout.write('ERROR\n\n');
    }
    throw new Error(err || 'Unknown error');
  }
}
var modulePath = url.fileURLToPath(import.meta.url);
if (process.argv[1] === modulePath) buildApps();

// module.exports = buildApps;
// export default buildApps;
// if (esMain(import.meta)) {
// 	buildApps();
// }
// if (import.meta.url.startsWith('file:')) {
// 	const modulePath = url.fileURLToPath(import.meta.url);
// 	if (process.argv[1] === modulePath) {
// 		buildApps();
// 	}
// }
// if (require.main === module) buildApps();
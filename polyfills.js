/* eslint no-var: off, no-extend-native: off */
/*
 *  polyfills.js
 *
 *  Any polyfills or code required prior to loading the app.
 */


// Temporarily remap [Array].toLocaleString to [Array].toString.
// Fixes an issue with loading the polyfills within the v8 snapshot environment
// where toLocaleString() within the TypedArray polyfills causes snapshot failure.
var origToLocaleString = Array.prototype.toLocaleString;
Array.prototype.toLocaleString = Array.prototype.toString;

// Apply Babel polyfills
require('@babel/polyfill');

// Manually set global._babelPolyfill for situations where babel-preset-env
// transpiles into individual core-js polyfills, to avoid repeated usage.
global._babelPolyfill = true;

// Restore real [Array].toLocaleString for runtime usage.
Array.prototype.toLocaleString = origToLocaleString;


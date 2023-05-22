"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var formatDate = function formatDate(date) {
  // Dates without time made with generateDate will have 00:01:02 for the time
  // TODO: Ability to return times
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var day = ('0' + date.getDate()).slice(-2);
  var year = '' + date.getFullYear();
  return "".concat(year, "-").concat(month, "-").concat(day);
};

// Replacer function for stringify.  Can be used to process values and convert to more friendly
// values for test titles.
function replacer(key, value) {
  // Detect components as children
  // TODO: Would be nice to get displayName but hard to do
  // TODO: Make use of Symbol.for('react.fragment')
  if (value && value.$$typeof) {
    var type = value.type;
    var val = {
      props: value.props,
      children: value.children
    };
    // If it's a fragment, we can replace with empty string
    if (type === Symbol["for"]('react.fragment')) {
      type = '';
    }
    // If it's a string, it's a built-in type, output name and props
    if (typeof type === 'string') {
      // Must strip quotable characters before they get quoted again
      var props = JSON.stringify(val, replacer).replace(/[{}"]/g, '');
      return "<".concat(type, ">").concat(props, "</").concat(type, ">");
    } else {
      return val;
    }
  } else if (value === '') {
    return '<empty>';
  } else if (typeof value === 'string') {
    // Automatically shorten filenames from imported images
    value = value.replace(/.*tests\/screenshot\/images\//, '');
    // Picked 13 minimum arbitrarily so icons 'notification' and 'notificationoff' won't clash.
    if (value.length > 13) {
      value = value.slice(0, 13) + '…';
    }
  } else if (key === 'key' || key === 'ref') {
    // eslint-disable-next-line no-undefined
    return undefined;
  } else if (key === 'props' && typeof value === 'object' && Object.keys(value).length === 0) {
    return 'default';
  } else if (this[key] instanceof Date) {
    // `this` is instance of object that contains key/value
    return formatDate(this[key]); // Need to do this because toJson called before replacer
  } else if (value instanceof Array && value.length > 4) {
    value = value.slice(0, 3).concat('…');
  }
  return value;
}
var stringifyProps = function stringifyProps() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var outputProps = props;
  if (props.props && props.props.children) {
    // Put `children` first in the title
    var tmp = Object.assign({
      children: null
    }, props.props);
    outputProps = Object.assign({}, props);
    outputProps.props = tmp;
  }
  var formattedString = JSON.stringify(outputProps, replacer).replace(/[{}"]/g, '').replace(/:/g, ' = ').replace(/,/g, ', ')
  // TODO: check for complex children and remove
  .replace(/props = children = /g, '').replace(/props = /g, '').replace(/wrapper = /g, '');
  return formattedString.length === 0 ? 'default' : formattedString;
};
var generateTestData = function generateTestData(component, componentTests) {
  var metaData = [];
  componentTests.forEach(function (testCase) {
    var title = testCase.title;
    if (!title) {
      // Note: This isn't terribly extensible, but we need to correct the order of props
      // in the test names so that it's always predictable.  We could in the future filter
      // out react components and then apply a sort order to known props and alphabetize
      // unknown props. Alternately, we could move this into the theme to avoid having to
      // update this module when we want to add new theme-side props.
      title = stringifyProps({
        skin: testCase.skin,
        locale: testCase.locale,
        props: testCase.props ? testCase.props : testCase.component.props,
        wrapper: testCase.wrapper,
        textSize: testCase.textSize,
        skinVariants: testCase.skinVariants
      });
    }
    var meta = {
      title: title
    };
    metaData.push(meta);
  });
  return metaData;
};

// module.exports = {
// 	generateTestData
// };
var _default = generateTestData;
exports["default"] = _default;
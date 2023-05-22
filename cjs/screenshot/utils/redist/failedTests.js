"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function (results) {
  var h = document.querySelector('h1');
  var list = document.querySelector('.list > ol');
  var count = results.length;
  var currentIndex = -1;
  h.innerText += " (".concat(count, ")");
  results.forEach(function (item, index) {
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(item.title));
    li.onclick = function () {
      loadImage(index);
    };
    list.appendChild(li);
  });
  initializeButtons();
  if (count > 0) {
    loadImage(0);
  }
  function loadImage() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentIndex;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'diff';
    var image = document.querySelector('#image');
    var title = document.querySelector('#title');
    var preview = document.querySelector('.preview-image');
    currentIndex = index;
    var urlParts = results[index]["".concat(type, "Path")].split('/');
    image.src = [].concat(_toConsumableArray(urlParts.slice(0, -1)), [encodeURIComponent(urlParts.slice(-1)[0])]).join('/');
    title.innerText = "".concat(results[index].title, " (").concat(currentIndex + 1, " / ").concat(count, ")");
    updateButtons(type);
    if (results[index].title.indexOf('ar-SA') >= 0) {
      var pos = preview.scrollWidth - preview.clientWidth;
      preview.scrollLeft = pos;
    } else {
      preview.scrollLeft = 0;
    }
  }
  function nextImage() {
    loadImage(currentIndex + 1);
  }
  function prevImage() {
    loadImage(currentIndex - 1);
  }
  function appendButton(target, text, action) {
    var btn;
    btn = document.createElement('button');
    btn.innerText = text;
    btn.id = action;
    // eslint-disable-next-line no-undefined
    btn.onclick = function () {
      return loadImage(undefined, action);
    };
    target.appendChild(btn);
    return btn;
  }
  function initializeButtons() {
    var inc = document.querySelector('#inc'),
      dec = document.querySelector('#dec');
    var nextTarget = inc;
    var buttonbox = document.createElement('span');
    buttonbox.classList.add('buttonbox');
    appendButton(buttonbox, 'diff', 'diff');
    appendButton(buttonbox, 'reference', 'reference');
    appendButton(buttonbox, 'screen', 'screen');
    nextTarget.insertAdjacentElement('afterend', buttonbox);
    var btn = document.createElement('button');
    btn.innerText = 'test case';
    btn.id = 'testcase';
    btn.onclick = function () {
      var path = results[currentIndex].url;
      if (window.location.protocol === 'file:') {
        path = 'http://localhost:5000' + path;
      } else {
        path = 'dist' + path;
      }
      document.defaultView.open(path, '_blank');
    };
    buttonbox.insertAdjacentElement('afterend', btn);
    inc.onclick = nextImage;
    dec.onclick = prevImage;
  }
  function updateButtons(type) {
    var inc = document.querySelector('#inc'),
      dec = document.querySelector('#dec'),
      testCase = document.querySelector('#testcase'),
      activeButton = document.querySelector('.active'),
      targetButton = document.querySelector("#".concat(type));
    inc.disabled = count <= 0 || currentIndex >= count - 1;
    dec.disabled = count <= 0 || currentIndex <= 0;
    testCase.disabled = count <= 0;
    if (activeButton) {
      activeButton.classList.remove('active');
    }
    if (targetButton) {
      targetButton.classList.add('active');
    }
  }
  document.onkeydown = function (ev) {
    switch (ev.keyCode) {
      case 37:
        if (count > 0 && currentIndex > 0) {
          prevImage();
        }
        break;
      case 39:
        if (count > 0 && currentIndex < count - 1) {
          nextImage();
        }
        break;
    }
  };
  // eslint-disable-next-line no-undef
})(results);
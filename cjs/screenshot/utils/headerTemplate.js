"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
function _default(title) {
  return "<html>\n<head>\n\t<link rel=\"stylesheet\" href=\"utils/styles.css\">\n</head>\n<body>\n\t<div class=\"column\">\n\t\t<header class=\"cell fixed header\">\n\t\t\t<h1>".concat(title, "</h1>\n\t\t</header>\n\t\t<div class=\"cell body\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"cell fixed list\">\n\t\t\t\t\t<ol></ol>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"cell preview\">\n\t\t\t\t\t<div class=\"column\">\n\t\t\t\t\t\t<div class=\"cell fixed preview-header\">\n\t\t\t\t\t\t\t<button id=\"dec\">&lt;</button>\n\t\t\t\t\t\t\t<button id=\"inc\">&gt;</button>\n\t\t\t\t\t\t\t<div id=\"title\">Select an image</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"cell preview-image\">\n\t\t\t\t\t\t\t<img id=\"image\" tabindex=\"-1\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<script>\n\t\tconst results = [\n");
}
;
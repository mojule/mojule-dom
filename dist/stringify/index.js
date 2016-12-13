'use strict';

var Html = require('html-node');
var utils = require('mojule-utils');

var escapeHtml = utils.escapeHtml;


var info = Html();

var stringify = function stringify(node) {
  var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var html = '';

  var nodeType = node.value.nodeType;


  if (nodeType === 'text') html += escapeHtml(node.value.nodeValue);

  if (nodeType === 'comment') html += '<!--' + node.value.nodeValue + '-->';

  if (nodeType === 'element') {
    (function () {
      var _node$value = node.value,
          tagName = _node$value.tagName,
          attributes = _node$value.attributes;


      html += '<' + tagName;

      if (attributes) Object.keys(attributes).forEach(function (name) {
        var value = attributes[name];

        html += ' ' + name;

        if (value) html += '="' + value + '"';
      });

      html += info.isEmpty(tagName) ? ' />' : '>';

      depth++;
    })();
  }

  if (Array.isArray(node.children)) node.children.forEach(function (child) {
    return html += stringify(child, depth);
  });

  if (nodeType === 'element' && !info.isEmpty(node.value.tagName)) {
    html += '</' + node.value.tagName + '>';
  }

  return html;
};

module.exports = stringify;
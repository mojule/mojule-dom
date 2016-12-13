'use strict';

var baseAdapter = require('css-select-base-adapter');

var Adapter = function Adapter(fn, root) {
  var isTag = function isTag(node) {
    var value = fn.value(node);

    return value && value.nodeType === 'element';
  };

  var getAttributeValue = function getAttributeValue(node, name) {
    var value = fn.value(node);

    if (value && value.attributes) return value.attributes[name];
  };

  var getChildren = function getChildren(node) {
    return fn.getChildren(node);
  };

  var getName = function getName(node) {
    var value = fn.value(node);

    if (value) return value.tagName;
  };

  var getParent = function getParent(node) {
    return fn.getParent(fn, root, node);
  };

  var getText = function getText(node) {
    if (Array.isArray(node)) return node.map(getText).join('');

    if (isTag(node)) return getText(getChildren(node));

    var value = fn.value(node);

    if (value && value.nodeType === 'text') return value.nodeValue;

    return '';
  };

  var adapter = {
    isTag: isTag, getAttributeValue: getAttributeValue, getChildren: getChildren, getName: getName, getParent: getParent, getText: getText
  };

  return baseAdapter(adapter);
};

module.exports = Adapter;
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = require('mojule-utils');

var clone = utils.clone;


var element = function element(fn) {
  var attributes = function attributes(node, attributeMap) {
    fn.assertElement(node);

    var nodeValue = fn.value(node);

    if ((typeof attributeMap === 'undefined' ? 'undefined' : _typeof(attributeMap)) === 'object') {
      Object.keys(attributeMap).forEach(function (attributeName) {
        var attributeValue = attributeMap[attributeName];

        fn.attr(node, attributeName, attributeValue);
      });
    }

    if (nodeValue.attributes === undefined) return {};

    return clone(nodeValue.attributes);
  };

  attributes.def = {
    argTypes: ['node', 'object?'],
    returnType: 'object',
    requires: ['value', 'assertElement', 'attr'],
    categories: ['dom', 'attributes', 'plugins']
  };

  var tagName = function tagName(node, value) {
    fn.assertElement(node);

    var nodeValue = fn.value(node);

    if (value !== undefined) {
      nodeValue.tagName = value;

      fn.value(node, nodeValue);
    }

    return nodeValue.tagName;
  };

  tagName.def = {
    argTypes: ['node', 'string'],
    returnType: 'string',
    requires: ['value', 'assertElement'],
    categories: ['dom', 'tagName', 'plugins']
  };

  var attr = function attr(node, name, value) {
    fn.assertElement(node);

    var nodeValue = fn.value(node);

    if (value !== undefined) {
      if (nodeValue.attributes === undefined) nodeValue.attributes = {};

      nodeValue.attributes[name] = value.toString();

      fn.value(node, nodeValue);
    }

    if (_typeof(nodeValue.attributes) === 'object') return nodeValue.attributes[name];
  };

  attr.def = {
    argTypes: ['node', 'string', 'string'],
    returnType: 'string',
    requires: ['value', 'assertElement'],
    categories: ['dom', 'attr', 'plugins']
  };

  var hasAttr = function hasAttr(node, name) {
    fn.assertElement(node);

    return fn.attr(node, name) !== undefined;
  };

  hasAttr.def = {
    argTypes: ['node', 'string'],
    returnType: 'boolean',
    requires: ['value', 'assertElement'],
    categories: ['dom', 'hasAttr', 'plugins']
  };

  var removeAttr = function removeAttr(node, name) {
    fn.assertElement(node);

    var nodeValue = fn.value(node);

    if (_typeof(nodeValue.attributes) === 'object') delete nodeValue.attributes[name];

    fn.value(node, nodeValue);
  };

  removeAttr.def = {
    argTypes: ['node', 'string'],
    requires: ['value', 'assertElement'],
    categories: ['dom', 'removeAttr', 'plugins']
  };

  var clearAttrs = function clearAttrs(node) {
    fn.assertElement(node);

    var nodeValue = fn.value(node);

    nodeValue.attributes = {};

    fn.value(node, nodeValue);
  };

  clearAttrs.def = {
    argTypes: ['node'],
    requires: ['value', 'assertElement'],
    categories: ['dom', 'clearAttrs', 'plugins']
  };

  var clearClasses = function clearClasses(node) {
    fn.assertElement(node);

    fn.attr(node, 'class', '');
  };

  clearClasses.def = {
    argTypes: ['node'],
    requires: ['value', 'assertElement'],
    categories: ['dom', 'clearClasses', 'plugins']
  };

  var classNames = function classNames(node) {
    fn.assertElement(node);

    var classNames = fn.attr(node, 'class');

    if (typeof classNames === 'string') return classNames.split(' ');

    return [];
  };

  classNames.def = {
    argTypes: ['node'],
    returnType: '[string]',
    requires: ['attr', 'assertElement'],
    categories: ['dom', 'classNames', 'plugins']
  };

  var hasClass = function hasClass(node, className) {
    fn.assertElement(node);

    return fn.classNames(node).some(function (name) {
      return name === className;
    });
  };

  hasClass.def = {
    argTypes: ['node', 'string'],
    returnType: 'boolean',
    requires: ['classNames', 'assertElement'],
    categories: ['dom', 'hasClass', 'plugins']
  };

  var addClass = function addClass(node, className) {
    fn.assertElement(node);

    className = className.trim();

    var existing = fn.classNames(node);

    existing.push(className);

    fn.attr(node, 'class', existing.join(' '));

    return node;
  };

  addClass.def = {
    argTypes: ['node', 'string'],
    returnType: 'node',
    requires: ['classNames', 'attr', 'assertElement'],
    categories: ['dom', 'addClass', 'plugins']
  };

  var addClasses = function addClasses(node) {
    for (var _len = arguments.length, classNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      classNames[_key - 1] = arguments[_key];
    }

    fn.assertElement(node);

    var existing = fn.classNames(node);

    existing.push.apply(existing, classNames);

    fn.attr(node, 'class', existing.join(' '));

    return node;
  };

  addClasses.def = {
    argTypes: ['node', '...string'],
    returnType: 'node',
    requires: ['classNames', 'attr', 'assertElement'],
    categories: ['dom', 'addClasses', 'plugins']
  };

  var removeClass = function removeClass(node, className) {
    fn.assertElement(node);

    className = className.trim();

    var existing = fn.classNames(node).filter(function (name) {
      return name !== className;
    });

    fn.attr(node, 'class', existing.join(' '));

    return node;
  };

  removeClass.def = {
    argTypes: ['node', 'string'],
    returnType: 'node',
    requires: ['classNames', 'attr', 'assertElement'],
    categories: ['dom', 'removeClass', 'plugins']
  };

  var toggleClass = function toggleClass(node, className, shouldHave) {
    fn.assertElement(node);

    var alreadyHas = fn.hasClass(node, className);

    if (typeof shouldHave !== 'boolean') return fn.toggleClass(node, className, !alreadyHas);

    if (alreadyHas) {
      if (shouldHave) return node;

      return fn.removeClass(node, className);
    }

    if (shouldHave) return fn.addClass(node, className);

    return node;
  };

  toggleClass.def = {
    argTypes: ['node', 'string', 'boolean'],
    returnType: 'node',
    requires: ['hasClass', 'removeClass', 'addClass', 'assertElement'],
    categories: ['dom', 'toggleClass', 'plugins']
  };

  var plugins = {
    attributes: attributes, attr: attr, hasAttr: hasAttr, removeAttr: removeAttr, classNames: classNames, hasClass: hasClass, addClass: addClass,
    removeClass: removeClass, toggleClass: toggleClass, tagName: tagName, clearAttrs: clearAttrs, clearClasses: clearClasses, addClasses: addClasses
  };

  return Object.assign(fn, plugins);
};

module.exports = element;
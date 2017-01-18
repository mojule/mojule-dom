'use strict';

var Html = require('html-node');

var html = Html();

var emptyNodeTypes = ['text', 'comment', 'documentType'];

var nodeNameMap = {
  element: function element(fn, node) {
    return fn.tagName(node);
  },
  documentType: function documentType(fn, node) {
    var value = fn.value(node);

    return value.name;
  }
};

var nodePlugins = function nodePlugins(fn) {
  var nodeType = function nodeType(fn, node) {
    var value = fn.value(node);

    return value.nodeType;
  };

  nodeType.def = {
    argTypes: ['fn', 'node'],
    returnType: 'string',
    requires: ['value'],
    categories: ['node', 'plugin']
  };

  var nodeName = function nodeName(fn, node) {
    var nodeType = fn.nodeType(fn, node);

    if (nodeType in nodeNameMap) return nodeNameMap[nodeType](fn, node);

    return '#' + nodeType;
  };

  nodeName.def = {
    argTypes: ['fn', 'node'],
    returnType: 'string',
    requires: ['nodeType'],
    categories: ['node', 'plugin']
  };

  var isEmpty = function isEmpty(fn, node) {
    var nodeType = fn.nodeType(fn, node);

    if (emptyNodeTypes.includes(nodeType)) return true;

    if (nodeType === 'element') {
      var tagName = fn.tagName(node);

      return html.isEmpty(tagName);
    }

    // assumes remaining node types should be able to have children, is this true?
    return false;
  };

  isEmpty.def = {
    argType: ['fn', 'node'],
    returnType: 'boolean',
    require: ['nodeType', 'tagName'],
    categories: ['node', 'plugin']
  };

  var accepts = function accepts(fn, node, childNode) {
    var isEmpty = fn.isEmpty(fn, node);

    if (isEmpty) return false;

    var nodeType = fn.nodeType(fn, node);
    var childNodeType = fn.nodeType(fn, childNode);

    if (childNodeType === 'documentType') return nodeType === 'document';

    if (nodeType === 'element') {
      if (childNodeType === 'text' || childNodeType === 'comment') return true;

      var _nodeName = fn.nodeName(fn, node);
      var childName = fn.nodeName(fn, childNode);

      return html.accepts(_nodeName, childName);
    }

    // assumes non-elements that can have child nodes can have any child node,
    // is this true?
    return true;
  };

  accepts.def = {
    argType: ['fn', 'node', 'node'],
    returnType: 'boolean',
    require: ['isEmpty', 'nodeType', 'nodeName'],
    categories: ['node', 'plugin']
  };

  return Object.assign(fn, { nodeType: nodeType, nodeName: nodeName, isEmpty: isEmpty, accepts: accepts });
};

module.exports = nodePlugins;
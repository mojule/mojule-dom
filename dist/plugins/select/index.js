'use strict';

var Adapter = require('./htmlparser2-adapter');
var Select = require('../../select');

var Selecter = function Selecter(fn, root) {
  return Select(Adapter(fn, root));
};

var querySelector = function querySelector(fn) {
  var select = function select(fn, root, node, query) {
    return Selecter(fn, root).select(node, query);
  };

  select.def = {
    argTypes: ['fn', 'rootNode', 'node', 'string'],
    returnType: 'node',
    requires: ['value', 'getChildren', 'getParent'],
    categories: ['query', 'select', 'plugins']
  };

  var selectAll = function selectAll(fn, root, node, query) {
    return Selecter(fn, root).selectAll(node, query);
  };

  selectAll.def = {
    argTypes: ['fn', 'rootNode', 'node', 'string'],
    returnType: '[node]',
    requires: ['value', 'getChildren', 'getParent'],
    categories: ['query', 'select', 'plugins']
  };

  var matches = function matches(fn, root, node, query) {
    return Selecter(fn, root).matches(node, query);
  };

  matches.def = {
    argTypes: ['fn', 'rootNode', 'node', 'string'],
    returnType: 'boolean',
    requires: ['value', 'getChildren', 'getParent'],
    categories: ['query', 'select', 'plugins']
  };

  var plugin = { select: select, selectAll: selectAll, matches: matches };

  return Object.assign(fn, plugin);
};

module.exports = querySelector;
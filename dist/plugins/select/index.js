'use strict';

var Adapter = require('./htmlparser2-adapter');
var Select = require('../../select');

var Selecter = function Selecter(fn, root) {
  return Select(Adapter(fn, root));
};

/*
  note - this differs from many selector engines as it allows you to select
  self, not just descendants!

  this matches how find works in 1tree, but also we have a lot of code that
  depends on this behaviour
*/
var querySelector = function querySelector(fn) {
  var select = function select(fn, root, node, query) {
    var selecter = Selecter(fn, root);

    if (selecter.matches(node, query)) return node;

    return selecter.select(node, query);
  };

  select.def = {
    argTypes: ['fn', 'rootNode', 'node', 'string'],
    returnType: 'node',
    requires: ['value', 'getChildren', 'getParent'],
    categories: ['query', 'select', 'plugins']
  };

  var selectDescendant = function selectDescendant(fn, root, node, query) {
    return Selecter(fn, root).select(node, query);
  };

  selectDescendant.def = {
    argTypes: ['fn', 'rootNode', 'node', 'string'],
    returnType: 'node',
    requires: ['value', 'getChildren', 'getParent'],
    categories: ['query', 'select', 'plugins']
  };

  var selectAll = function selectAll(fn, root, node, query) {
    var selecter = Selecter(fn, root);
    var self = [];

    if (selecter.matches(node, query)) self.push(node);

    return self.concat(selecter.selectAll(node, query));
  };

  selectAll.def = {
    argTypes: ['fn', 'rootNode', 'node', 'string'],
    returnType: '[node]',
    requires: ['value', 'getChildren', 'getParent'],
    categories: ['query', 'select', 'plugins']
  };

  var selectAllDescendants = function selectAllDescendants(fn, root, node, query) {
    return Selecter(fn, root).selectAll(node, query);
  };

  selectAllDescendants.def = {
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

  var plugin = {
    select: select, selectAll: selectAll, selectDescendant: selectDescendant, selectAllDescendants: selectAllDescendants, matches: matches
  };

  return Object.assign(fn, plugin);
};

module.exports = querySelector;
'use strict';

/*
  Extend createTree to allow creating a tree from an HTML string
*/

var parseStr = require('../../parse');

// should be added after the default plugins so that createTree exists!
var createTreeFromStr = function createTreeFromStr(fn) {
  // override createTree to allow passing a string
  var originalCreateTree = fn.createTree;

  var createTree = function createTree(rootValue) {
    if (typeof rootValue === 'string') rootValue = parseStr(rootValue);

    return originalCreateTree(rootValue);
  };

  createTree.def = originalCreateTree.def;

  return Object.assign(fn, { createTree: createTree });
};

module.exports = createTreeFromStr;
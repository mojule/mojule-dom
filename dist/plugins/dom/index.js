'use strict';

var element = require('./element');
var create = require('./create');
var node = require('./node');

var dom = function dom(fn) {
  element(fn);
  create(fn);
  node(fn);
};

module.exports = dom;
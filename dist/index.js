'use strict';

var TreeFactory = require('1tree-factory');

var createTree = require('./plugins/createTree');
var insertBefore = require('./plugins/insertBefore');
var dom = require('./plugins/dom');
var parse = require('./plugins/parse');
var select = require('./plugins/select');
var stringify = require('./plugins/stringify');
var types = require('./plugins/types');
var vdom = require('./plugins/vdom');

var DomTree = TreeFactory(dom, parse, select, stringify, types, vdom);

// add afterwards because the original createTree doesn't exist until now
DomTree.plugin(createTree);
// add afterwards so that it wraps parentMap and not the other way round
DomTree.plugin(insertBefore);

module.exports = DomTree;
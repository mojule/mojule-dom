'use strict';

var Mtree = require('1tree-factory');

var createTree = require('./plugins/createTree');
var insertBefore = require('./plugins/insertBefore');
var dom = require('./plugins/dom');
var parse = require('./plugins/parse');
var select = require('./plugins/select');
var stringify = require('./plugins/stringify');
var types = require('./plugins/types');
var vdom = require('./plugins/vdom');

var Htree = Mtree(dom, parse, select, stringify, types, vdom);

// add afterwards because the original createTree doesn't exist until now
Htree.plugin(createTree);
// add afterwards so that it wraps parentMap and not the other way round
Htree.plugin(insertBefore);

module.exports = Htree;
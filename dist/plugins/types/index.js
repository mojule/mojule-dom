'use strict';

var Validator = require('mtype-tv4');
var schema = require('../../schema');
var utils = require('mojule-utils');

var capitalizeFirstLetter = utils.capitalizeFirstLetter;

// could get this from the names, but better to be explicit

var nodeTypes = ['text', 'element', 'comment', 'document', 'documentType', 'documentFragment'];

var validator = Validator(schema);
var t = Validator.mtype(validator);

var isType = function isType(node, typename) {
  return t.is(node, typename);
};

isType.def = {
  argTypes: ['node', 'string'],
  returnType: 'boolean',
  requires: [],
  categories: ['type', 'plugin']
};

var types = function types(fn) {
  var assertType = function assertType(node, typename) {
    if (!fn.isType(node, typename)) throw new TypeError('Expected node to be ' + typename);
  };

  assertType.def = {
    argTypes: ['node', 'string'],
    requires: ['isType'],
    categories: ['type', 'plugin']
  };

  var plugins = { isType: isType, assertType: assertType };

  // add isDocument, isText etc
  nodeTypes.forEach(function (typename) {
    var capTypename = capitalizeFirstLetter(typename);
    var isName = 'is' + capTypename;
    var assertName = 'assert' + capTypename;

    plugins[isName] = function (node) {
      return fn.isType(node, typename);
    };
    plugins[isName].def = isType.def;

    plugins[assertName] = function (node) {
      return fn.assertType(node, typename);
    };
    plugins[assertName].def = assertType.def;
  });

  return Object.assign(fn, plugins);
};

module.exports = types;
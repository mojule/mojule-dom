'use strict';

var stringifyNode = require('../../stringify');

var stringifier = function stringifier(fn) {
  var stringify = function stringify(node) {
    return stringifyNode(node);
  };

  stringify.def = {
    argTypes: ['node'],
    returnType: 'string',
    requires: [],
    categories: ['stringify', 'plugin']
  };

  return Object.assign(fn, { stringify: stringify });
};

module.exports = stringifier;
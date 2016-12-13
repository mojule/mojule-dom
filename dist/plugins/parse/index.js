'use strict';

var parseStr = require('../../parse');

var parser = function parser(fn) {
  var parse = function parse(str) {
    return fn.deserialize(parseStr(str));
  };

  parse.def = {
    argTypes: ['string'],
    returnType: 'node',
    requires: ['deserialize'],
    categories: ['parser', 'plugin']
  };

  return Object.assign(fn, { parse: parse });
};

module.exports = parser;
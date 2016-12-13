'use strict';

var htmlparser2 = require('htmlparser2');
var DomHandler = require('./domhandler-adapter');

var parse = function parse(str) {
  var handler = DomHandler();
  new htmlparser2.Parser(handler).end(str);

  return handler.getDom();
};

module.exports = parse;
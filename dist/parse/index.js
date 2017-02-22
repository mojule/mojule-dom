'use strict';

var htmlparser2 = require('htmlparser2');
var DomHandler = require('./domhandler-adapter');

var parse = function parse(str) {
  var handler = DomHandler();
  new htmlparser2.Parser(handler).end(str);

  var dom = handler.getDom();

  var value = dom.value,
      children = dom.children;
  var nodeType = value.nodeType;


  var isSingleElement = nodeType === 'documentFragment' && children.length === 1;

  if (isSingleElement) return children[0];

  return dom;
};

module.exports = parse;
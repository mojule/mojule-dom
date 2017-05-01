'use strict';

var html = require('@mojule/html');
var is = require('@mojule/is');

var accepts = function accepts(node) {
  var _accepts = node.accepts;


  return {
    accepts: function accepts(child) {
      // any node should accept a whitespace only text node?
      if (!node.isEmpty() && child.isText() && child.getText().trim() === '') return true;

      var from = node.nodeName();
      var to = child.nodeName();
      var isAccepts = html.accepts(from, to);

      if (is.undefined(isAccepts)) return _accepts(child);

      return isAccepts;
    }
  };
};

module.exports = accepts;
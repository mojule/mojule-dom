'use strict';

var html = require('@mojule/html');
var is = require('@mojule/is');

var isEmpty = function isEmpty(node) {
  var _isEmpty = node.isEmpty;


  return {
    isEmpty: function isEmpty() {
      var empty = html.isEmpty(node.nodeName());

      if (is.undefined(empty)) return _isEmpty();

      return empty;
    }
  };
};

module.exports = isEmpty;
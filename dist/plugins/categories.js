'use strict';

var html = require('@mojule/html');
var is = require('@mojule/is');

var categories = function categories(node) {
  return {
    categories: function categories() {
      var def = html.def(node.nodeName());

      if (is.object(def) && is.array(def.categories)) return def.categories;

      return [];
    }
  };
};

module.exports = categories;
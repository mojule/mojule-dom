'use strict';

var CSSselect = require('css-select');

var Select = function Select(adapter) {
  var options = { adapter: adapter };

  var select = function select(node, selector) {
    return CSSselect.selectOne(selector, node, options);
  };

  var selectAll = function selectAll(node, selector) {
    return CSSselect(selector, node, options);
  };

  var matches = function matches(node, selector) {
    return CSSselect.is(node, selector, options);
  };

  var api = {
    select: select, selectAll: selectAll, matches: matches
  };

  return api;
};

module.exports = Select;
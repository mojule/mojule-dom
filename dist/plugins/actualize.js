'use strict';

var actualize = function actualize(node) {
  return {
    actualize: function actualize(document) {
      return node.vnode().actualize(document);
    }
  };
};

module.exports = actualize;
'use strict';

var Vnode = require('../vnode');

var vnode = function vnode(node) {
  return {
    vnode: function vnode() {
      return Vnode(node);
    }
  };
};

module.exports = vnode;
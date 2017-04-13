'use strict';

var _morphdom = require('morphdom');

var morphdomModule = function morphdomModule(node) {
  return {
    morphdom: function morphdom(targetEl, options) {
      var vnode = node.vnode();

      return _morphdom(targetEl, vnode, options);
    }
  };
};

module.exports = morphdomModule;
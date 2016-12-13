'use strict';

var morphdom = require('morphdom');
var Vnode = require('../../vdom');

var morphdomPlugin = function morphdomPlugin(fn) {
  var patchDom = function patchDom(node, targetEl, options) {
    //Vnode expects wrapped node!
    var wrapped = fn.createTree(node);
    var vdom = Vnode(wrapped);

    morphdom(targetEl, vdom, options);
  };

  patchDom.def = {
    argTypes: ['node', 'object', 'object'],
    requires: ['createTree'],
    categories: ['patch', 'plugin']
  };

  return Object.assign(fn, { morphdom: patchDom });
};

module.exports = morphdomPlugin;
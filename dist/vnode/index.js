'use strict';

var Vnode = function Vnode(node) {
  if (node === null || node === undefined) {
    return node;
  }

  var vnode = {
    get firstChild() {
      return Vnode(node.firstChild());
    },

    get nextSibling() {
      return Vnode(node.nextSibling());
    },

    get nodeType() {
      return node.nodeType();
    },

    get nodeName() {
      return node.nodeName();
    },

    // should be something for svg or math etc.!
    get namespaceURI() {
      return 'http://www.w3.org/1999/xhtml';
    },

    get nodeValue() {
      return node.nodeValue();
    },

    get value() {
      return node.getValue('value');
    },

    get selected() {
      return !!node.getValue('selected');
    },

    get disabled() {
      return !!node.getValue('disabled');
    },

    // should be something for svg or math etc.!
    // hasAttributeNS: ( namespaceURI, name ) => {
    hasAttributeNS: function hasAttributeNS(namespaceURI) {
      return namespaceURI === vnode.namespaceURI;
    },

    assignAttributes: function assignAttributes(targetNode) {
      var attributes = node.attributes();

      Object.keys(attributes).forEach(function (name) {
        return targetNode.setAttribute(name, attributes[name]);
      });
    },

    actualize: function actualize(document) {
      return _actualize[vnode.nodeType](document, vnode);
    }
  };

  return vnode;
};

var addChildren = function addChildren(document, el, vnode) {
  var child = vnode.firstChild;

  while (child) {
    el.appendChild(child.actualize(document));
    child = child.nextSibling;
  }
};

var _actualize = {
  text: function text(document, vnode) {
    return document.createTextNode(vnode.nodeValue);
  },
  comment: function comment(document, vnode) {
    return document.createComment(vnode.nodeValue);
  },
  element: function element(document, vnode) {
    var el = document.createElement(vnode.nodeName);

    vnode.assignAttributes(el);

    addChildren(document, el, vnode);

    return el;
  },
  documentFragment: function documentFragment(document, vnode) {
    var el = document.createDocumentFragment();

    addChildren(document, el, vnode);

    return el;
  }
};

module.exports = Vnode;
'use strict';

var is = require('@mojule/is');

var nodeTypes = {
  element: 1,
  text: 3,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11
};

var Vnode = function Vnode(node) {
  if (is.null(node) || is.undefined(node)) return node;

  var vnode = {
    get firstChild() {
      return Vnode(node.firstChild());
    },

    get nextSibling() {
      return Vnode(node.nextSibling());
    },

    get nodeType() {
      return nodeTypes[node.nodeType()];
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

    get attributes() {
      var attributes = node.attributes();
      var names = Object.keys(attributes);

      return names.map(function (name) {
        return {
          name: name,
          value: attributes[name]
        };
      });
    },

    get value() {
      return node.getAttr('value');
    },

    get selected() {
      return !!node.getAttr('selected');
    },

    get disabled() {
      return !!node.getAttr('disabled');
    },

    // should be something for svg or math etc.!
    // hasAttributeNS: ( namespaceURI, name ) => {
    hasAttributeNS: function hasAttributeNS(namespaceURI) {
      return is.null(namespaceURI) || namespaceURI === vnode.namespaceURI;
    },

    getAttributeNode: function getAttributeNode(namespaceURI, name) {
      return node.hasAttr(name);
    },

    assignAttributes: function assignAttributes(targetNode) {
      var attributes = node.attributes();

      Object.keys(attributes).forEach(function (name) {
        return targetNode.setAttribute(name, attributes[name]);
      });
    },

    treeNode: function treeNode() {
      return node;
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
  1: function _(document, vnode) {
    var el = document.createElement(vnode.nodeName);

    vnode.assignAttributes(el);

    addChildren(document, el, vnode);

    return el;
  },
  3: function _(document, vnode) {
    return document.createTextNode(vnode.nodeValue);
  },
  8: function _(document, vnode) {
    return document.createComment(vnode.nodeValue);
  },
  9: function _(document, vnode) {
    var doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html');

    while (doc.firstChild) {
      doc.removeChild(doc.firstChild);
    }addChildren(document, doc, vnode);

    return doc;
  },
  10: function _(document, vnode) {
    var treeNode = vnode.treeNode();

    var _treeNode$getValue = treeNode.getValue(),
        name = _treeNode$getValue.name,
        publicId = _treeNode$getValue.publicId,
        systemId = _treeNode$getValue.systemId;

    var doctype = document.implementation.createDocumentType(name, publicId, systemId);

    return doctype;
  },
  11: function _(document, vnode) {
    var el = document.createDocumentFragment();

    addChildren(document, el, vnode);

    return el;
  }
};

module.exports = Vnode;
'use strict';

var nodeTypes = {
  element: 1,
  text: 3,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  1: 'element',
  3: 'text',
  8: 'comment',
  9: 'document',
  10: 'documentType',
  11: 'documentFragment'
};

var hasChildren = {
  // element
  1: true,
  // document
  9: true,
  // documentFragment
  11: true
};

var virtualize = function virtualize(api) {
  var mappers = {
    1: function _(node) {
      var tagName = node.tagName,
          attributes = node.attributes;


      var attr = Array.from(attributes).reduce(function (obj, pair) {
        obj[pair.name] = pair.value;

        return obj;
      }, {});

      return api.createElement(tagName.toLowerCase(), attr);
    },
    3: function _(node) {
      return api.createText(node.nodeValue);
    },
    8: function _(node) {
      return api.createComment(node.nodeValue);
    },
    9: function _() {
      return api.createDocument();
    },
    10: function _(node) {
      return api.createDocumentType(node.name, node.publicId, node.systemId);
    },
    11: function _(node) {
      return api.createDocumentFragment();
    }
  };

  var addChildren = function addChildren(domNode, treeNode) {
    Array.from(domNode.childNodes).forEach(function (domChild) {
      treeNode.append(api.virtualize(domChild));
    });
  };

  return {
    $virtualize: function $virtualize(domNode) {
      var type = domNode.nodeType;
      var node = mappers[type](domNode);

      if (hasChildren[type]) addChildren(domNode, node);

      return node;
    }
  };
};

module.exports = virtualize;
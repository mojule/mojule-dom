'use strict';

var EntityNode = require('mtype-node');
var utils = require('mojule-utils');

var capitalizeFirstLetter = utils.capitalizeFirstLetter;


var nodeMap = {
  element: function element() {
    return {
      tagName: 'div',
      attributes: {}
    };
  },
  comment: function comment() {
    return {
      nodeValue: '',
      isEmpty: true
    };
  },
  text: function text() {
    return {
      nodeValue: '',
      isEmpty: true
    };
  },
  documentType: function documentType() {
    return {
      name: 'html',
      publicId: '',
      systemId: '',
      isEmpty: true
    };
  }
};

var createDomNode = function createDomNode(fn, nodeType, value) {
  var defaultValue = nodeType in nodeMap ? nodeMap[nodeType]() : {};

  value = Object.assign({ nodeType: nodeType }, defaultValue, value || {});

  var entityNode = EntityNode(nodeType, value);

  var node = fn.createNode(entityNode.value);

  var capNodeType = capitalizeFirstLetter(nodeType);
  var assertName = 'assert' + capNodeType;

  fn[assertName](node);

  return node;
};

var createDomNodeDef = function createDomNodeDef(nodeType, argTypes) {
  return {
    argTypes: argTypes,
    returnType: 'node',
    requires: ['createNode', 'assert' + capitalizeFirstLetter(nodeType)],
    categories: ['create', 'plugin']
  };
};

var create = function create(fn) {
  var createElement = function createElement(tagName, attributes) {
    attributes = attributes || {};

    return createDomNode(fn, 'element', { tagName: tagName, attributes: attributes });
  };

  createElement.def = createDomNodeDef('element', ['string', 'object']);

  var createComment = function createComment(nodeValue) {
    return createDomNode(fn, 'element', { nodeValue: nodeValue });
  };

  createComment.def = createDomNodeDef('comment', ['string']);

  var createDocument = function createDocument() {
    return createDomNode(fn, 'document');
  };

  createDocument.def = createDomNodeDef('document', []);

  var createDocumentFragment = function createDocumentFragment() {
    return createDomNode(fn, 'documentFragment');
  };

  createDocumentFragment.def = createDomNodeDef('documentFragment', []);

  var createText = function createText(nodeValue) {
    return createDomNode(fn, 'text', {
      nodeValue: String(nodeValue)
    });
  };

  createText.def = createDomNodeDef('text', ['string']);

  var createDocumentType = function createDocumentType(name, publicId, systemId) {
    return createDomNode(fn, 'documentType', { name: name, publicId: publicId, systemId: systemId });
  };

  createDocumentType.def = createDomNodeDef('documentType', ['string', 'string', 'string']);

  var plugins = {
    createText: createText, createElement: createElement, createComment: createComment, createDocument: createDocument,
    createDocumentFragment: createDocumentFragment, createDocumentType: createDocumentType
  };

  return Object.assign(fn, plugins);
};

module.exports = create;
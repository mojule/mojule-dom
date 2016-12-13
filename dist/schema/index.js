'use strict';

var entityNode = require('mtype-node/schema/entityNode.schema.json');
var entityNodeValue = require('mtype-node/schema/entityNodeValue.schema.json');
var emptyNode = require('mtype-node/schema/emptyNode.schema.json');
var emptyNodeValue = require('mtype-node/schema/emptyNodeValue.schema.json');
var parentNode = require('mtype-node/schema/parentNode.schema.json');

var comment = require('./comment.schema.json');
var commentValue = require('./commentValue.schema.json');
var documentFragment = require('./documentFragment.schema.json');
var documentFragmentValue = require('./documentFragmentValue.schema.json');
var document = require('./document.schema.json');
var documentValue = require('./documentValue.schema.json');
var documentType = require('./documentType.json');
var documentTypeValue = require('./documentTypeValue.schema.json');
var element = require('./element.schema.json');
var elementValue = require('./elementValue.schema.json');
var text = require('./text.schema.json');
var textValue = require('./textValue.schema.json');

var schema = {
  comment: comment, commentValue: commentValue, documentFragment: documentFragment,
  documentFragmentValue: documentFragmentValue, document: document, documentValue: documentValue, documentType: documentType,
  documentTypeValue: documentTypeValue, element: element, elementValue: elementValue, text: text, textValue: textValue,

  entityNode: entityNode, entityNodeValue: entityNodeValue, emptyNode: emptyNode, emptyNodeValue: emptyNodeValue, parentNode: parentNode
};

module.exports = schema;
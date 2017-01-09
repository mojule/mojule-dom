'use strict';

var entityNode = require('mtype-node/schema/entityNode.schema.json');
var entityNodeValue = require('mtype-node/schema/entityNodeValue.schema.json');
var emptyNode = require('mtype-node/schema/emptyNode.schema.json');
var parentNode = require('mtype-node/schema/parentNode.schema.json');

var comment = require('../../schema/comment.schema.json');
var commentValue = require('../../schema/commentValue.schema.json');
var documentFragment = require('../../schema/documentFragment.schema.json');
var documentFragmentValue = require('../../schema/documentFragmentValue.schema.json');
var document = require('../../schema/document.schema.json');
var documentValue = require('../../schema/documentValue.schema.json');
var documentType = require('../../schema/documentType.json');
var documentTypeValue = require('../../schema/documentTypeValue.schema.json');
var element = require('../../schema/element.schema.json');
var elementValue = require('../../schema/elementValue.schema.json');
var text = require('../../schema/text.schema.json');
var textValue = require('../../schema/textValue.schema.json');

var schema = {
  comment: comment, commentValue: commentValue, documentFragment: documentFragment,
  documentFragmentValue: documentFragmentValue, document: document, documentValue: documentValue, documentType: documentType,
  documentTypeValue: documentTypeValue, element: element, elementValue: elementValue, text: text, textValue: textValue,

  entityNode: entityNode, entityNodeValue: entityNodeValue, emptyNode: emptyNode, parentNode: parentNode
};

module.exports = schema;
'use strict'

const entityNode = require( 'mtype-node/schema/entityNode.schema.json' )
const entityNodeValue = require( 'mtype-node/schema/entityNodeValue.schema.json' )
const emptyNode = require( 'mtype-node/schema/emptyNode.schema.json' )
const emptyNodeValue = require( 'mtype-node/schema/emptyNodeValue.schema.json' )
const parentNode = require( 'mtype-node/schema/parentNode.schema.json' )

const comment = require( './comment.schema.json' )
const commentValue = require( './commentValue.schema.json' )
const documentFragment = require( './documentFragment.schema.json' )
const documentFragmentValue = require( './documentFragmentValue.schema.json' )
const document = require( './document.schema.json' )
const documentValue = require( './documentValue.schema.json' )
const documentType = require( './documentType.json' )
const documentTypeValue = require( './documentTypeValue.schema.json' )
const element = require( './element.schema.json' )
const elementValue = require( './elementValue.schema.json' )
const text = require( './text.schema.json' )
const textValue = require( './textValue.schema.json' )

const schema = {
  comment, commentValue, documentFragment,
  documentFragmentValue, document, documentValue, documentType,
  documentTypeValue, element, elementValue, text, textValue,

  entityNode, entityNodeValue, emptyNode, emptyNodeValue, parentNode
}

module.exports = schema

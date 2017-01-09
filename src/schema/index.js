'use strict'

const entityNode = require( 'mtype-node/schema/entityNode.schema.json' )
const entityNodeValue = require( 'mtype-node/schema/entityNodeValue.schema.json' )
const emptyNode = require( 'mtype-node/schema/emptyNode.schema.json' )
const parentNode = require( 'mtype-node/schema/parentNode.schema.json' )

const comment = require( '../../schema/comment.schema.json' )
const commentValue = require( '../../schema/commentValue.schema.json' )
const documentFragment = require( '../../schema/documentFragment.schema.json' )
const documentFragmentValue = require( '../../schema/documentFragmentValue.schema.json' )
const document = require( '../../schema/document.schema.json' )
const documentValue = require( '../../schema/documentValue.schema.json' )
const documentType = require( '../../schema/documentType.json' )
const documentTypeValue = require( '../../schema/documentTypeValue.schema.json' )
const element = require( '../../schema/element.schema.json' )
const elementValue = require( '../../schema/elementValue.schema.json' )
const text = require( '../../schema/text.schema.json' )
const textValue = require( '../../schema/textValue.schema.json' )

const schema = {
  comment, commentValue, documentFragment,
  documentFragmentValue, document, documentValue, documentType,
  documentTypeValue, element, elementValue, text, textValue,

  entityNode, entityNodeValue, emptyNode, parentNode
}

module.exports = schema

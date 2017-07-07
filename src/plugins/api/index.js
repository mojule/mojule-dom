'use strict'

const actualize = require( './actualize' )
const assignAttributes = require( './attributes/assignAttributes' )
const disabled = require( './attributes/disabled' )
const getAttributeNode = require( './attributes/getAttributeNode' )
const selected = require( './attributes/selected' )
const categories = require( './categories' )
const morphdom = require( './morphdom' )
const hasAttributeNS = require( './namespace/hasAttributeNS' )
const namespaceURI = require( './namespace/namespaceURI' )

module.exports = [
  actualize, assignAttributes, disabled, getAttributeNode, selected, categories,
  morphdom, hasAttributeNS, namespaceURI
]

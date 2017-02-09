'use strict'

const TreeFactory = require( '1tree-factory' )

const createTree = require( './plugins/createTree' )
const insertBefore = require( './plugins/insertBefore' )
const dom = require( './plugins/dom' )
const parse = require( './plugins/parse' )
const select = require( './plugins/select' )
const stringify = require( './plugins/stringify' )
const types = require( './plugins/types' )
const vdom = require( './plugins/vdom' )

const DomTree = TreeFactory( dom, parse, select, stringify, types, vdom )

// add afterwards because the original createTree doesn't exist until now
DomTree.plugin( createTree )
// add afterwards so that it wraps parentMap and not the other way round
DomTree.plugin( insertBefore )

module.exports = DomTree

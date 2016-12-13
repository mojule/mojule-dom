'use strict'

const Adapter = require( './htmlparser2-adapter' )
const Select = require( '../../select' )

const Selecter = ( fn, root ) => Select( Adapter( fn, root ) )

const querySelector = fn => {
  const select = ( fn, root, node, query ) => {
    return Selecter( fn, root ).select( node, query )
  }

  select.def = {
    argTypes: [ 'fn', 'rootNode', 'node', 'string' ],
    returnType: 'node',
    requires: [ 'value', 'getChildren', 'getParent' ],
    categories: [ 'query', 'select', 'plugins' ]
  }

  const selectAll = ( fn, root, node, query ) =>
    Selecter( fn, root ).selectAll( node, query )

  selectAll.def = {
    argTypes: [ 'fn', 'rootNode', 'node', 'string' ],
    returnType: '[node]',
    requires: [ 'value', 'getChildren', 'getParent' ],
    categories: [ 'query', 'select', 'plugins' ]
  }

  const matches = ( fn, root, node, query ) =>
    Selecter( fn, root ).matches( node, query )

  matches.def = {
    argTypes: [ 'fn', 'rootNode', 'node', 'string' ],
    returnType: 'boolean',
    requires: [ 'value', 'getChildren', 'getParent' ],
    categories: [ 'query', 'select', 'plugins' ]
  }

  const plugin = { select, selectAll, matches }

  return Object.assign( fn, plugin )
}

module.exports = querySelector

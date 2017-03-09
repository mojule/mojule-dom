'use strict'

const Adapter = require( './htmlparser2-adapter' )
const Select = require( '../../select' )

const Selecter = ( fn, root ) => Select( Adapter( fn, root ) )

/*
  note - this differs from many selector engines as it allows you to select
  self, not just descendants!

  this matches how find works in 1tree, but also we have a lot of code that
  depends on this behaviour
*/
const querySelector = fn => {
  const select = ( fn, root, node, query ) => {
    const selecter = Selecter( fn, root )

    if( selecter.matches( node, query ) )
      return node

    return selecter.select( node, query )
  }

  select.def = {
    argTypes: [ 'fn', 'rootNode', 'node', 'string' ],
    returnType: 'node',
    requires: [ 'value', 'getChildren', 'getParent' ],
    categories: [ 'query', 'select', 'plugins' ]
  }

  const selectDescendant = ( fn, root, node, query ) =>
    Selecter( fn, root ).select( node, query )

  selectDescendant.def = {
    argTypes: [ 'fn', 'rootNode', 'node', 'string' ],
    returnType: 'node',
    requires: [ 'value', 'getChildren', 'getParent' ],
    categories: [ 'query', 'select', 'plugins' ]
  }

  const selectAll = ( fn, root, node, query ) => {
    const selecter = Selecter( fn, root )
    const self = []

    if( selecter.matches( node, query ) )
      self.push( node )

    return self.concat( selecter.selectAll( node, query ) )
  }

  selectAll.def = {
    argTypes: [ 'fn', 'rootNode', 'node', 'string' ],
    returnType: '[node]',
    requires: [ 'value', 'getChildren', 'getParent' ],
    categories: [ 'query', 'select', 'plugins' ]
  }

  const selectAllDescendants = ( fn, root, node, query ) =>
    Selecter( fn, root ).selectAll( node, query )

  selectAllDescendants.def = {
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

  const plugin = {
    select, selectAll, selectDescendant, selectAllDescendants, matches
  }

  return Object.assign( fn, plugin )
}

module.exports = querySelector

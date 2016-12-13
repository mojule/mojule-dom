'use strict'

const stringifyNode = require( '../../stringify' )

const stringifier = fn => {
  const stringify = node => stringifyNode( node )

  stringify.def = {
    argTypes: [ 'node' ],
    returnType: 'string',
    requires: [],
    categories: [ 'stringify', 'plugin' ]
  }

  return Object.assign( fn, { stringify } )
}

module.exports = stringifier

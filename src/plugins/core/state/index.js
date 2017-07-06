'use strict'

const is = require( '@mojule/is' )

const state = ({ core, Api }) => {
  const { createState, getState } = core

  core.createState = ( ...args ) => {
    if( is.string( args[ 0 ] ) ){
      const node = Api.parse( args[ 0 ] )
      const state = getState( node )

      return state
    }

    return createState( ...args )
  }
}

module.exports = state

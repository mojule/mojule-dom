'use strict'

const is = require( '@mojule/is' )

const createState = api => {
  const { createState } = api

  return {
    $createState: ( ...args ) => {
      if( is.string( args[ 0 ] ) ){
        const node = api.parse( args[ 0 ] )

        return createState( node.get() )
      }

      return createState( ...args )
    }
  }
}

module.exports = createState

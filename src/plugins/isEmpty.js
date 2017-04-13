'use strict'

const html = require( '@mojule/html' )
const is = require( '@mojule/is' )

const isEmpty = node => {
  const { isEmpty } = node

  return {
    isEmpty: () => {
      const empty = html.isEmpty( node.nodeName() )

      if( is.undefined( empty ) )
        return isEmpty()

      return empty
    }
  }
}

module.exports = isEmpty

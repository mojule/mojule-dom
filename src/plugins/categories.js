'use strict'

const html = require( '@mojule/html' )
const is = require( '@mojule/is' )

const categories = node => {
  return {
    categories: () => {
      const def = html.def( node.nodeName() )

      if( is.object( def ) && is.array( def.categories ) )
        return def.categories

      return []
    }
  }
}

module.exports = categories

'use strict'

const html = require( '@mojule/html' )
const is = require( '@mojule/is' )

const accepts = node => {
  const { accepts } = node

  return {
    accepts: child => {
      // any node should accept a whitespace only text node?
      if( !node.isEmpty() && child.isText() && child.getText().trim() === '' )
        return true

      const from = node.nodeName()
      const to = child.nodeName()

      const isAccepts = html.accepts( from, to )

      if( is.undefined( isAccepts ) )
        return accepts( child )

      return isAccepts
    }
  }
}

module.exports = accepts

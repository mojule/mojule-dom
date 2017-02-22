'use strict'

const htmlparser2 = require( 'htmlparser2' )
const DomHandler = require( './domhandler-adapter' )

const parse = str => {
  const handler = DomHandler()
  new htmlparser2.Parser( handler ).end( str )

  const dom = handler.getDom()

  const { value, children } = dom
  const { nodeType } = value

  const isSingleElement =
    nodeType === 'documentFragment' &&
    children.length === 1

  if( isSingleElement )
    return children[ 0 ]

  return dom
}

module.exports = parse

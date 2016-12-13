'use strict'

const htmlparser2 = require( 'htmlparser2' )
const DomHandler = require( './domhandler-adapter' )

const parse = str => {
  const handler = DomHandler()
  new htmlparser2.Parser( handler ).end( str )

  return handler.getDom()
}

module.exports = parse

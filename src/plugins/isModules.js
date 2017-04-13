'use strict'

const html = require( '@mojule/html' )

const isModules = node => {
  return {
    isMetadata: () => html.isMetadata( node.nodeName() ),
    isInline: () => html.isInline( node.nodeName() ),
    isEmbedded: () => html.isEmbedded( node.nodeName() ),
    isBlock: () => html.isBlock( node.nodeName() ),
    isContainer: () => html.isContainer( node.nodeName() )
  }
}

module.exports = isModules

'use strict'

const html = require( '@mojule/html' )
const is = require( '@mojule/is' )

const categories = ({ api, core }) => {
  core.registerProperty({
    target: api,
    name: 'categories',
    get: () => {
      const def = html.def( api.nodeName )

      if( is.object( def ) && is.array( def.categories ) )
        return def.categories

      return []
    }
  })

  api.isMetadataNode = () => html.isMetadata( api.nodeName )
  api.isInlineNode = () => html.isInline( api.nodeName )
  api.isEmbeddedNode = () => html.isEmbedded( api.nodeName )
  api.isBlockNode = () => html.isBlock( api.nodeName )
  api.isContainerNode = () => html.isContainer( api.nodeName )
}

module.exports = categories

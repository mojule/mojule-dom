'use strict'

const Html = require( 'html-node' )
const utils = require( 'mojule-utils' )

const { escapeHtml } = utils

const info = Html()

const stringify = ( node, depth = 0 ) => {
  let html = ''

  const { nodeType } = node.value

  if( nodeType === 'text' )
    html += escapeHtml( node.value.nodeValue )

  if( nodeType === 'comment' )
    html += `<!--${ node.value.nodeValue }-->`

  if( nodeType === 'element' ){
    const { tagName, attributes } = node.value

    html += `<${ tagName }`

    if( attributes )
      Object.keys( attributes ).forEach( name => {
        const value = attributes[ name ]

        html += ` ${ name }`

        if( value )
          html += `="${ value }"`
      })

    html += info.isEmpty( tagName ) ? ' />' : '>'

    depth++
  }

  if( Array.isArray( node.children ) )
    node.children.forEach( child => html += stringify( child, depth ) )

  if( nodeType === 'element' && !info.isEmpty( node.value.tagName ) ){
    html += `</${ node.value.tagName }>`
  }

  return html
}

module.exports = stringify

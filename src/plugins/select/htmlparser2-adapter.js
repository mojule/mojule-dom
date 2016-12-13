'use strict'

const baseAdapter = require( 'css-select-base-adapter' )

const Adapter = ( fn, root ) => {
  const isTag = node => {
    const value = fn.value( node )

    return value && value.nodeType === 'element'
  }

  const getAttributeValue = ( node, name ) => {
    const value = fn.value( node )

    if( value && value.attributes )
      return value.attributes[ name ]
  }

  const getChildren = node => fn.getChildren( node )

  const getName = node => {
    const value = fn.value( node )

    if( value ) return value.tagName
  }

  const getParent = node => fn.getParent( fn, root, node )

  const getText = node => {
    if( Array.isArray( node ) ) return node.map( getText ).join( '' )

    if( isTag( node ) ) return getText( getChildren( node ) )

    const value = fn.value( node )

    if( value && value.nodeType === 'text' ) return value.nodeValue

    return ''
  }

  const adapter = {
    isTag, getAttributeValue, getChildren, getName, getParent, getText
  }

  return baseAdapter( adapter )
}

module.exports = Adapter

'use strict'

const Html = require( 'html-node' )

const html = Html()

const emptyNodeTypes = [ 'text', 'comment', 'documentType' ]

const nodeNameMap = {
  element: ( fn, node ) => fn.tagName( node ),
  documentType: ( fn, node ) => {
    const value = fn.value( node )

    return value.name
  }
}

const nodePlugins = fn => {
  const nodeType = ( fn, node ) => {
    const value = fn.value( node )

    return value.nodeType
  }

  nodeType.def = {
    argTypes: [ 'fn', 'node' ],
    returnType: 'string',
    requires: [ 'value' ],
    categories: [ 'node', 'plugin' ]
  }

  const nodeName = ( fn, node ) => {
    const nodeType = fn.nodeType( fn, node )

    if( nodeType in nodeNameMap )
      return nodeNameMap[ nodeType ]( fn, node )

    return `#${ nodeType }`
  }

  nodeName.def = {
    argTypes: [ 'fn', 'node' ],
    returnType: 'string',
    requires: [ 'nodeType' ],
    categories: [ 'node', 'plugin' ]
  }

  const isEmpty = ( fn, node ) => {
    const nodeType = fn.nodeType( fn, node )

    if( emptyNodeTypes.includes( nodeType ) ) return true

    if( nodeType === 'element' ){
      const tagName = fn.tagName( node )

      return html.isEmpty( tagName )
    }

    // assumes remaining node types should be able to have children, is this true?
    return false
  }

  isEmpty.def = {
    argType: [ 'fn', 'node' ],
    returnType: 'boolean',
    require: [ 'nodeType', 'tagName' ],
    categories: [ 'node', 'plugin' ]
  }

  const accepts = ( fn, node, childNode ) => {
    const isEmpty = fn.isEmpty( fn, node )

    if( isEmpty ) return false

    const nodeType = fn.nodeType( fn, node )
    const childNodeType = fn.nodeType( fn, childNode )

    if( childNodeType === 'documentType' ) return nodeType === 'document'

    if( nodeType === 'element' ){
      if( childNodeType === 'text' || childNodeType === 'comment' ) return true

      const nodeName = fn.nodeName( fn, node )
      const childName = fn.nodeName( fn, childNode )

      return html.accepts( nodeName, childName )
    }

    // assumes non-elements that can have child nodes can have any child node,
    // is this true?
    return true
  }

  accepts.def = {
    argType: [ 'fn', 'node', 'node' ],
    returnType: 'boolean',
    require: [ 'isEmpty', 'nodeType', 'nodeName' ],
    categories: [ 'node', 'plugin' ]
  }

  return Object.assign( fn, { nodeType, nodeName, isEmpty, accepts } )
}

module.exports = nodePlugins

'use strict'

const is = require( '@mojule/is' )

const nodeTypes = {
  element: 1,
  text: 3,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11
}

const Vnode = node => {
  if( is.null( node ) || is.undefined( node ) )
    return node

  const vnode = {
    get firstChild(){
      return Vnode( node.firstChild() )
    },

    get nextSibling(){
      return Vnode( node.nextSibling() )
    },

    get nodeType(){
      return nodeTypes[ node.nodeType() ]
    },

    get nodeName(){
      return node.nodeName()
    },

    // should be something for svg or math etc.!
    get namespaceURI(){
      return 'http://www.w3.org/1999/xhtml'
    },

    get nodeValue(){
      return node.nodeValue()
    },

    get attributes(){
      const attributes = node.attributes()
      const names = Object.keys( attributes )

      return names.map( name => ({
        name,
        value: attributes[ name ]
      }))
    },

    get value(){
      return node.getAttr( 'value' )
    },

    get selected(){
      return !!node.getAttr( 'selected' )
    },

    get disabled(){
      return !!node.getAttr( 'disabled' )
    },

    // should be something for svg or math etc.!
    // hasAttributeNS: ( namespaceURI, name ) => {
    hasAttributeNS: namespaceURI =>
      is.null( namespaceURI ) || namespaceURI === vnode.namespaceURI,

    getAttributeNode: ( namespaceURI, name ) => node.hasAttr( name ),

    assignAttributes: targetNode => {
      const attributes = node.attributes()

      Object.keys( attributes ).forEach( name =>
        targetNode.setAttribute( name, attributes[ name ] )
      )
    },

    treeNode: () => node,

    actualize: document => actualize[ vnode.nodeType ]( document, vnode )
  }

  return vnode
}

const addChildren = ( document, el, vnode ) => {
  let child = vnode.firstChild

  while( child ){
    el.appendChild( child.actualize( document ) )
    child = child.nextSibling
  }
}

const actualize = {
  1: ( document, vnode ) => {
    const el = document.createElement( vnode.nodeName )

    vnode.assignAttributes( el )

    addChildren( document, el, vnode )

    return el
  },
  3: ( document, vnode ) => document.createTextNode( vnode.nodeValue ),
  8: ( document, vnode ) => document.createComment( vnode.nodeValue ),
  9: ( document, vnode ) => {
    const doc = document.implementation.createDocument()

    while( doc.firstChild )
      doc.removeChild( doc.firstChild )

    addChildren( document, doc, vnode )

    return doc
  },
  10: ( document, vnode ) => {
    const treeNode = vnode.treeNode()
    const { name, publicId, systemId } = treeNode.getValue()

    const doctype = document.implementation.createDocumentType( name, publicId, systemId )

    return doctype
  },
  11: ( document, vnode ) => {
    const el = document.createDocumentFragment()

    addChildren( document, el, vnode )

    return el
  }
}

module.exports = Vnode

'use strict'

const Vnode = node => {
  if( node === null || node === undefined ){
    return node
  }

  const vnode = {
    get firstChild(){
      return Vnode( node.firstChild() )
    },

    get nextSibling(){
      return Vnode( node.nextSibling() )
    },

    get nodeType(){
      return node.nodeType()
    },

    get nodeName(){
      return node.nodeName()
    },

    // should be something for svg or math etc.!
    get namespaceURI(){
      return 'http://www.w3.org/1999/xhtml'
    },

    get nodeValue(){
      const value = node.value()

      return value.nodeValue || ''
    },

    get value(){
      const value = node.value()

      return value.value
    },

    get selected(){
      const value = node.value()

      return !!value.selected
    },

    get disabled(){
      const value = node.value()

      return !!value.disabled
    },

    // should be something for svg or math etc.!
    // hasAttributeNS: ( namespaceURI, name ) => {
    hasAttributeNS: namespaceURI =>
      namespaceURI === vnode.namespaceURI,

    assignAttributes: targetNode => {
      const attributes = node.attributes()

      Object.keys( attributes ).forEach( name =>
        targetNode.setAttribute( name, attributes[ name ] )
      )
    },

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
  text: ( document, vnode ) => document.createTextNode( vnode.nodeValue ),
  comment: ( document, vnode ) => document.createComment( vnode.nodeValue ),
  element: ( document, vnode ) => {
    const el = document.createElement( vnode.nodeName )

    vnode.assignAttributes( el )

    addChildren( document, el, vnode )

    return el
  },
  documentFragment: ( document, vnode ) => {
    const el = document.createDocumentFragment()

    addChildren( document, el, vnode )

    return el
  }
}

module.exports = Vnode

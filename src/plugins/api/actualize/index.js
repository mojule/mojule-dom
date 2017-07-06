'use strict'

const actualize = ({ api, state, core }) => {
  api.actualize = document => {
    const { getApi } = core
    const node = getApi( state )

    return actualizeMapper[ api.nodeType ]( document, node )
  }
}

const addChildren = ( document, el, node ) => {
  let child = node.firstChild

  while( child ){
    el.appendChild( child.actualize( document ) )
    child = child.nextSibling
  }
}

const actualizeMapper = {
  1: ( document, node ) => {
    const el = document.createElement( node.tagName )

    node.assignAttributes( el )

    addChildren( document, el, node )

    return el
  },
  3: ( document, node ) => document.createTextNode( node.nodeValue ),
  8: ( document, node ) => document.createComment( node.nodeValue ),
  9: ( document, node ) => {
    const doc = document.implementation.createDocument(
      'http://www.w3.org/1999/xhtml', 'html'
    )

    while( doc.firstChild )
      doc.removeChild( doc.firstChild )

    addChildren( document, doc, node )

    return doc
  },
  10: ( document, node ) => {
    const { name, publicId, systemId } = node.value

    const doctype = document.implementation.createDocumentType( name, publicId, systemId )

    return doctype
  },
  11: ( document, node ) => {
    const el = document.createDocumentFragment()

    addChildren( document, el, node )

    return el
  }
}

module.exports = actualize

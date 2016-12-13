'use strict'

// TODO add handling for text elements, eg combine them

const insertBeforeWrapper = fn => {
  const originalInsertBefore = fn.insertBefore

  const insertBefore = ( fn, root, parentNode, childNode, referenceNode ) => {
    // handle document fragments
    if( fn.isDocumentFragment( childNode ) ){
      const children = fn.getChildren( childNode )

      children.forEach( child =>
        originalInsertBefore( fn, root, parentNode, child, referenceNode )
      )

      return childNode
    }

    return originalInsertBefore( fn, root, parentNode, childNode, referenceNode )
  }

  insertBefore.def = originalInsertBefore.def

  return Object.assign( fn, { insertBefore } )
}

module.exports = insertBeforeWrapper

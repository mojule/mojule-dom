'use strict'

const insertBeforeWrapper = fn => {
  const originalInsertBefore = fn.insertBefore

  const insertBefore = ( fn, root, parentNode, childNode, referenceNode ) => {
    // TODO
    // handle document fragments
    // handle combining text elements
    return originalInsertBefore( fn, root, parentNode, childNode, referenceNode )
  }

  insertBefore.def = originalInsertBefore.def

  return Object.assign( fn, { insertBefore } )
}

module.exports = insertBeforeWrapper

'use strict'

const Vnode = require( '../vnode' )

const vnode = node => {
  return {
    vnode: () => Vnode( node )
  }
}

module.exports = vnode

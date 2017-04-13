'use strict'

const morphdom = require( 'morphdom' )

const morphdomModule = node => {
  return {
    morphdom: ( targetEl, options ) => {
      const vnode = node.vnode()

      return morphdom( targetEl, vnode, options )
    }
  }
}

module.exports = morphdomModule

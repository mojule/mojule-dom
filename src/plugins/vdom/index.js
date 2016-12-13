'use strict'

const morphdom = require( 'morphdom' )
const Vnode = require( '../../vdom' )

const morphdomPlugin = fn => {
  const patchDom = ( node, targetEl, options ) => {
    //Vnode expects wrapped node!
    const wrapped = fn.createTree( node )
    const vdom = Vnode( wrapped )

    morphdom( targetEl, vdom, options )
  }

  patchDom.def = {
    argTypes: [ 'node', 'object', 'object' ],
    requires: [ 'createTree' ],
    categories: [ 'patch', 'plugin' ]
  }

  return Object.assign( fn, { morphdom: patchDom } )
}

module.exports = morphdomPlugin
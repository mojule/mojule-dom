'use strict'

const is = require( '@mojule/is' )
const TreeFactory = require( '@mojule/tree' ).Factory
const domPlugins = require( '@mojule/dom-plugins' )
const defaultPlugins = require( './plugins' )

const Factory = ( ...plugins ) => {
  let options = {}

  if( plugins.length > 0 && is.object( plugins[ plugins.length - 1 ] ) )
    options = plugins.pop()

  if( plugins.length === 1 && is.array( plugins[ 0 ] ) )
    plugins = plugins[ 0 ]

  plugins = domPlugins.concat( defaultPlugins ).concat( plugins )

  return TreeFactory( plugins, options )
}

const VDom = Factory()

Object.assign( VDom, { Factory } )

module.exports = VDom

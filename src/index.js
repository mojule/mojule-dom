'use strict'

const is = require( '@mojule/is' )
const TreeFactory = require( '@mojule/tree' ).Factory
const FactoryFactory = require( '@mojule/tree' ).FactoryFactory
const domPlugins = require( '@mojule/dom-plugins' )
const defaultPlugins = require( './plugins' )
const plugins = domPlugins.concat( defaultPlugins )
const Factory = FactoryFactory( TreeFactory, plugins )
const VDom = Factory()

Object.assign( VDom, { Factory } )

module.exports = VDom

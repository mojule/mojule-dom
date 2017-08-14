'use strict'

const is = require( '@mojule/is' )
const { Factory } = require( '@mojule/tree' )
const domPlugins = require( '@mojule/dom-plugins' )
const defaultPlugins = require( './plugins' )

const VDOM = Factory( domPlugins, defaultPlugins )

module.exports = VDOM

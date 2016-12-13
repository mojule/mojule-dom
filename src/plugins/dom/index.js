'use strict'

const element = require( './element' )
const create = require( './create' )
const node = require( './node' )

const dom = fn => {
  element( fn )
  create( fn )
  node( fn )
}

module.exports = dom

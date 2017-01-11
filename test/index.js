'use strict'

const assert = require( 'assert' )
const Dom = require( '../index' )

describe( 'mojule-dom', () => {
  it( 'does something, anything', () => {
    const dom = Dom( '<p>Hello, World!</p>' )

    assert( dom )
  })
})

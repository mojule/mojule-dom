'use strict'

const assert = require( 'assert' )
const VDom = require( '../src' )

describe( 'mojule-dom', () => {
  it( 'does something, anything', () => {
    const dom = VDom( '<p>Hello, World!</p>' )

    assert( dom )
  })
})

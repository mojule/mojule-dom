'use strict'

const assert = require( 'assert' )
const Dom = require( '../index' )

describe( 'mojule-dom', () => {
  it( 'does something, anything', () => {
    const dom = Dom( '<p>Hello, World!</p>' )

    assert( dom )
  })

  it( 'stringifies', () => {
    const dom = Dom( '<p>Hello, World!</p>' )
    const html = dom.stringify()

    assert.equal( typeof html, 'string' )
  })

  it( 'clones', () => {
    const dom = Dom( '<p>Hello, World!</p>' )
    const dom2 = dom.clone()
    const html = dom2.stringify()

    assert.equal( typeof html, 'string' )
  })

  it( 'selects', () => {
    const dom = Dom( '<p><strong>Hello</strong>, World!</p>' )
    const strong = dom.select( 'strong' )

    const html = strong.stringify()

    assert.equal( typeof html, 'string' )
  })

  it( 'selects all', () => {
    const dom = Dom( '<p><strong>Hello</strong>, <strong>World</strong>!</p>' )
    const strongs = dom.selectAll( 'strong' )

    assert.equal( strongs.length, 2 )
  })
})
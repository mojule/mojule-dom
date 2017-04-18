'use strict'

const Vdom = require( '../../dist' )

const {
  div, p, strong, input, comment, documentFragment
} = Vdom.h

const vMain = div(
  { id: 'main', class: 'container' },

  documentFragment(
    comment( 'Hello' )
  ),

  p( 'The quick brown fox jumps over the ', strong( 'lazy dog' ) ),

  input( { type:'text', name:'firstName', placeholder:'Alex' } )
)

const main = document.querySelector( '#main' )

vMain.morphdom( main )

console.log( main.outerHTML )
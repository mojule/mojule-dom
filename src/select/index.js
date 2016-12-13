'use strict'

const CSSselect = require( 'css-select' )

const Select = adapter => {
  const options = { adapter }

  const select = ( node, selector ) =>
    CSSselect.selectOne( selector, node, options )

  const selectAll = ( node, selector ) => CSSselect( selector, node, options )

  const matches = ( node, selector ) => CSSselect.is( node, selector, options )

  const api = {
    select, selectAll, matches
  }

  return api
}

module.exports = Select

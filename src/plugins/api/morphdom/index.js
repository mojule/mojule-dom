'use strict'

const morphdom = require( 'morphdom' )

const morph = ({ api, state, core }) => {
  api.morphdom = ( targetEl, options ) => {
    const { getApi } = core
    const node = getApi( state )

    return morphdom( targetEl, node, options )
  }
}

module.exports = morph

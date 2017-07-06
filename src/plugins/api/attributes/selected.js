'use strict'

const selected = ({ api, core }) => {
  if( !api.isElementNode() ) return

  core.addAttributeProperty( api, 'selected' )
}

module.exports = selected
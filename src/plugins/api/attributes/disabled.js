'use strict'

const disabled = ({ api, core }) => {
  if( !api.isElementNode() ) return

  core.addAttributeProperty( api, 'disabled' )
}

module.exports = disabled
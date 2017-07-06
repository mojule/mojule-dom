'use strict'

const value = ({ api, core }) => {
  if( !api.isElementNode() ) return

  core.addAttributeProperty( api, 'value' )
}

module.exports = value
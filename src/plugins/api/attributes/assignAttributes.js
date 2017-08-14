'use strict'

const assignAttributes = ({ api }) => {
  api.assignAttributes = node => {
    for( let { name, value } of api.attributes )
      node.setAttribute( name, value )
  }
}

module.exports = assignAttributes

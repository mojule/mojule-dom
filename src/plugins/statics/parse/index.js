'use strict'

const defaultOptions = {
  xmlMode: false,
  removeWhitespace: false
}

const parse = ({ statics }) => {
  const { parse } = statics

  statics.parse = ( str, options ) => {
    options = Object.assign( {}, defaultOptions, options )

    return parse( str, options )
  }
}

module.exports = parse

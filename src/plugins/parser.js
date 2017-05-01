'use strict'

const defaultOptions = {
  xmlMode: false,
  removeWhitespace: false
}

const parser = api => {
  const { parse } = api

  return {
    $parse: ( str, options = {} ) => {
      options = Object.assign( {}, defaultOptions, options )

      return parse( str, options )
    }
  }
}

module.exports = parser
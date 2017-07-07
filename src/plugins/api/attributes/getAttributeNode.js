'use strict'

/*
  bad bad bad! We are basically polyfilling in a non-standard old IE
  implementation to work around morphdom trying to work around IE7 support

  this happens because morphdom assumes if it can't find a global document
  object with certain properties then it must be IE7
*/

const getAttributeNode = ({ api }) => {
  api.getAttributeNode = ( nameSpaceURI, name ) =>
    api.getAttribute( name ) || null
}

module.exports = getAttributeNode

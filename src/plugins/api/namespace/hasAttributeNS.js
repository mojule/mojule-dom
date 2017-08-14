'use strict'

const is = require( '@mojule/is' )

const hasAttributeNS = ({ api }) => {
  api.hasAttributeNS = namespaceURI =>
    is.null( namespaceURI ) || namespaceURI === api.namespaceURI
}

module.exports = hasAttributeNS

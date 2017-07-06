'use strict'

const namespaceURI = ({ api, core }) => {
  core.registerProperty({
    target: api,
    name: 'namespaceURI',
    get: () => 'http://www.w3.org/1999/xhtml'
  })
}

module.exports = namespaceURI
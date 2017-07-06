'use strict'

const registerAttributes = ({ core }) => {
  core.registerAttribute({
    name: 'value'
  })

  core.registerAttribute({
    name: 'selected',
    parse: str => str === 'selected',
    stringify: value => value ? 'selected' : ''
  })

  core.registerAttribute({
    name: 'disabled',
    parse: str => str === 'disabled',
    stringify: value => value ? 'disabled' : ''
  })
}

module.exports = registerAttributes

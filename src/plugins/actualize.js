'use strict'

const actualize = node => {
  return {
    actualize: document => {
      return node.vnode().actualize( document )
    }
  }
}

module.exports = actualize

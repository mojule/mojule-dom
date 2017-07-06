'use strict'

const html = require( '@mojule/html' )

const registerElements = ({ core }) => {
  const tagNames = html.tagNames()

  tagNames.forEach( tagName => {
    core.registerElement({
      tagName,
      isEmpty: html.isEmpty( tagName ),
      accepts: ( parent, child ) => {
        if( tagNames.includes( child.nodeName ) )
          return html.accepts( tagName, child.nodeName )

        return !parent.isEmpty()
      }
    })
  })
}

module.exports = registerElements

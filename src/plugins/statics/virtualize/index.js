'use strict'

const virtualize = ({ statics, Api }) => {
  const mappers = {
    1: el => {
      const { tagName, attributes } = el

      const attr = Array.from( attributes ).reduce( ( obj, pair ) => {
        obj[ pair.name ] = pair.value

        return obj
      }, {} )

      return Api.createElement( tagName.toLowerCase(), attr )
    },
    3: el => {
      return Api.createText( el.nodeValue )
    },
    8: el => {
      return Api.createComment( el.nodeValue )
    },
    9: () => Api.createDocument(),
    10: el => Api.createDocumentType( el.name, el.publicId, el.systemId ),
    11: el => Api.createDocumentFragment()
  }

  const addChildren = ( domNode, treeNode ) => {
    Array.from( domNode.childNodes ).forEach( domChild => {
      treeNode.appendChild( Api.virtualize( domChild ) )
    })
  }

  statics.virtualize = el => {
    const node = mappers[ el.nodeType ]( el )

    if( node.firstChild )
      addChildren( el, node )

    return el
  }
}

module.exports = virtualize

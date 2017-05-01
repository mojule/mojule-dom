'use strict'

const nodeTypes = {
  element: 1,
  text: 3,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  1: 'element',
  3: 'text',
  8: 'comment',
  9: 'document',
  10: 'documentType',
  11: 'documentFragment'
}

const hasChildren = {
  // element
  1: true,
  // document
  9: true,
  // documentFragment
  11: true
}

const virtualize = api => {
  const mappers = {
    1: node => {
      const { tagName, attributes } = node

      const attr = Array.from( attributes ).reduce( ( obj, pair ) => {
        obj[ pair.name ] = pair.value

        return obj
      }, {} )

      return api.createElement( tagName.toLowerCase(), attr )
    },
    3: node => {
      return api.createText( node.nodeValue )
    },
    8: node => {
      return api.createComment( node.nodeValue )
    },
    9: () => api.createDocument(),
    10: node => api.createDocumentType( node.name, node.publicId, node.systemId ),
    11: node => api.createDocumentFragment()
  }

  const addChildren = ( domNode, treeNode ) => {
    Array.from( domNode.childNodes ).forEach( domChild => {
      treeNode.append( api.virtualize( domChild ) )
    })
  }

  return {
    $virtualize: domNode => {
      const type = domNode.nodeType
      const node = mappers[ type ]( domNode )

      if( hasChildren[ type ] )
        addChildren( domNode, node )

      return node
    }
  }
}

module.exports = virtualize

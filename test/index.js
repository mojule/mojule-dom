'use strict'

const assert = require( 'assert' )
const is = require( '@mojule/is' )
const VDOM = require( '../src' )

const htmlStr = '<!doctype html><html><head><meta charset="utf-8" /><title>Hello World!</title></head><body><!--Whose line is it anyway?--><div id="main"><p>The quick brown fox jumps over the <strong>lazy dog</strong></p><input type="text" name="firstName" placeholder="Alex" /></div><!--Fragment not (usually) necessary but make sure it works--><!--Text not necessary but etc.--><p>lol wut</p><!--But what if it is not in the spec?--><customtag class="kk"><p>OK that works for me</p></customtag></body></html>'

describe( 'VDOM', () => {
  describe( 'Plugins', () => {
    it( 'accepts', () => {
      const div = VDOM.createElement( 'div' )
      const p = VDOM.createElement( 'p' )
      const custom = VDOM.createElement( 'custom' )

      assert( div.accepts( p ) )
      assert( custom.accepts( p ) )
    })

    it( 'accepts', () => {
      const div = VDOM( '<div></div>' )
      const text = VDOM( 'Hello' )

      assert( div.accepts( text ) )
      assert( !text.accepts( div ) )

      const node = VDOM( { nodeType: 1 } )

      assert( node.accepts( text ) )
    })

    it( 'accepts whitespace in any node', () => {
      const text = VDOM.createText( '\n' )
      const doc = VDOM.createDocument()
      const html = VDOM.createElement( 'html' )
      const body = VDOM.createElement( 'body' )
      const table = VDOM.createElement( 'table' )

      assert( doc.accepts( text ) )
      assert( html.accepts( text ) )
      assert( body.accepts( text ) )
      assert( table.accepts( text ) )
    })

    it( 'categories', () => {
      const div = VDOM( '<div></div>' )
      const { categories } = div

      assert( is.array( categories ) )
      assert( categories.includes( 'flow content' ) )

      const node = VDOM( { nodeType: 0 } )

      assert.deepEqual( node.categories, [] )
    })

    it( 'isEmpty', () => {
      const div = VDOM( '<div></div>' )
      const img = VDOM( '<img src="image.jpg" />' )
      const node = VDOM( { nodeType: 1 } )

      assert( !div.isEmpty() )
      assert( img.isEmpty() )
      assert( !node.isEmpty() )
    })

    it( 'isModules', () => {
      const div = VDOM( '<div></div>' )
      const meta = VDOM( '<meta charset="utf-8" />' )
      const text = VDOM( 'Hello' )
      const img = VDOM( '<img src="image.jpg" />' )

      assert( div.isBlockNode() )
      assert( div.isContainerNode() )
      assert( meta.isMetadataNode() )
      assert( text.isInlineNode() )
      assert( img.isEmbeddedNode() )
    })

    it( 'h', () => {
      const {
        document, documentType, text, comment, documentFragment, element,
        html, head, body, meta, title, div, p, strong, input
      } = VDOM.h

      const expected = htmlStr

      const dom =
        document(
          documentType('html'),
          html(
            head(
              meta({charset:'utf-8'}),
              title('Hello World!')
            ),
            body(
              comment('Whose line is it anyway?'),
              div({id:'main'},
                p('The quick brown fox jumps over the ',strong('lazy dog')),
                input({type:'text',name:'firstName',placeholder:'Alex'})
              ),
              comment('Fragment not (usually) necessary but make sure it works'),
              documentFragment(
                comment('Text not necessary but etc.'),
                p(text('lol '),'wut')
              ),
              comment('But what if it is not in the spec?'),
              element('customtag',{class:'kk'},
                p('OK that works for me')
              )
            )
          )
        )

      assert.equal( dom.toString(), expected )
    })
  })

  describe( 'morphdom', () => {
    const document = require( 'jsdom' ).jsdom( '<html><body><div id="main"></div></body></html>' )
    const main = document.querySelector( '#main' )

    const {
      div, p, strong, input, comment, documentFragment
    } = VDOM.h

    it( 'morphs to dom node', () => {
      const vMain = div({id:'main'},
        documentFragment(
          comment('Hello')
        ),
        p('The quick brown fox jumps over the ',strong('lazy dog')),
        input({type:'text',name:'firstName',placeholder:'Alex'})
      )

      vMain.morphdom( main )

      assert.equal( main.outerHTML, '<div id="main"><!--Hello--><p>The quick brown fox jumps over the <strong>lazy dog</strong></p><input type="text" name="firstName" placeholder="Alex"></div>' )
    })
  })

  describe( 'actualize/virtualize', () => {
    it( 'virtualizes', () => {
      const document = require( 'jsdom' ).jsdom( htmlStr )
      const tree = VDOM.virtualize( document )
      const str = tree.stringify()

      assert.equal( htmlStr, str )
    })

    it( 'actualizes', () => {
      // round trip it
      const document = require( 'jsdom' ).jsdom( '<body></body>' )
      const doc = VDOM( htmlStr )
      const dom = doc.actualize( document )
      const tree = VDOM.virtualize( dom )
      const str = tree.stringify()

      assert.equal( htmlStr, str )

      //don't forget document, which the parse won't create
      const doc2 = VDOM.createDocument()
      const docType = VDOM.createDocumentType( 'html' )
      const html = doc.querySelector( 'html' )

      doc2.append( docType )
      doc2.append( html )

      const dom2 = doc2.actualize( document )
      const tree2 = VDOM.virtualize( dom2 )
      const str2 = tree2.stringify()

      assert.equal( htmlStr, str2 )
    })
  })
})

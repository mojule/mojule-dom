'use strict'

const assert = require( 'assert' )
const is = require( '@mojule/is' )
const { Factory } = require( '../src' )
const Vdom = Factory( { exposeState: true } )

const htmlStr = '<!doctype html><html><head><meta charset="utf-8" /><title>Hello World!</title></head><body><!--Whose line is it anyway?--><div id="main"><p>The quick brown fox jumps over the <strong>lazy dog</strong></p><input type="text" name="firstName" placeholder="Alex" /></div><!--Fragment not (usually) necessary but make sure it works--><!--Text not necessary but etc.--><p>lol wut</p><!--But what if it is not in the spec?--><customtag class="kk"><p>OK that works for me</p></customtag></body></html>'

describe( 'mojule-dom', () => {
  describe( 'Factory', () => {
    it( 'takes plugins', () => {
      const plugin = node => {
        return {
          isDiv: () => node.tagName() === 'div'
        }
      }

      const Tree = Factory( plugin )

      const div = Tree( '<div></div>' )

      assert( div.isDiv() )
    })

    it( 'plugin array', () => {
      const plugin = node => {
        return {
          isDiv: () => node.tagName() === 'div'
        }
      }

      const Tree = Factory( [ plugin ] )

      const div = Tree( '<div></div>' )

      assert( div.isDiv() )
    })

    it( 'options', () => {
      const plugin = node => {
        return {
          isDiv: () => node.tagName() === 'div'
        }
      }

      const Tree = Factory( plugin, {} )

      const div = Tree( '<div></div>' )

      assert( div.isDiv() )
    })
  })

  describe( 'Plugins', () => {
    it( 'accepts', () => {
      const div = Vdom.createElement( 'div' )
      const p = Vdom.createElement( 'p' )
      const custom = Vdom.createElement( 'custom' )

      assert( div.accepts( p ) )
      assert( custom.accepts( p ) )
    })

    it( 'accepts', () => {
      const div = Vdom( '<div></div>' )
      const text = Vdom( 'Hello' )

      assert( div.accepts( text ) )
      assert( !text.accepts( div ) )

      const node = Vdom( { nodeType: 'cool' } )

      assert( node.accepts( text ) )
    })

    it( 'accepts whitespace in any node', () => {
      const text = Vdom.createText( '\n' )
      const doc = Vdom.createDocument()
      const html = Vdom.createElement( 'html' )
      const body = Vdom.createElement( 'body' )
      const table = Vdom.createElement( 'table' )

      assert( doc.accepts( text ) )
      assert( html.accepts( text ) )
      assert( body.accepts( text ) )
      assert( table.accepts( text ) )
    })

    it( 'categories', () => {
      const div = Vdom( '<div></div>' )
      const categories = div.categories()

      assert( is.array( categories ) )
      assert( categories.includes( 'flow content' ) )

      const node = Vdom( { nodeType: 'cool' } )

      assert.deepEqual( node.categories(), [] )
    })

    it( 'isEmpty', () => {
      const div = Vdom( '<div></div>' )
      const img = Vdom( '<img src="image.jpg" />' )
      const node = Vdom( { nodeType: 'cool' } )

      assert( !div.isEmpty() )
      assert( img.isEmpty() )
      assert( !node.isEmpty() )
    })

    it( 'isModules', () => {
      const div = Vdom( '<div></div>' )
      const meta = Vdom( '<meta charset="utf-8" />' )
      const text = Vdom( 'Hello' )
      const img = Vdom( '<img src="image.jpg" />' )

      assert( div.isBlock() )
      assert( div.isContainer() )
      assert( meta.isMetadata() )
      assert( text.isInline() )
      assert( img.isEmbedded() )
    })

    it( 'h', () => {
      const {
        document, documentType, text, comment, documentFragment, element,
        html, head, body, meta, title, div, p, strong, input
      } = Vdom.h

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

      assert.equal( dom.stringify(), expected )
    })
  })

  describe( 'vnode', () => {
    it( 'creates', () => {
      const { div } = Vdom.h
      const el = div()
      const vnode = el.vnode()

      assert( vnode )
    })

    it( 'firstChild', () => {
      const { div, p } = Vdom.h
      const el = div()
      const vnode = el.vnode()

      assert.equal( undefined, vnode.firstChild )

      el.append( p() )

      assert( vnode.firstChild )
    })

    it( 'nextSibiling', () => {
      const { div, p } = Vdom.h
      const el = div()
      const child1 = p()
      const child2 = p()

      el.append( child1 )

      const vnode = el.vnode()
      const vchild1 = child1.vnode()

      assert.equal( undefined, vchild1.nextSibling )

      el.append( child2 )

      assert( vchild1.nextSibling )
    })

    it( 'nodeType', () => {
      const { div } = Vdom.h
      const el = div()
      const vnode = el.vnode()

      assert.equal( vnode.nodeType, 1 )
    })

    it( 'nodeName', () => {
      const { div } = Vdom.h
      const el = div()
      const vnode = el.vnode()

      assert.equal( vnode.nodeName, 'div' )
    })

    it( 'namespaceURI', () => {
      const { div } = Vdom.h
      const el = div()
      const vnode = el.vnode()

      assert.equal( vnode.namespaceURI, 'http://www.w3.org/1999/xhtml' )
    })

    it( 'nodeValue', () => {
      const t = Vdom.createText( 'Hello' )
      const vnode = t.vnode()

      assert.equal( vnode.nodeValue, 'Hello' )
    })

    it( 'value', () => {
      const node = Vdom.createElement( 'input', { value: 'hello' } )
      const vnode = node.vnode()

      assert.equal( vnode.value, 'hello' )
    })

    it( 'selected', () => {
      const node = Vdom.createElement( 'input', { selected: true } )
      const vnode = node.vnode()

      assert.equal( vnode.selected, true )
    })

    it( 'disabled', () => {
      const node = Vdom.createElement( 'input', { disabled: true } )
      const vnode = node.vnode()

      assert.equal( vnode.disabled, true )
    })

    it( 'hasAttributeNS', () => {
      const node = Vdom.createElement( 'input' )
      const vnode = node.vnode()

      assert.equal( vnode.hasAttributeNS( 'http://www.w3.org/1999/xhtml' ), true )
    })
  })

  describe( 'morphdom', () => {
    const document = require( 'jsdom' ).jsdom( '<html><body><div id="main"></div></body></html>' )
    const main = document.querySelector( '#main' )

    const {
      div, p, strong, input, comment, documentFragment
    } = Vdom.h

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
      const tree = Vdom.virtualize( document )
      const str = tree.stringify()

      assert.equal( htmlStr, str )
    })

    it( 'actualizes', () => {
      // round trip it
      const document = require( 'jsdom' ).jsdom( '<body></body>' )
      const doc = Vdom( htmlStr )
      const dom = doc.actualize( document )
      const tree = Vdom.virtualize( dom )
      const str = tree.stringify()

      assert.equal( htmlStr, str )

      //don't forget document, which the parse won't create
      const doc2 = Vdom.createDocument()
      const docType = Vdom.createDocumentType( 'html' )
      const html = doc.querySelector( 'html' )

      doc2.append( docType )
      doc2.append( html )

      const dom2 = doc2.actualize( document )
      const tree2 = Vdom.virtualize( dom2 )
      const str2 = tree2.stringify()

      assert.equal( htmlStr, str2 )
    })
  })
})

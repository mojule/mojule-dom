'use strict'

const assert = require( 'assert' )
const is = require( '@mojule/is' )
const VDom = require( '../src' )

describe( 'mojule-dom', () => {
  describe( 'Factory', () => {
    it( 'takes plugins', () => {
      const plugin = node => {
        return {
          isDiv: () => node.tagName() === 'div'
        }
      }

      const Tree = VDom.Factory( plugin )

      const div = Tree( '<div></div>' )
      
      assert( div.isDiv() )
    })

    it( 'plugin array', () => {
      const plugin = node => {
        return {
          isDiv: () => node.tagName() === 'div'
        }
      }

      const Tree = VDom.Factory( [ plugin ] )

      const div = Tree( '<div></div>' )
      
      assert( div.isDiv() )
    }) 

    it( 'options', () => {
      const plugin = node => {
        return {
          isDiv: () => node.tagName() === 'div'
        }
      }

      const Tree = VDom.Factory( plugin, {} )

      const div = Tree( '<div></div>' )
      
      assert( div.isDiv() )      
    })  
  })

  describe( 'Plugins', () => {
    it( 'accepts', () => {
      const div = VDom.createElement( 'div' )
      const p = VDom.createElement( 'p' )
      const custom = VDom.createElement( 'custom' )

      assert( div.accepts( p ) )
      assert( custom.accepts( p ) )
    })

    it( 'accepts', () => {
      const div = VDom( '<div></div>' )
      const text = VDom( 'Hello' )

      assert( div.accepts( text ) )
      assert( !text.accepts( div ) )

      const node = VDom( { nodeType: 'cool' } )

      assert( node.accepts( text ) )
    })

    it( 'categories', () => {
      const div = VDom( '<div></div>' )
      const categories = div.categories()

      assert( is.array( categories ) )
      assert( categories.includes( 'flow content' ) )

      const node = VDom( { nodeType: 'cool' } )

      assert.deepEqual( node.categories(), [] )
    })

    it( 'isEmpty', () => {
      const div = VDom( '<div></div>' )
      const img = VDom( '<img src="image.jpg" />' )
      const node = VDom( { nodeType: 'cool' } )

      assert( !div.isEmpty() )
      assert( img.isEmpty() )
      assert( !node.isEmpty() )
    })

    it( 'isModules', () => {
      const div = VDom( '<div></div>' )
      const meta = VDom( '<meta charset="utf-8" />' )
      const text = VDom( 'Hello' )
      const img = VDom( '<img src="image.jpg" />' )

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
      } = VDom.h

      const expected = '<!doctype html><html><head><meta charset="utf-8" /><title>Hello World!</title></head><body><!--Whose line is it anyway?--><div id="main"><p>The quick brown fox jumps over the <strong>lazy dog</strong></p><input type="text" name="firstName" placeholder="Alex" /></div><!--Fragment not (usually) necessary but make sure it works--><!--Text not necessary but etc.--><p>lol wut</p><!--But what if it is not in the spec?--><customtag class="kk"><p>OK that works for me</p></customtag></body></html>'

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
      const { div } = VDom.h
      const el = div()
      const vnode = el.vnode()
      
      assert( vnode )
    })

    it( 'firstChild', () => {
      const { div, p } = VDom.h
      const el = div()
      const vnode = el.vnode()

      assert.equal( undefined, vnode.firstChild )

      el.append( p() )

      assert( vnode.firstChild )
    })

    it( 'nextSibiling', () => {
      const { div, p } = VDom.h
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
      const { div } = VDom.h
      const el = div()
      const vnode = el.vnode()

      assert.equal( vnode.nodeType, 1 )
    })

    it( 'nodeName', () => {
      const { div } = VDom.h
      const el = div()
      const vnode = el.vnode()

      assert.equal( vnode.nodeName, 'div' )
    })

    it( 'namespaceURI', () => {
      const { div } = VDom.h
      const el = div()
      const vnode = el.vnode()

      assert.equal( vnode.namespaceURI, 'http://www.w3.org/1999/xhtml' )
    })

    it( 'nodeValue', () => {
      const t = VDom.createText( 'Hello' )
      const vnode = t.vnode()

      assert.equal( vnode.nodeValue, 'Hello' )
    })

    it( 'value', () => {
      const node = VDom.createElement( 'input', { value: 'hello' } )
      const vnode = node.vnode()

      assert.equal( vnode.value, 'hello' )
    })

    it( 'selected', () => {
      const node = VDom.createElement( 'input', { selected: true } )
      const vnode = node.vnode()

      assert.equal( vnode.selected, true )
    })

    it( 'disabled', () => {
      const node = VDom.createElement( 'input', { disabled: true } )
      const vnode = node.vnode()

      assert.equal( vnode.disabled, true )
    })

    it( 'hasAttributeNS', () => {
      const node = VDom.createElement( 'input' )
      const vnode = node.vnode()

      assert.equal( vnode.hasAttributeNS( 'http://www.w3.org/1999/xhtml' ), true )
    })    
  })

  describe( 'morphdom', () => {
    const document = require( 'jsdom' ).jsdom( '<html><body><div id="main"></div></body></html>' )
    const main = document.querySelector( '#main' )

    const {
      div, p, strong, input, comment, documentFragment
    } = VDom.h

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
})

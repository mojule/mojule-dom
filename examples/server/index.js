const vdom = require( '../../dist' )

const {
  document, documentType, text, comment, documentFragment, element,
  html, head, body, meta, title, div, p, strong, input
} = vdom.h

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

const lol = dom.querySelector( 'p:not(#main > p)' )

lol.append( text( ' ok' ) )

console.log( dom.stringify() )

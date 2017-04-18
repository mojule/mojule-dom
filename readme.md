# vdom

A virtual dom built on mojule [tree](https://github.com/mojule/tree) and
[dom-plugins](https://github.com/mojule/dom-plugins)

Lets you use the mojule tree API, plugins etc. to work with HTML nodes on the
server and in the browser

## Install

`npm install @mojule/vdom`

## Examples

### Server

```javascript
const vdom = require( '@mojule/vdom' )

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

const lol = dom.querySelector( 'p:not( #main > p )' )

lol.append( text( ' ok' ) )

console.log( dom.stringify() )
```

Note, the following has been prettified, `stringify` does not output any
whitespace:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello World!</title>
  </head>
  <body>
    <!--Whose line is it anyway?-->
    <div id="main">
      <p>The quick brown fox jumps over the <strong>lazy dog</strong></p>
      <input type="text" name="firstName" placeholder="Alex" />
    </div>
    <!--Fragment not (usually) necessary but make sure it works-->
    <!--Text not necessary but etc.-->
    <p>lol wut ok</p>
    <!--But what if it is not in the spec?-->
    <customtag class="kk">
      <p>OK that works for me</p>
    </customtag>
  </body>
</html>
```

### Browser

Via browserify or similar:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Vdom morphdom</title>
  </head>
  <body>
    <div id="main"></div>
    <script src="main.js"></script>
  </body>
</html>
```

```javascript
const vdom = require( '@mojule/vdom' )

const {
  div, p, strong, input, comment, documentFragment
} = vdom.h

const vmain = div(
  { id: 'main', class: 'container' },

  documentFragment(
    comment( 'Hello' )
  ),

  p( 'The quick brown fox jumps over the ', strong( 'lazy dog' ) ),

  input( { type:'text', name:'firstName', placeholder:'Alex' } )
)

const main = document.querySelector( '#main' )

vmain.morphdom( main )

console.log( main.outerHTML )
```

## API reference

First, see the references for
[tree-factory](https://github.com/mojule/tree-factory),
[tree](https://github.com/mojule/tree) and
[dom-plugins](https://github.com/mojule/dom-plugins), as vdom is built on those
so has all of their API methods.

Additionally, vdom adds or overrides the following plugins:

### accepts

Overrides base accepts so that HTML nodes can only accept nodes according to
the HTML spec, for example disallows adding a `div` to a `span` and so forth.

Stricter than the real browser DOM, which will let you do things like that and
then try to apply error correction. We may allow turning this off with a
`loose: true` option in future.

```javascript
const span = vdom.createElement( 'span' )
const div = vdom.createElement( 'div' )

console.log( span.accepts( div ) ) // false

span.append( div ) // throws
```

### categories

Returns an array of content categories (as defined by the HTML spec) for a node

```javascript
const div = vdom.createElement( 'div' )

console.log( div.categories() )
```

```json
[ "flow content", "palpable content" ]
```

### createState

Extends the default `createState` to also allow the creation of nodes from
HTML strings

```javascript
const div = vdom( '<div></div>' )
```

### h

Adds a [hyper-script](https://github.com/hyperhype/hyperscript)-like interface
to vdom, stored on vdom.h

A convenience API for easily creating nested nodes

See the examples above.

### isEmpty

Overrides default `isEmpty` implementation to use the definitions from the HTML
spec - note that `isEmpty === true` means that a node **cannot** have children,
not that a node **does not** have children.

```javascript
const div = vdom.createElement( 'div' )
const img = vdom.createElement( 'img' )

console.log( div.isEmpty() ) // false
console.log( img.isEmpty() ) // true
```

### isModules

#### isMetadata

Returns true if the node is a metadata element, as defined by the spec

```javascript
const div = vdom.createElement( 'div' )
const meta = vdom.createElement( 'meta' )

console.log( div.isMetadata() ) // false
console.log( meta.isMetadata() ) // true
```

#### isInline

Returns true if the node's categories include 'phrasing content'

```javascript
const div = vdom.createElement( 'div' )
const span = vdom.createElement( 'span' )
const text = vdom.createText( 'hello' )

console.log( div.isInline() ) // false
console.log( span.isInline() ) // true
console.log( text.isInline() ) // true
```

#### isEmbedded

Returns true if the node's categories include 'embedded content'

```javascript
const div = vdom.createElement( 'div' )
const img = vdom.createElement( 'img' )

console.log( div.isEmbedded() ) // false
console.log( img.isEmbedded() ) // true
```

#### isBlock

Returns true if the node's categories contain 'flow content' and do not
include 'phrasing content'

```javascript
const div = vdom.createElement( 'div' )
const span = vdom.createElement( 'span' )

console.log( div.isBlock() ) // true
console.log( span.isBlock() ) // false
```

#### isContainer

Returns true if the node is not an empty node

```javascript
const div = vdom.createElement( 'div' )
const img = vdom.createElement( 'img' )

console.log( div.isContainer() ) // true
console.log( img.isContainer() ) // false
```

### morphdom

Allows you to patch a vdom node into the real DOM, via
[morphdom](https://github.com/patrick-steele-idem/morphdom)

See the browser example above.

### vnode

Returns a virtual node representation of the current node, suitable for use with
morphdom but potentially also with other tools that require a more DOM-like
interface

```javascript
const div = vdom.createElement( 'div' )
const vdiv = div.vnode()

console.log( vdiv.tagName ) // 'div'
```
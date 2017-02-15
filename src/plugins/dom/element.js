'use strict'

const utils = require( 'mojule-utils' )

const { clone } = utils

const element = fn => {
  const attributes = ( node, attributeMap ) => {
    fn.assertElement( node )

    const nodeValue = fn.value( node )

    if( typeof attributeMap === 'object' ) {
      Object.keys( attributeMap ).forEach( attributeName => {
        const attributeValue = attributeMap[ attributeName ]

        fn.attr( node, attributeName, attributeValue )
      })
    }

    if( nodeValue.attributes === undefined )
      return {}

    return clone( nodeValue.attributes )
  }

  attributes.def = {
    argTypes: [ 'node', 'object?' ],
    returnType: 'object',
    requires: [ 'value', 'assertElement', 'attr' ],
    categories: [ 'dom', 'attributes', 'plugins' ]
  }

  const tagName = ( node, value ) => {
    fn.assertElement( node )

    const nodeValue = fn.value( node )

    if( value !== undefined ) {
      nodeValue.tagName = value

      fn.value( node, nodeValue )
    }

    return nodeValue.tagName
  }

  tagName.def = {
    argTypes: [ 'node', 'string' ],
    returnType: 'string',
    requires: [ 'value', 'assertElement' ],
    categories: [ 'dom', 'tagName', 'plugins' ]
  }

  const attr = ( node, name, value ) => {
    fn.assertElement( node )

    const nodeValue = fn.value( node )

    if( value !== undefined ) {
      if( nodeValue.attributes === undefined ) nodeValue.attributes = {}

      nodeValue.attributes[ name ] = value.toString()

      fn.value( node, nodeValue )
    }

    if( typeof nodeValue.attributes === 'object' )
      return nodeValue.attributes[ name ]
  }

  attr.def = {
    argTypes: [ 'node', 'string', 'string' ],
    returnType: 'string',
    requires: [ 'value', 'assertElement' ],
    categories: [ 'dom', 'attr', 'plugins' ]
  }

  const hasAttr = ( node, name ) => {
    fn.assertElement( node )

    return fn.attr( node, name ) !== undefined
  }

  hasAttr.def = {
    argTypes: [ 'node', 'string' ],
    returnType: 'boolean',
    requires: [ 'value', 'assertElement' ],
    categories: [ 'dom', 'hasAttr', 'plugins' ]
  }

  const removeAttr = ( node, name ) => {
    fn.assertElement( node )

    const nodeValue = fn.value( node )

    if( typeof nodeValue.attributes === 'object' )
      delete nodeValue.attributes[ name ]

    fn.value( node, nodeValue )
  }

  removeAttr.def = {
    argTypes: [ 'node', 'string' ],
    requires: [ 'value', 'assertElement' ],
    categories: [ 'dom', 'removeAttr', 'plugins' ]
  }

  const clearAttrs = node => {
    fn.assertElement( node )

    const nodeValue = fn.value( node )

    nodeValue.attributes = {}

    fn.value( node, nodeValue )
  }

  clearAttrs.def = {
    argTypes: [ 'node' ],
    requires: [ 'value', 'assertElement' ],
    categories: [ 'dom', 'clearAttrs', 'plugins' ]
  }

  const clearClasses = node => {
    fn.assertElement( node )

    fn.attr( node, 'class', '' )
  }

  clearClasses.def = {
    argTypes: [ 'node' ],
    requires: [ 'value', 'assertElement' ],
    categories: [ 'dom', 'clearClasses', 'plugins' ]
  }

  const classNames = node => {
    fn.assertElement( node )

    const classNames = fn.attr( node, 'class' )

    if( typeof classNames === 'string' ) return classNames.split( ' ' )

    return []
  }

  classNames.def = {
    argTypes: [ 'node' ],
    returnType: '[string]',
    requires: [ 'attr', 'assertElement' ],
    categories: [ 'dom', 'classNames', 'plugins' ]
  }

  const hasClass = ( node, className ) => {
    fn.assertElement( node )

    return fn.classNames( node ).some( name => name === className )
  }

  hasClass.def = {
    argTypes: [ 'node', 'string' ],
    returnType: 'boolean',
    requires: [ 'classNames', 'assertElement' ],
    categories: [ 'dom', 'hasClass', 'plugins' ]
  }

  const addClass = ( node, className ) => {
    fn.assertElement( node )

    className = className.trim()

    const existing = fn.classNames( node )

    existing.push( className )

    fn.attr( node, 'class', existing.join( ' ' ) )

    return node
  }

  addClass.def = {
    argTypes: [ 'node', 'string' ],
    returnType: 'node',
    requires: [ 'classNames', 'attr', 'assertElement' ],
    categories: [ 'dom', 'addClass', 'plugins' ]
  }


  const addClasses = ( node, ...classNames ) => {
    fn.assertElement( node )

    const existing = fn.classNames( node )

    existing.push( ...classNames )

    fn.attr( node, 'class', existing.join( ' ' ) )

    return node
  }

  addClasses.def = {
    argTypes: [ 'node', '...string' ],
    returnType: 'node',
    requires: [ 'classNames', 'attr', 'assertElement' ],
    categories: [ 'dom', 'addClasses', 'plugins' ]
  }

  const removeClass = ( node, className ) => {
    fn.assertElement( node )

    className = className.trim()

    const existing = fn.classNames( node ).filter( name => name !== className )

    fn.attr( node, 'class', existing.join( ' ' ) )

    return node
  }

  removeClass.def = {
    argTypes: [ 'node', 'string' ],
    returnType: 'node',
    requires: [ 'classNames', 'attr', 'assertElement' ],
    categories: [ 'dom', 'removeClass', 'plugins' ]
  }

  const toggleClass = ( node, className, shouldHave ) => {
    fn.assertElement( node )

    const alreadyHas = fn.hasClass( node, className )

    if( typeof shouldHave !== 'boolean' )
      return fn.toggleClass( node, className, !alreadyHas )

    if( alreadyHas ) {
      if( shouldHave ) return node

      return fn.removeClass( node, className )
    }

    if( shouldHave ) return fn.addClass( node, className )

    return node
  }

  toggleClass.def = {
    argTypes: [ 'node', 'string', 'boolean' ],
    returnType: 'node',
    requires: [ 'hasClass', 'removeClass', 'addClass', 'assertElement' ],
    categories: [ 'dom', 'toggleClass', 'plugins' ]
  }

  const plugins = {
    attributes, attr, hasAttr, removeAttr, classNames, hasClass, addClass,
    removeClass, toggleClass, tagName, clearAttrs, clearClasses, addClasses
  }

  return Object.assign( fn, plugins )
}

module.exports = element

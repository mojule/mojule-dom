'use strict'

var EntityNode = require('mtype-node')

var DomHandler = function DomHandler(options) {
  var state = State(options)

  var handler = { state: state }

  var api = Api(handler)

  return api
}

//default options
var defaultOpts = {
  normalizeWhitespace: false
};

var whitespace = /\s+/g

var State = function State(options) {
  options = options || defaultOpts

  var dom = EntityNode('documentFragment')
  var done = false
  var tagStack = []
  var parser = null

  var state = {
    options: options, dom: dom, done: done, tagStack: tagStack, parser: parser
  }

  return state
};

var Api = function Api(handler) {
  var oninit = function oninit(parser) {
    return handler.state.parser = parser
  };

  var onreset = function onreset() {
    var options = handler.state.options


    handler.state = State(options);
  };

  var onend = function onend() {
    if (handler.state.done) return;

    handler.state.done = true;
    handler.state.parser = null;
    onerror(null);
  };

  var onerror = function onerror(err) {
    if (err) throw err;
  };

  var onclosetag = function onclosetag() {
    var tagStack = handler.state.tagStack;


    tagStack.pop();
  };

  var onopentag = function onopentag(name, attribs) {
    var tagStack = handler.state.tagStack;


    var element = EntityNode('element', {
      tagName: name,
      attributes: attribs
    });

    addDomElement(handler, element);
    tagStack.push(element);
  };

  var ontext = function ontext(data) {
    var options = handler.state.options;


    var normalize = options.normalizeWhitespace || options.ignoreWhitespace ? function (str) {
      return str.replace(whitespace, ' ');
    } : function (str) {
      return str;
    };

    var previousText = findPreviousText(handler);

    if (previousText) {
      previousText.value.nodeValue = normalize(previousText.nodeValue + data);
    } else {
      data = normalize(data);

      var text = EntityNode('text', { nodeValue: data });

      addDomElement(handler, text);
    }
  };

  var oncomment = function oncomment(data) {
    var tagStack = handler.state.tagStack;


    var lastTag = tagStack[tagStack.length - 1];

    if (lastTag && lastTag.value.nodeType === 'comment') {
      lastTag.value.nodeValue += data;

      return;
    }

    var comment = EntityNode('comment', { nodeValue: data });

    addDomElement(handler, comment);
    tagStack.push(comment);
  };

  var onprocessinginstruction = function onprocessinginstruction(name, data) {
    oncomment(data);
    oncommentend();
  };

  var oncommentend = function oncommentend() {
    return handler.state.tagStack.pop();
  };

  var getDom = function getDom() {
    return handler.state.dom;
  };

  var api = {
    oninit: oninit, onreset: onreset, onend: onend, onerror: onerror, onclosetag: onclosetag, onopentag: onopentag, ontext: ontext, oncomment: oncomment,
    oncommentend: oncommentend, onprocessinginstruction: onprocessinginstruction, getDom: getDom
  };

  return api;
};

var findPreviousText = function findPreviousText(handler) {
  var _handler$state = handler.state,
      tagStack = _handler$state.tagStack,
      dom = _handler$state.dom;


  if (tagStack.length) {
    var lastTag = tagStack[tagStack.length - 1];
    var _children = lastTag.children;

    if (_children.length) {
      var _lastChild = _children[_children.length - 1];

      if (_lastChild.value.nodeType === 'text') return _lastChild;
    }
  }

  var children = dom.children;

  if (!children || !children.length) return;

  var lastChild = children[children.length - 1];

  if (lastChild.value.nodeType === 'text') return lastChild;
};

var addDomElement = function addDomElement(handler, element) {
  var _handler$state2 = handler.state,
      tagStack = _handler$state2.tagStack,
      dom = _handler$state2.dom;


  var parent = tagStack[tagStack.length - 1];
  var target = parent ? parent.children : dom.children;

  target.push(element);
};

module.exports = DomHandler;
'use strict';

var html = require('@mojule/html');

var isModules = function isModules(node) {
  return {
    isMetadata: function isMetadata() {
      return html.isMetadata(node.nodeName());
    },
    isInline: function isInline() {
      return html.isInline(node.nodeName());
    },
    isEmbedded: function isEmbedded() {
      return html.isEmbedded(node.nodeName());
    },
    isBlock: function isBlock() {
      return html.isBlock(node.nodeName());
    },
    isContainer: function isContainer() {
      return html.isContainer(node.nodeName());
    }
  };
};

module.exports = isModules;
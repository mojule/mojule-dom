'use strict';

// TODO add handling for text elements, eg combine them

var insertBeforeWrapper = function insertBeforeWrapper(fn) {
  var originalInsertBefore = fn.insertBefore;

  var insertBefore = function insertBefore(fn, root, parentNode, childNode, referenceNode) {
    // handle document fragments
    if (fn.isDocumentFragment(childNode)) {
      var children = fn.getChildren(childNode);

      children.forEach(function (child) {
        return originalInsertBefore(fn, root, parentNode, child, referenceNode);
      });

      return childNode;
    }

    return originalInsertBefore(fn, root, parentNode, childNode, referenceNode);
  };

  insertBefore.def = originalInsertBefore.def;

  return Object.assign(fn, { insertBefore: insertBefore });
};

module.exports = insertBeforeWrapper;
'use strict';

var insertBeforeWrapper = function insertBeforeWrapper(fn) {
  var originalInsertBefore = fn.insertBefore;

  var insertBefore = function insertBefore(fn, root, parentNode, childNode, referenceNode) {
    // TODO
    // handle document fragments
    // handle combining text elements
    return originalInsertBefore(fn, root, parentNode, childNode, referenceNode);
  };

  insertBefore.def = originalInsertBefore.def;

  return Object.assign(fn, { insertBefore: insertBefore });
};

module.exports = insertBeforeWrapper;
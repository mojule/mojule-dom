'use strict';

var is = require('@mojule/is');

var createState = function createState(api) {
  var createState = api.createState;


  return {
    $createState: function $createState() {
      if (is.string(arguments.length <= 0 ? undefined : arguments[0])) {
        var node = api.parse(arguments.length <= 0 ? undefined : arguments[0]);

        return createState(node.get());
      }

      return createState.apply(undefined, arguments);
    }
  };
};

module.exports = createState;
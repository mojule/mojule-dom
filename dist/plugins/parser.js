'use strict';

var defaultOptions = {
  xmlMode: false,
  removeWhitespace: false
};

var parser = function parser(api) {
  var parse = api.parse;


  return {
    $parse: function $parse(str) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      options = Object.assign({}, defaultOptions, options);

      return parse(str, options);
    }
  };
};

module.exports = parser;
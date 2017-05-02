'use strict';

var is = require('@mojule/is');
var TreeFactory = require('@mojule/tree').Factory;
var FactoryFactory = require('@mojule/tree').FactoryFactory;
var domPlugins = require('@mojule/dom-plugins');
var defaultPlugins = require('./plugins');
var plugins = domPlugins.concat(defaultPlugins);
var Factory = FactoryFactory(TreeFactory, plugins);
var VDom = Factory();

Object.assign(VDom, { Factory: Factory });

module.exports = VDom;
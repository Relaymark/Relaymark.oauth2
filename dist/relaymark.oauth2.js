'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

require('ngStorage');

var _svOAuth = require('./services/svOAuth2');

var _svOAuth2 = _interopRequireDefault(_svOAuth);

var _svOAuthStorage = require('./services/svOAuthStorage');

var _svOAuthStorage2 = _interopRequireDefault(_svOAuthStorage);

var _svQueryStringHelper = require('./services/svQueryStringHelper');

var _svQueryStringHelper2 = _interopRequireDefault(_svQueryStringHelper);

var _svHttpBuffer = require('./services/svHttpBuffer');

var _svHttpBuffer2 = _interopRequireDefault(_svHttpBuffer);

var _svOAuthInterceptor = require('./services/svOAuthInterceptor');

var _svOAuthInterceptor2 = _interopRequireDefault(_svOAuthInterceptor);

var _rmLogin = require('./directives/rmLogin/rmLogin.js');

var _rmLogin2 = _interopRequireDefault(_rmLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _angular2.default.module('relaymark.oauth2', ['ngStorage']).provider('svOAuth2', _svOAuth2.default).provider('svOAuthStorage', _svOAuthStorage2.default).provider('svOAuthInterceptor', _svOAuthInterceptor2.default).factory('svQueryStringHelper', _svQueryStringHelper2.default).factory('svHttpBuffer', _svHttpBuffer2.default).directive('rmLogin', _rmLogin2.default).name;
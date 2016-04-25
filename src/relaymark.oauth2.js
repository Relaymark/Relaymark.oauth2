
import angular from 'angular';
/*import 'ngStorage';*/
import svOAuth2 from './services/svOAuth2';
import svOAuthStorage from './services/svOAuthStorage';
import svQueryStringHelper from './services/svQueryStringHelper';
import svHttpBuffer from './services/svHttpBuffer';
import svOAuthInterceptor from './services/svOAuthInterceptor';

import rmLogin from './directives/rmLogin/rmLogin.js';


export default angular.module('relaymark.oauth2', ['ngStorage'])
    .provider('svOAuth2', svOAuth2)
    .provider('svOAuthStorage', svOAuthStorage)
    .provider('svOAuthInterceptor', svOAuthInterceptor)
    .factory('svQueryStringHelper', svQueryStringHelper)
    .factory('svHttpBuffer', svHttpBuffer)
    .directive('rmLogin', rmLogin)
    .name;

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"), require("ngStorage"));
	else if(typeof define === 'function' && define.amd)
		define(["angular", "ngStorage"], factory);
	else if(typeof exports === 'object')
		exports["relaymark.oauth2"] = factory(require("angular"), require("ngStorage"));
	else
		root["relaymark.oauth2"] = factory(root["angular"], root["ngStorage"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _angular = __webpack_require__(9);

	var _angular2 = _interopRequireDefault(_angular);

	__webpack_require__(10);

	var _svOAuth = __webpack_require__(4);

	var _svOAuth2 = _interopRequireDefault(_svOAuth);

	var _svOAuthStorage = __webpack_require__(6);

	var _svOAuthStorage2 = _interopRequireDefault(_svOAuthStorage);

	var _svQueryStringHelper = __webpack_require__(7);

	var _svQueryStringHelper2 = _interopRequireDefault(_svQueryStringHelper);

	var _svHttpBuffer = __webpack_require__(3);

	var _svHttpBuffer2 = _interopRequireDefault(_svHttpBuffer);

	var _svOAuthInterceptor = __webpack_require__(5);

	var _svOAuthInterceptor2 = _interopRequireDefault(_svOAuthInterceptor);

	var _rmLogin = __webpack_require__(2);

	var _rmLogin2 = _interopRequireDefault(_rmLogin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _angular2.default.module('relaymark.oauth2', ['ngStorage']).provider('svOAuth2', _svOAuth2.default).provider('svOAuthStorage', _svOAuthStorage2.default).provider('svOAuthInterceptor', _svOAuthInterceptor2.default).factory('svQueryStringHelper', _svQueryStringHelper2.default).factory('svHttpBuffer', _svHttpBuffer2.default).directive('rmLogin', _rmLogin2.default).name;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var rmLoginController = function rmLoginController(svOAuthStorage, svOAuth2, $rootScope) {
	  _classCallCheck(this, rmLoginController);

	  //var defaultRememberMe = true;

	  var rmLoginVm = this;
	  rmLoginVm.isLogged = angular.isDefined(svOAuthStorage.getToken());

	  rmLoginVm.login = function () {
	    svOAuth2.getAccessCode();
	  };

	  rmLoginVm.logout = function () {
	    svOAuth2.revokeToken().then(function () {
	      rmLoginVm.isLogged = angular.isDefined(svOAuthStorage.getToken());
	      $rootScope.$broadcast('oauth:logout');
	    });
	  };
	};

	exports.default = rmLoginController;

	rmLoginController.$inject = ['svOAuthStorage', 'svOAuth2', '$rootScope'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = rmLogin;

	var _rmLogin = __webpack_require__(8);

	var _rmLogin2 = _interopRequireDefault(_rmLogin);

	var _rmLoginController = __webpack_require__(1);

	var _rmLoginController2 = _interopRequireDefault(_rmLoginController);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function rmLogin() {
	  return {
	    restrict: 'E',
	    replace: true,
	    transclude: true,
	    templateUrl: _rmLogin2.default,
	    controller: _rmLoginController2.default,
	    scope: {},
	    bindToController: {
	      createAccountUrl: '=rmCreateAccountUrl',
	      forgotPasswordUrl: '=rmForgotPasswordUrl'
	    },
	    controllerAs: 'rmLoginCtr'

	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = svHttpBuffer;
	svHttpBuffer.$inject = ['$injector'];
	function svHttpBuffer($injector) {

	  var buffer = [];

	  /** Service initialized later because of circular dependency problem. */
	  var $http;

	  var retryHttpRequest = function retryHttpRequest(config, deferred) {
	    function successCallback(response) {
	      deferred.resolve(response);
	    }

	    function errorCallback(response) {

	      deferred.reject(response);
	    }

	    $http = $http || $injector.get('$http');
	    $http(config).then(successCallback, errorCallback);
	  };

	  return {
	    /**
	     * @ngdoc method
	     * @name append
	     * @methodOf relaymark.shared.svHttpBuffer
	     * @kind function
	     * @description
	     * Appends HTTP request configuration object with deferred response attached to buffer.
	     *
	     * @param {object} config Request to append
	     * @param {deferred} deferred Promise deferred.
	     */

	    append: function append(config, deferred) {
	      buffer.push({
	        config: config,
	        deferred: deferred
	      });
	    },


	    /**
	     * @ngdoc method
	     * @name rejectAll
	     * @methodOf relaymark.shared.svHttpBuffer
	     * @kind function
	     * @description
	     * Abandon or reject (if reason provided) all the buffered requests.
	     *
	     * @param {string} reason Reason to reject
	     */
	    rejectAll: function rejectAll(reason) {
	      if (reason) {
	        for (var i = 0; i < buffer.length; ++i) {
	          buffer[i].deferred.reject(reason);
	        }
	      }
	      buffer = [];
	    },


	    /**
	     * @ngdoc method
	     * @name retryAll
	     * @methodOf relaymark.shared.svHttpBuffer
	     * @kind function
	     * @description
	     * Retries all the buffered requests clears the buffer.
	     *
	     * @param {function} updater Function which can update the url request (example: updating authorization header).
	     */
	    retryAll: function retryAll(updater) {

	      for (var i = 0; i < buffer.length; ++i) {
	        retryHttpRequest(updater(buffer[i].config), buffer[i].deferred);
	      }
	      buffer = [];
	    }
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var svOAuth2 = function svOAuth2() {
	    _classCallCheck(this, svOAuth2);

	    //this.config;
	    this.defaults = {
	        baseUrl: null,
	        clientId: null,
	        clientSecret: null,
	        scope: null,
	        authorizePath: '/connect/authorize',
	        grantPath: '/connect/token',
	        revokePath: '/connect/revocation',
	        redirectUri: null,
	        endSession: '/connect/endsession',
	        logoutRedirectUri: null
	    };
	    this.requiredKeys = ['baseUrl', 'clientSecret', 'scope', 'grantPath', 'revokePath'];

	    this.configure = function (params) {
	        // Can only be configured once.
	        if (this.config) {
	            throw new Error('Already configured.');
	        }
	        // Check if is an `object`.
	        if (!(params instanceof Object)) {
	            throw new TypeError('Invalid argument: `config` must be an `Object`.');
	        }
	        // Extend default configuration.
	        this.config = angular.extend({}, this.defaults, params);
	        var config = this.config;
	        // Check if all required keys are set.
	        angular.forEach(this.requiredKeys, function (key) {
	            if (!config[key]) {
	                throw new Error('Missing parameter: ' + key + '.');
	            }
	        });
	        // Remove `baseUrl` trailing slash.
	        if (this.config.baseUrl.substr(-1) === '/') {
	            this.config.baseUrl = this.config.baseUrl.slice(0, -1);
	        }
	        // Add `grantPath` facing slash.
	        if (this.config.grantPath[0] !== '/') {
	            this.config.grantPath = '/' + this.config.grantPath;
	        }
	        // Add `revokePath` facing slash.
	        if (this.config.revokePath[0] !== '/') {
	            this.config.revokePath = '/' + this.config.revokePath;
	        }
	        // Add `endSession` facing slash.
	        if (this.config.endSession[0] !== '/') {
	            this.config.endSession = '/' + this.config.endSession;
	        }
	        return this.config;
	    };

	    /*@ngInject*/
	    this.$get = function ($http, svOAuthStorage, svQueryStringHelper, $q) {

	        var config = this.config;
	        var isAuthenticated = function isAuthenticated() {
	            return angular.isDefined(svOAuthStorage.getToken());
	        };

	        var getAccessCode = function getAccessCode() {
	            var authPathHasQuery = config.authorizePath.indexOf('?') !== -1,
	                appendChar = authPathHasQuery ? '&' : '?',
	                //eslint-disable-line
	            oAuthScope = config.scope ? encodeURIComponent(config.scope) : ''; //if authorizePath has ? already append OAuth2 params

	            //logoutRedirectUri need oauthScope to have openid
	            if (angular.isDefined(config.logoutRedirectUri) && !oAuthScope.includes('openid')) {
	                throw new Error('You must add `openid` in your scope in order to use logoutRedirectUri.');
	            }

	            window.location = config.baseUrl + '' + config.authorizePath + appendChar + 'response_type=code&' + 'client_id=' + encodeURIComponent(config.clientId) + '&' + 'redirect_uri=' + encodeURIComponent(config.redirectUri) + '&' + 'scope=' + oAuthScope;
	        };

	        var getAccessToken = function getAccessToken(code, options) {

	            svOAuthStorage.setCode(code);
	            var data = {
	                grant_type: 'authorization_code',
	                scope: config.scope,
	                redirect_uri: config.redirectUri,
	                code: svOAuthStorage.getCode(),
	                client_id: config.clientId,
	                client_secret: config.clientSecret
	            };

	            data = svQueryStringHelper.stringify(data);

	            options = angular.extend({
	                headers: {
	                    'Content-Type': 'application/x-www-form-urlencoded'
	                }
	            }, options);

	            var promise = $http.post('' + config.baseUrl + '' + config.grantPath, data, options);
	            promise.then(function (response) {
	                svOAuthStorage.setToken(response.data, true);
	            });
	            return promise;
	        };

	        var getRefreshToken = function getRefreshToken() {
	            var data = {
	                grant_type: 'refresh_token',
	                //scope: config.scope,
	                client_id: config.clientId,
	                client_secret: config.clientSecret,
	                refresh_token: svOAuthStorage.getRefreshToken()
	            };

	            data = svQueryStringHelper.stringify(data);

	            var options = {
	                headers: {
	                    'Content-Type': 'application/x-www-form-urlencoded'
	                }
	            };

	            var promise = $http.post('' + config.baseUrl + '' + config.grantPath, data, options);
	            promise.then(function (response) {
	                svOAuthStorage.setToken(response.data);
	            });
	            return promise;
	        };

	        var revokeToken = function revokeToken() {

	            //NOTICE : Cors issues with identity server3
	            /*
	             var data = {
	             token: svOAuthStorage.getRefreshToken() ? svOAuthStorage.getRefreshToken() : svOAuthStorage.getAccessToken(),
	             client_id: config.clientId,
	             client_secret: config.clientSecret,
	             token_type_hint: svOAuthStorage.getRefreshToken() ? 'refresh_token' : 'access_token' //optional
	             };
	             var options = {
	             headers: {
	             'Content-Type': 'application/x-www-form-urlencoded'
	             }
	             };
	             data = svQueryStringHelper.stringify(data);
	             let promise = $http.post('' + config.baseUrl + '' + config.revokePath, data, options);*/

	            var deferred = new $q.defer(); // eslint-disable-line new-cap
	            deferred.promise.then(function () {
	                var token = svOAuthStorage.getToken();
	                svOAuthStorage.removeCode();
	                svOAuthStorage.removeToken();

	                var url = config.baseUrl + '' + config.endSession;

	                if (angular.isDefined(config.logoutRedirectUri)) {
	                    url += '?id_token_hint=' + token['id_token'] + '&post_logout_redirect_uri=' + config.logoutRedirectUri;
	                }
	                window.location = url;
	            });
	            deferred.resolve();
	            return deferred.promise;
	        };

	        if (!this.config) {
	            throw new Error('`svOAuth2Provider` must be configured first.');
	        }

	        return {
	            isAuthenticated: isAuthenticated,
	            getAccessCode: getAccessCode,
	            getAccessToken: getAccessToken,
	            getRefreshToken: getRefreshToken,
	            revokeToken: revokeToken
	        };
	    };
	    this.$get.$inject = ['$http', 'svOAuthStorage', 'svQueryStringHelper', '$q'];
	};

	exports.default = svOAuth2;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var svOAuthInterceptor = function svOAuthInterceptor() {
	  _classCallCheck(this, svOAuthInterceptor);

	  this.defaults = {
	    endpointUrl: ''
	  };

	  this.configure = function (params) {
	    // Can only be configured once.
	    if (this.config) {
	      throw new Error('Already configured.');
	    }
	    // Check if is an `object`.
	    if (!(params instanceof Object)) {
	      throw new TypeError('Invalid argument: `config` must be an `Object`.');
	    }
	    if (!angular.isDefined(params.endpointUrl)) {
	      throw new Error('endpointUrl MUST be defined');
	    }
	    // Extend default configuration.
	    this.config = angular.extend({}, this.defaults, params);

	    return this.config;
	  };

	  /*@ngInject*/
	  this.$get = function ($log, $q, svHttpBuffer, $rootScope, svOAuthStorage, $injector) {
	    var waitHandle;
	    var svOAuthInterceptorVM = this;
	    if (!angular.isDefined(this.config)) {
	      throw new Error("Please configure svOAuthInterceptor by using : svOAuthInterceptorProvider.configure({endpointUrl : 'http://api.domain.com'}); in your config module");
	    }

	    svOAuthInterceptorVM.processRefreshToken = function (rejection, deferred) {
	      svHttpBuffer.append(rejection.config, deferred);

	      function refresh($http, svOAuth2) {
	        $log.warn('refreshTokenRequired');
	        if (!waitHandle) {
	          waitHandle = svOAuth2.getRefreshToken().then(function () {
	            svHttpBuffer.retryAll(function (config) {
	              //set good authorization headers
	              var authHeader = svOAuthStorage.getAuthorizationHeader();
	              if (authHeader) {
	                config.headers = config.headers || {};
	                config.headers.Authorization = authHeader;
	              }
	              config.$$alreadyRetried = true;
	              return config;
	            });
	            waitHandle = null;
	          }, function (error) {
	            svOAuthStorage.removeToken();
	            svHttpBuffer.rejectAll('refreshTokenFailed');
	            $rootScope.$emit('oauth:loginRequired', error);
	            waitHandle = null;
	          });
	        }
	      }

	      refresh.$inject = ['$http', 'svOAuth2'];
	      $injector.invoke(refresh);
	    };
	    svOAuthInterceptorVM.$q = $q;
	    svOAuthInterceptorVM.endpointUrl = this.config.endpointUrl;
	    svOAuthInterceptorVM.svOAuthStorage = svOAuthStorage;

	    return {
	      request: function request(config) {
	        var requestUrl = config.url;
	        if (requestUrl.indexOf(svOAuthInterceptorVM.endpointUrl) === 0) {
	          //Inject `Authorization` header.
	          var authorizationHeader = svOAuthInterceptorVM.svOAuthStorage.getAuthorizationHeader();

	          if (!config.headers.Authorization && authorizationHeader) {
	            svOAuthInterceptorVM.svOAuthStorage.applySlidingStorage();
	            config.headers = config.headers || {};
	            config.headers.Authorization = authorizationHeader;
	          }
	        }
	        return config;
	      },
	      responseError: function responseError(rejection) {
	        // 400 Catch `invalid_request` and `invalid_grant` errors and ensure that the `token` is removed.
	        if (rejection.status === 400 && rejection.data && (rejection.data.error === 'invalid_request' || rejection.data.error === 'invalid_grant')) {
	          svOAuthInterceptorVM.svOAuthStorage.removeToken();
	          $rootScope.$emit('oauth:error', rejection);
	          return svOAuthInterceptorVM.$q.reject(rejection);
	        }

	        // 401 Catch `Unauthorized` error. Token isn't removed here so it can be refreshed.
	        if (rejection.status === 401 && rejection.data && rejection.statusText === 'Unauthorized') {
	          var deferred = svOAuthInterceptorVM.$q.defer();
	          var currentToken = svOAuthInterceptorVM.svOAuthStorage.getToken();

	          if (!angular.isDefined(currentToken) || rejection.config.$$alreadyRetried) {
	            svOAuthInterceptorVM.svOAuthStorage.removeToken();
	            $log.warn('loginRequired');
	            $rootScope.$emit('oauth:loginRequired', rejection);
	          } else {
	            svOAuthInterceptorVM.processRefreshToken(rejection, deferred);
	          }

	          return deferred.promise;
	        }

	        // Catch API Offline cases
	        if (rejection.status === 0 || rejection.status === -1) {
	          $rootScope.$emit('oauth:apiOffline', rejection);
	        }

	        //default behaviour
	        return svOAuthInterceptorVM.$q.reject(rejection);
	      }
	    };
	  };

	  this.$get.$inject = ['$log', '$q', 'svHttpBuffer', '$rootScope', 'svOAuthStorage', '$injector'];
	};

	exports.default = svOAuthInterceptor;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var svOAuthStorage = function () {
	    function svOAuthStorage() {
	        _classCallCheck(this, svOAuthStorage);

	        this.config = {
	            name: 'token'
	        };

	        this.$get = function ($localStorage) {
	            var self = {};
	            var config = this.config;

	            self.applySlidingStorage = function () {
	                var result = $localStorage.token;
	                //if sliding exp. is required => set the cookie again.
	                if (result && result.lastOptions && result.lastOptions.sliding && result.lastOptions.sliding === true) {
	                    self.removeToken();
	                    self.setToken(result.data, result.lastOptions.remember);
	                }
	            };

	            self.getToken = function () {
	                return $localStorage[config.name];
	            };

	            self.setToken = function (data) {
	                $localStorage[config.name] = data;
	                return $localStorage[config.name];
	            };

	            self.getAuthorizationHeader = function () {
	                var token = self.getToken();
	                if (!token) {
	                    return;
	                }

	                var tokenType = token['token_type'];
	                var accessToken = token['access_token'];
	                if (!(tokenType && accessToken)) {
	                    return;
	                }

	                var result = '' + (tokenType.charAt(0).toUpperCase() + tokenType.substr(1)) + ' ' + accessToken;
	                return result;
	            };

	            self.getAccessToken = function () {
	                var token = self.getToken();
	                return token ? token['access_token'] : undefined;
	            };

	            self.getTokenType = function () {
	                var token = self.getToken();
	                return token ? token['token_type'] : undefined;
	            };

	            self.getRefreshToken = function () {
	                var token = self.getToken();
	                return token ? token['refresh_token'] : undefined;
	            };

	            self.removeToken = function () {
	                delete $localStorage[config.name];
	            };

	            self.removeCode = function () {
	                delete $localStorage.oauth_code;
	            };
	            self.setCode = function (code) {
	                $localStorage.oauth_code = code;
	                return $localStorage.oauth_code;
	            };
	            self.getCode = function () {
	                return $localStorage.oauth_code;
	            };

	            return self;
	        };
	        this.$get.$inject = ['$localStorage'];
	    }

	    _createClass(svOAuthStorage, [{
	        key: 'configure',
	        value: function configure(params) {
	            // Check if is an `object`.
	            if (!(params instanceof Object)) {
	                throw new TypeError('Invalid argument: `config` must be an `Object`.');
	            }
	            // Extend default configuration.
	            angular.extend(this.config, params);
	            return this.config;
	        }

	        /*@ngInject*/

	    }]);

	    return svOAuthStorage;
	}();

	exports.default = svOAuthStorage;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = svQueryStringHelper;
	/**
	 * @ngdoc service
	 * @name relaymark.shared.svQueryStringHelper
	 * @description
	 * svQueryStringHelper is a helper which parse a query string to an object. It can also stringify an object to a string.
	 *
	 */
	function svQueryStringHelper() {
	  return {
	    /**
	     * @ngdoc method
	     * @name svQueryStringHelper#parse
	     * @methodOf relaymark.shared.svQueryStringHelper
	     * @kind function
	     * @description
	     * Parse a query string to an object.
	     *
	     * @param {string} str Query string to parse
	     * @returns {object} Object formed from the query string.
	     */

	    parse: function parse(str) {
	      if (typeof str !== 'string') {
	        return {};
	      }

	      str = str.trim().replace(/^(\?|#)/, '');

	      if (!str) {
	        return {};
	      }

	      return str.trim().split('&').reduce(function (ret, param) {
	        var parts = param.replace(/\+/g, ' ').split('=');
	        var key = parts[0];
	        var val = parts[1];

	        key = decodeURIComponent(key);
	        // missing `=` should be `null`:
	        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
	        val = val === undefined ? null : decodeURIComponent(val);

	        if (!ret.hasOwnProperty(key)) {
	          ret[key] = val;
	        } else if (Array.isArray(ret[key])) {
	          ret[key].push(val);
	        } else {
	          ret[key] = [ret[key], val];
	        }

	        return ret;
	      });
	    },


	    /**
	     * @ngdoc method
	     * @name svQueryStringHelper#stringify
	     * @methodOf relaymark.shared.svQueryStringHelper
	     * @kind function
	     * @description
	     * Stringify an object to a query string.
	     *
	     * @param {string} obj Object to parse
	     * @returns {string} Query string
	     */
	    stringify: function stringify(obj) {
	      return obj ? Object.keys(obj).map(function (key) {
	        var val = obj[key];

	        if (Array.isArray(val)) {
	          return val.map(function (val2) {
	            return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
	          }).join('&');
	        }

	        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
	      }).join('&') : '';
	    }
	  };
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	var path = 'D:/ProjetGit/RelaymarkGitPublic/Relaymark.oauth2/src/directives/rmLogin/rmLogin.html';
	var html = "<div class=\"rm-login\">\n    <div class=\"btn btn-primary btn-login\" ng-click=\"rmLoginCtr.login()\" ng-show=\"!rmLoginCtr.isLogged\">\n        Sign in\n    </div>\n    <div class=\"btn btn-logout\" ng-show=\"rmLoginCtr.isLogged\" ng-click=\"rmLoginCtr.logout()\">\n        Sign out\n    </div>\n    <div class=\"m-t-lg\" ng-show=\"!rmLoginCtr.isLogged\">\n        <p class=\"text-muted text-center\">\n            <small translate>Do not have an account ?</small>\n        </p>\n        <a class=\"btn btn-sm btn-white btn-block\" href=\"{{rmLoginCtr.createAccountUrl}}\" translate>Create an account</a>\n    </div>\n</div>\n";
	window.angular.module('ng').run(['$templateCache', function(c) { c.put(path, html) }]);
	module.exports = path;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ }
/******/ ])
});
;
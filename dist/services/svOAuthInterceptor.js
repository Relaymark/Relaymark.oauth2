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
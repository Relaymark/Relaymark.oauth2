export default
class svOAuth2 {
    constructor() {
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
            let config = this.config;
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
            var isAuthenticated = function () {
                return angular.isDefined(svOAuthStorage.getToken());
            };


            var getAccessCode = function () {
                var authPathHasQuery = (config.authorizePath.indexOf('?') !== -1),
                    appendChar = (authPathHasQuery) ? '&' : '?', //eslint-disable-line
                    oAuthScope = (config.scope) ? encodeURIComponent(config.scope) : '';    //if authorizePath has ? already append OAuth2 params


                //logoutRedirectUri need oauthScope to have openid
                if (angular.isDefined(config.logoutRedirectUri) && !oAuthScope.includes('openid')) {
                    throw new Error('You must add `openid` in your scope in order to use logoutRedirectUri.');
                }

                var url = config.baseUrl + '' + config.authorizePath +
                    appendChar + 'response_type=code&' +
                    'client_id=' + encodeURIComponent(config.clientId) + '&' +
                    'redirect_uri=' + encodeURIComponent(config.redirectUri) + '&' +
                    'scope=' + oAuthScope;

                window.location = url;
            };


            var getAccessToken = function (code, options) {

                svOAuthStorage.setCode(code);
                let data = {
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

                let promise = $http.post('' + config.baseUrl + '' + config.grantPath, data, options);
                promise.then(function (response) {
                    svOAuthStorage.setToken(response.data, true);
                });
                return promise;
            };

            var getRefreshToken = function () {
                var data = {
                    grant_type: 'refresh_token',
                    //scope: config.scope,
                    client_id: config.clientId,
                    client_secret: config.clientSecret,
                    refresh_token: svOAuthStorage.getRefreshToken()
                };

                data = svQueryStringHelper.stringify(data);

                let options = {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                };

                let promise = $http.post('' + config.baseUrl + '' + config.grantPath, data, options);
                promise.then(function (response) {
                    svOAuthStorage.setToken(response.data);
                });
                return promise;
            };

            var revokeToken = function () {

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

                let deferred = new $q.defer(); // eslint-disable-line new-cap
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
    }


}

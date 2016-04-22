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
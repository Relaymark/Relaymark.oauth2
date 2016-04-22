'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rmLogin;

var _rmLogin = require('./rmLogin.html');

var _rmLogin2 = _interopRequireDefault(_rmLogin);

var _rmLoginController = require('./rmLogin.controller.js');

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
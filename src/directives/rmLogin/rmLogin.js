import rmLoginTemplate from './rmLogin.html';
import rmLoginController from './rmLogin.controller.js';

export default function rmLogin() {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    templateUrl: rmLoginTemplate,
    controller: rmLoginController,
    scope : {},
    bindToController:{
      createAccountUrl: '=rmCreateAccountUrl',
      forgotPasswordUrl: '=rmForgotPasswordUrl'
    },
    controllerAs: 'rmLoginCtr'

  };
}

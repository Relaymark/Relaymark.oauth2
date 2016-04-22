
##Angular module config
 
    
    config.$inject = ['AppConstants', '$httpProvider', 'svOAuth2Provider'];
    
      export default function config(AppConstants,  $httpProvider, svOAuth2Provider) {
      
        $httpProvider.interceptors.push('svOAuthInterceptor');
        $httpProvider.interceptors.push('svServerDateResponseInterceptor');
        
        svOAuth2Provider.configure({
          baseUrl: AppConstants.ENDPOINT_AUTH,
          clientId: AppConstants.AUTH_CLIENT_ID,
          clientSecret: AppConstants.AUTH_CLIENT_SECRET,
          scope: AppConstants.AUTH_SCOPE,
          redirectUri: AppConstants.AUTH_CALLBACK
        });
      }


##Login page

    <rm-login></rm-login>


##Callback controller  
 
    export default
    class OAuthController {
      static get UID() {
        return "OAuthController";
      }
    
      constructor($state, svOAuth2) {
        let oAuthVM = this;
        svOAuth2.getAccessToken($state.params.code).then(function () {
          oAuthVM.value = 100;
          $state.go('main.dashboard');
        }, function (failed) {
          oAuthVM.errorMessage = failed.data.error;
        });
      }
    }
    OAuthController.$inject = ['$state', 'svOAuth2']; 
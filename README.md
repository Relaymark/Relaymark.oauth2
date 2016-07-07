#relaymark.oauth2
##Goal
At Relaymark, we are using OAuth2, and we searched a nice angular module which uses the Authorization Code Flow properly. 
Finally we made ours and we decide to provide it to the community ! Yeah !

The module name is : angular.module('YourAwesomeApp', ['relaymark.oauth2'])

##Angular module config
This is a list of configuration which you can override :

    defaults = {
      baseUrl: null,  //required Main path to your server
      clientId: null, //required 
      clientSecret: null, //required
      scope: null, //required
      authorizePath: '/connect/authorize',
      grantPath: '/connect/token',
      revokePath: '/connect/revocation',
      redirectUri: null, //required Callback uri to your app when the user get the Authorization Code (remind to ask for a Token)
      endSession: '/connect/endsession',
      logoutRedirectUri: null 
    };
    
About logoutRedirectUri:
Your auth server will redirect to this url. 
You must add 'openid' in scope. 
Do not forget to add your url in PostLogoutRedirectUris on the client document (stored in your db, we guess).
    
###In ES 6
    config.$inject = ['AppConstants', '$httpProvider', 'svOAuth2Provider'];
    
      export default function config(AppConstants,  $httpProvider, svOAuth2Provider, svOAuthInterceptorProvider) {
      
        svOAuthInterceptorProvider.configure({endpointUrl : AppConstants.ENDPOINT_API}); //If your Api sends you an 400 or 401 See Interceptors
        $httpProvider.interceptors.push('svOAuthInterceptor'); 
        
        svOAuth2Provider.configure({
          baseUrl: AppConstants.ENDPOINT_AUTH,
          clientId: AppConstants.AUTH_CLIENT_ID,
          clientSecret: AppConstants.AUTH_CLIENT_SECRET,
          scope: AppConstants.AUTH_SCOPE,
          redirectUri: AppConstants.AUTH_CALLBACK
        });
      }

###Angular 1.x
    angular
      .module('YourAwesomeApp', ['relaymark.oauth2'])
      .config(function(svOAuth2Provider, AppConstants, $httpProvider) { 
      svOAuthInterceptorProvider.configure({endpointUrl : AppConstants.ENDPOINT_API}); //If your Api sends you an 400 or 401 See Interceptors
      $httpProvider.interceptors.push('svOAuthInterceptor'); 
        svOAuth2Provider.configure({
          baseUrl: AppConstants.ENDPOINT_AUTH,
          clientId: AppConstants.AUTH_CLIENT_ID,
          clientSecret: AppConstants.AUTH_CLIENT_SECRET,
          scope: AppConstants.AUTH_SCOPE,
          redirectUri: AppConstants.AUTH_CALLBACK
        });
      );



##Login controller  
If you have your login page on your OAuth server, It's easy : just ask for the access code   

###Angular 1.x 
    angular.module('YourAwesomeApp')
      .controller('LoginController', function (svOAuth2) {
          svOAuth2.getAccessCode();
        }
      );
 

###In ES 6
    export default
        class LoginController {
          static get UID() {
            return "LoginController";
          }
        
          constructor(svOAuth2) {
            svOAuth2.getAccessCode();
          }
        }
        LoginController.$inject = ['svOAuth2']; 
    

##Callback controller  
When the server send you back to your callback url, ask for an access token :

###Angular 1.x
    angular.module('YourAwesomeApp')
      .controller('CallbackController', function ($state, svOAuth2) {
        svOAuth2.getAccessToken($state.params.code).then(function () {
          $state.go('main');
        }, function (failed) {
          $log.error('failed');
        });
    });

###In ES6
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
  
##Interceptors
svOAuthInterceptor is a service which catch the responses from an url (your api server for instance). 

If the server responds with 400 with the message "invalid_request" or "invalid_grant", it will emit an event "oauth:error" and removes the token.

If the server responds with 401 with the status text "Unauthorized", it will renew the token and retried the call. But if it's failed, it will emit an event "oauth:loginRequired"  

If the server does not respond (status 0 or -1), it will emit an event "oauth:apiOffline".
    
##Rm-login directive 
In case of you want a login button (with inscription and lost password) you can use this directive :

    <rm-login rm-create-account-url="url-to-your-inscription.domain.com"  rm-forgot-password-url="url-to-your-lost-password.domain.com"></rm-login>
    

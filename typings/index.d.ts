// Type definitions for Angular JS 1.5.2+ (relaymark.oauth2 module)
// Project: https://github.com/Relaymark/Relaymark.oauth2
// Definitions by: Relaymark <http://www.relaymark.com/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="globals/angular/index.d.ts" />


declare module 'relaymark.oauth2' {
    export type ISvOAuth2 = angular.relaymark.oauth2.ISvOAuth2;
    export type ISvOAuth2Provider = angular.relaymark.oauth2.ISvOAuth2Provider;
    export type ISvOAuthStorage = angular.relaymark.oauth2.ISvOAuthStorage;
    export type ISvOAuthStorageProvider = angular.relaymark.oauth2.ISvOAuthStorageProvider;
    export type ISvOAuthInterceptor = angular.relaymark.oauth2.ISvOAuthInterceptor;
    export type ISvOAuthInterceptorProvider = angular.relaymark.oauth2.ISvOAuthInterceptorProvider;
    export type ISvQueryStringHelper = angular.relaymark.oauth2.ISvQueryStringHelper;
    export type ISvHttpBuffer = angular.relaymark.oauth2.ISvHttpBuffer;
}

declare namespace angular.relaymark.oauth2{
    interface ISvOAuth2{
        isAuthenticated(): boolean;
        getAccessCode(): void;
        getAccessToken(code: string, options?: angular.IRequestShortcutConfig): angular.IPromise<any>;
        getRefreshToken(): angular.IPromise<any>;
        revokeToken(): angular.IPromise<any>;
    }
    interface IConfigOAuth2{
        baseUrl: string;
        clientId: string;
        clientSecret: string;
        scope: string;
        authorizePath?: string;
        grantPath?: string;
        revokePath?: string;
        redirectUri: string,
        endSession?: string;
        logoutRedirectUri?: string
    }
    interface ISvOAuth2Provider  extends angular.IServiceProvider{
        defaults: IConfigOAuth2;
        requiredKeys: Array<string>;
        configure(params: IConfigOAuth2): IConfigOAuth2;
    }
    interface ISvOAuthStorage{
        applySlidingStorage():void;
        getToken():any;
        setToken(data:any):any;
        getAuthorizationHeader():any;
        getAccessToken():any;
        getTokenType():any;
        getRefreshToken():any;
        removeToken():any;
        removeCode():any;
        setCode(code: string):any;
        getCode():any;
    }
    interface ISvOAuthStorageProvider extends angular.IServiceProvider{
        config: any;
        configure(params:any): any;
    }
    interface ISvOAuthInterceptor{
        request(config: any): any;
        responseError(rejection: any): angular.IPromise<any>;
    }
    interface ISvOAuthInterceptorProvider extends angular.IServiceProvider{
        defaults: any;
        configure(params: any): any;
    }
    interface ISvQueryStringHelper{
        parse(str: string): any;
        stringify(obj: any): string;
    }
    interface ISvHttpBuffer{
        append(config: any, deferred: angular.IDeferred): void;
        rejectAll(reason: string): void;
        retryAll(updater: any): void;
    }
}
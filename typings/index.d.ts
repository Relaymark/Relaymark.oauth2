// Type definitions for Angular JS 1.5.2+ (relaymark.oauth2 module)
// Project: https://github.com/Relaymark/Relaymark.oauth2
// Definitions by: Relaymark <http://www.relaymark.com/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/// <reference path="globals/angular/index.d.ts" />


declare module 'relaymark.oauth2' {
    export type IOAuth2Service = angular.relaymark.oauth2.IOAuth2Service;
    export type IOAuth2ServiceProvider = angular.relaymark.oauth2.IOAuth2ServiceProvider;
    export type IOAuthStorageService = angular.relaymark.oauth2.IOAuthStorageService;
    export type IOAuthStorageServiceProvider = angular.relaymark.oauth2.IOAuthStorageServiceProvider;
    export type IOAuthInterceptor = angular.relaymark.oauth2.IOAuthInterceptor;
    export type IOAuthInterceptorServiceProvider = angular.relaymark.oauth2.IOAuthInterceptorServiceProvider;
    export type IQueryStringHelperService = angular.relaymark.oauth2.IQueryStringHelperService;
    export type IHttpBufferService = angular.relaymark.oauth2.IHttpBufferService;
    export type IConfigOAuth2 = angular.relaymark.oauth2.IConfigOAuth2;
}

declare namespace angular.relaymark.oauth2{
    interface IOAuth2Service{
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
    interface IOAuth2ServiceProvider  extends angular.IServiceProvider{
        defaults: IConfigOAuth2;
        requiredKeys: Array<string>;
        configure(params: IConfigOAuth2): IConfigOAuth2;
    }
    interface IOAuthStorageService{
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
    interface IOAuthStorageServiceProvider extends angular.IServiceProvider{
        config: any;
        configure(params:any): any;
    }
    interface IOAuthInterceptor{
        request(config: any): any;
        responseError(rejection: any): angular.IPromise<any>;
    }
    interface IOAuthInterceptorServiceProvider extends angular.IServiceProvider{
        defaults: any;
        configure(params: any): any;
    }
    interface IQueryStringHelperService{
        parse(str: string): any;
        stringify(obj: any): string;
    }
    interface IHttpBufferService{
        append(config: any, deferred: angular.IDeferred<any>): void;
        rejectAll(reason: string): void;
        retryAll(updater: any): void;
    }
}
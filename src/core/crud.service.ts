/// <reference path="../../typings/tsd.d.ts" />

module app.core {
    'use strict';

    interface iServiceFunction {
        get(string): ng.IHttpPromise<any>;
        set(string, Object): ng.IHttpPromise<any>;
        update(string, Object): ng.IHttpPromise<any>;
        remove(string): ng.IHttpPromise<any>;
    };

    /*@ngInject*/
    class ServiceFunction implements iServiceFunction {
        constructor(private $http, private $q) {}

        get = (url): ng.IHttpPromise<any> => {
            let self = this;
            let deferred = self.$q.defer();

            self.$http.get(url)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        set = (url, data): ng.IHttpPromise<any> => {
            let self = this;
            let deferred = self.$q.defer();

            self.$http.post(url, data)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        update = (url, data): ng.IHttpPromise<any> => {
            let self = this;
            let deferred = self.$q.defer();

            self.$http.put(url, data)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        remove = (url): ng.IHttpPromise<any> => {
            let self = this;
            let deferred = self.$q.defer();

            let req = {
                method: 'DELETE',
                url: url
            };

            self.$http(req)
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }

    angular
        .module('app.core')
        .service('CrudService', ServiceFunction);
};
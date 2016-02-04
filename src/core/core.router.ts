/// <reference path="../../typings/tsd.d.ts" />

module app.core {
    'use strict';

    /* @ngInject */
    class configFunction {
        constructor($locationProvider, $stateProvider, $urlRouterProvider) {
            $locationProvider.html5Mode(true);

            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('dashboard', {
                    url: '/',
                    templateUrl: 'components/dashboard/dashboard.html',
                });
        };
    }

    angular.module('app.core')
        .config(configFunction);
};

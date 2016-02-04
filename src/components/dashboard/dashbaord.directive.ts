/// <reference path="../../../typings/tsd.d.ts" />

module app.dashboard {

    'use strict';


    // ----- directiveFunction -----

    function directiveFunction(): ng.IDirective {

        let directive = {
            restrict: 'E',
            templateUrl: 'components/dashboard/dashboard.html',
            scope: {
            },
            controller: 'DashboardController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----

    interface iControllerfunction {
        getUsers(): void;
    };

    /* @ngInject */
    class ControllerFunction implements iControllerfunction {
        users: Array<any>;

        constructor(private CrudService) {
            this.getUsers();
        };

        getUsers = (): void => {
            let self = this;

            self.CrudService.get('http://api.randomuser.me/?results=6')
                .then(function(data) {
                    self.users = data.results;
                });
        };
    };

    angular.module('app.dashboard')
        .directive('tmplDashboard', directiveFunction)
        .controller('DashboardController', ControllerFunction);

};

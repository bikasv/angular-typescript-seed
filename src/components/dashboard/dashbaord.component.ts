/// <reference path="../../../typings/tsd.d.ts" />

module app.dashboard {

    'use strict';


    // ----- componentOptions -----

    let componentOptions: ng.IComponentOptions = {
        bindings: {},
        templateUrl: 'components/dashboard/dashboard.html',
        controller: 'DashboardController as vm'
    };


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
        .component('tmplDashboard', componentOptions)
        .controller('DashboardController', ControllerFunction);

};

/// <reference path="../../../typings/tsd.d.ts" />

module app.topnav {
    'use strict';


    // ----- directiveFunction -----

    function directiveFunction(): ng.IDirective {

        let directive = {
            restrict: 'E',
            templateUrl: 'components/topnav/topnav.html',
            scope: {
            },
            controller: 'TopnavController',
            controllerAs: 'vm'
        };

        return directive;
    }

    // ----- ControllerFunction -----

    interface iControllerfunction { };

    /* @ngInject */
    class ControllerFunction implements iControllerfunction {
        static $inject = [];

        constructor() {};
    };

    angular
        .module('app.topnav')
        .directive('tmplTopnav', directiveFunction)
        .controller('TopnavController', ControllerFunction);

};

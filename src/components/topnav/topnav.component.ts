/// <reference path="../../../typings/tsd.d.ts" />

module app.topnav {
    'use strict';


    // ----- componentOptions -----

    let componentOptions: ng.IComponentOptions = {
        templateUrl: 'components/topnav/topnav.html',
        controller: 'TopnavController as vm'
    };

    // ----- ControllerFunction -----

    interface iControllerfunction { };

    /* @ngInject */
    class ControllerFunction implements iControllerfunction {
        static $inject = [];

        constructor() {};
    };

    angular
        .module('app.topnav')
        .component('tmplTopnav', componentOptions)
        .controller('TopnavController', ControllerFunction);

};

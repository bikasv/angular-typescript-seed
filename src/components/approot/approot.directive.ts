/// <reference path="../../../typings/tsd.d.ts" />

module app.approot {

    'use strict';

    angular.module('app.approot')
        .directive('tmplApproot', directiveFunction);


    // ----- directiveFunction -----
    function directiveFunction(): ng.IDirective {

        let directive = {
            restrict: 'E',
            templateUrl: 'components/approot/approot.html',
            scope: {
            }
        };

        return directive;
    }

};

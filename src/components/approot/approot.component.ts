/// <reference path="../../../typings/tsd.d.ts" />

module app.approot {

    'use strict';

    // ----- componentOptions -----

    let componentOptions: ng.IComponentOptions = {
        templateUrl: 'components/approot/approot.html'
    };

    angular.module('app.approot')
        .component('tmplApproot', componentOptions);

};

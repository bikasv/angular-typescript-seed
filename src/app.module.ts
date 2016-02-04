/// <reference path="../typings/tsd.d.ts" />

module app {
    'use strict';

    angular.module('app', [
        // Common (everybody has access to these)
        'app.core',

        // Features (listed alphabetically)
        'app.approot',
        'app.dashboard',
        'app.topnav'
    ]);
};

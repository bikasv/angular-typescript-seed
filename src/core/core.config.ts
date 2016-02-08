/// <reference path="../../typings/tsd.d.ts" />

module app.core {
    'use strict';

    // Application configuration values
    let config = {
        appErrorPrefix: '[Angular Template Error] ',
        appTitle: 'Angular Template'
    };

    /* @ngInject */
    class configFunction {
        constructor($compileProvider, $logProvider) {
            // During development, you may want to set debugInfoEnabled to true. This is required for tools like
            // Protractor, Batarang and ng-inspector to work correctly. However do not check in this change.
            // This flag must be set to false in production for a significant performance boost.
            
            $compileProvider.debugInfoEnabled(false);

            // turn debugging off/on (no info or warn)
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(true);
            }
        }
    }

    angular.module('app.core')
        .value('config', config)
        .config(configFunction);
};

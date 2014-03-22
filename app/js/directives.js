define(['angular'], function(angular) {
    'use strict';

  /* Directives */

    angular.module('cvApp.directives', ['cvApp.services'])
        .directive('appVersion', ['version', function(version) {
            return function(scope, elm) {
                elm.text(version);
        };
    }]);
});
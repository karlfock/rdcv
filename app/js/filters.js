define(['angular'], function (angular) {
    'use strict';
  
    angular.module('cvApp.filters', ['cvApp.services'])
        .filter('interpolate', ['version', function(version) {
            return function(text) {
                return String(text).replace(/\%VERSION\%/mg, version);
            };
    }]);
});
define([
    'angular',
    'filters',
    'services',
    'directives',
    'controllers',
    ], function (angular, filters, services, directives, controllers) {
        'use strict';

        // Declare app level module which depends on filters, and services

        return angular.module('cvApp', [
            'cvApp.controllers',
            'cvApp.filters',
            'cvApp.services',
            'cvApp.directives'
        ]);
});
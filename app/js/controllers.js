define(['angular', 'services'], function(angular, services) {
    'use strict';
    angular.module('cvApp.controllers', ['cvApp.services'])

    .controller('CvCtrl', function($scope, $injector, contentService) {
        require(['controllers/cvCtrl'], function(cvCtrl) {
            $injector.invoke(cvCtrl, this, {
                '$scope': $scope,
                'contentService': contentService
            });
        });
    });
});
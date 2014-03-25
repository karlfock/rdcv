define(['angular', 'services'], function(angular) {
    'use strict';
    angular.module('cvApp.controllers', ['cvApp.services'])

    .controller('CvCtrl', function($scope, $injector) {
        require(['controllers/cvCtrl'], function(cvCtrl) {
            $injector.invoke(cvCtrl, this, {
                '$scope': $scope,
            });
        });
    });
});
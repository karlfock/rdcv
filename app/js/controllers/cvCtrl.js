'use strict';

define([], function() {
    return function($scope, contentService) {
        contentService.getProfile().then(function(data) {
            $scope.profile = data;
        });
    };
});
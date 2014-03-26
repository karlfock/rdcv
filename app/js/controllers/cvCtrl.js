'use strict';

define([], function() {
    return function($scope, contentService) {
        
        $scope.sectionCount = 0;

        contentService.getProfile().then(function(data) {
            $scope.profile = data;
        });
    };
});
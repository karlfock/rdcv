"use strict";

define([], function() {
    return function($scope, contentService) {
        $scope.summary = contentService.getSummary();
        $scope.$apply();
    };
});
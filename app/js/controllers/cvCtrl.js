'use strict';

define([], function() {
    // TODO: is return needed ?
    return function($scope, contentService) {
        
        
        contentService.getProfile().then(function(data) {
            $scope.profile = data;
        });

        $scope.selectSection = null;
        $scope.sectionCopy = null;

        $scope.selectSection = function (section) {
            $scope.selectedSection = section;
            $scope.sectionCopy = angular.copy(section);
        };

        $scope.saveSection = function () {
            $scope.selectedSection.text = $scope.sectionCopy.text;

            contentService.updateProfile($scope.profile);
        };
    };
});
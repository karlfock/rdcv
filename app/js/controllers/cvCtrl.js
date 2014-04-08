'use strict';

define([], function() {
    
    return function($scope, contentService) {
        
        
        contentService.getProfile().then(function(data) {
            $scope.profile = data;
        });

        $scope.selectSection = null;
        $scope.sectionCopy = null;

        $scope.selectSection = function (section, index) {
            $scope.selectedSection = section;
            $scope.selectedSectionIndex = index;
            $scope.sectionCopy = angular.copy(section);
        };

        $scope.createSection = function () {
            $scope.profile.sections.push($scope.newSection);
            contentService.updateProfile($scope.profile);
            $scope.newSection = null;
        };

        $scope.updateSection = function () {
            $scope.profile.sections[$scope.selectedSectionIndex] = $scope.sectionCopy;
            contentService.updateProfile($scope.profile);
        };

        $scope.deleteSection = function () {
            $scope.profile.sections.splice($scope.selectedSectionIndex, 1);
            contentService.updateProfile($scope.profile);
            $scope.sectionCopy = null;
            $scope.selectedSectionIndex = -1;
        };
    };
});
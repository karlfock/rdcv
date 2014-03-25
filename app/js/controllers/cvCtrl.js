'use strict';

define([], function() {
    return function($scope, $http) {


        $http({
            method: 'GET',
            url: '/db/profile'
        }).
        success(function(data, status, headers, config) {
            console.log('got profile from db:', data);
            $scope.profile = data;
        }).
        error(function(data, status, headers, config) {});


    };
});
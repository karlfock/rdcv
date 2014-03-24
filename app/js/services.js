define(['angular'], function(angular) {
    'use strict';

    angular.module('cvApp.services', [])

    .service('contentService', function($http) {


        return {
            updateProfile: function(profile) {

                $http.post('/db/profile', profile)
                    .success(function(data, status, headers, config) {})
                        .error(function(data, status, headers, config) {});

            }
        };
    });

});
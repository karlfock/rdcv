define(['angular'], function(angular) {
    'use strict';

    angular.module('cvApp.services', [])

    .service('contentService', function($http, $q) {

        function sendRequest(method, url, data, msgs) {
            var deferred = $q.defer();

            $http({
                method: method,
                url: url,
                data: data
            }).
            success(function(data, status, headers, config) {
                if (msgs.success) {
                    console.log(msgs.success, data);
                }
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                if (msgs.error) {
                    console.log(msgs.error);
                }
                deferred.reject(data);
            });

            return deferred.promise;
        }

        return {
            updateProfile: function(profile) {
                sendRequest('POST', '/db/profile', profile, {
                    success: 'profile updated',
                    error: 'profile update changed'
                });

            },
            getProfile: function() {
                return sendRequest('GET', '/db/profile', null, {
                    success: 'got profile from db',
                    error: 'error getting profile from db'
                });
            }
        };
    });

});
define(["angular"], function(angular) {
    "use strict";

    return angular.module("cvApp.services", [])

    .service("ContentService", function($scope, $injector) {
        require(["services/contentService"], function(contentService) {
            $injector.invoke(contentService, this, {
                "$scope": $scope
            });
        });
    });
});
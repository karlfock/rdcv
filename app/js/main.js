require.config({
    paths: {
        angular: "../../bower_components/angular/angular",
        text: "../../bower_components/requirejs-text/text"
    },
    shim: {
        "angular": {
            "exports": "angular"
        }
    },
    priority: [
        "angular"
    ]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require([
    "angular",
    "app",
    
], function(angular, app) {
    "use strict";
    
    angular.element().ready(function() {
        angular.resumeBootstrap([app.name]);
    });
});
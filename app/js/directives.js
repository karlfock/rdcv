define(['angular', 'services'], function(angular, services) {
    'use strict';

    angular.module('cvApp.directives', ['cvApp.services'])
        .directive('appVersion', ['version',
            function(version) {
                return function(scope, elm) {
                    elm.text(version);
                };
            }
        ])

    .directive('contenteditable', function(contentService) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                // view -> model
                elm.on('blur', function() {
                    var html = elm.html();

                    if (attrs.stripBr && html == '<br>') {
                        html = '';
                    }

                    scope.$apply(function() {
                        ctrl.$setViewValue(html);
                    });

                    contentService.updateProfile(scope.profile);

                });

                // model -> view
                ctrl.$render = function() {
                    elm.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$setViewValue(elm.html());
            }
        };
    });

});
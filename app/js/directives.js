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
                });

                // model -> view
                ctrl.$render = function() {
                    elm.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$setViewValue(elm.html());

                var deepEqual = true;
                scope.$watch('profile', function(newValue, oldValue) {

                    console.log('profile changed:', oldValue, '-->', newValue);

                    // TODO: make sure not updated when undefined or no changes.
                    // persist when value changed
                    contentService.updateProfile(scope.profile);


                }, deepEqual);
            }
        };
    });

});
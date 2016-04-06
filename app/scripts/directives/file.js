angular.module('charttab').directive('file', function() {
    'use strict';
    
    return {
        restrict: 'E',
        template: '<input type="file" />',
        require: 'ngModel',
        replace: true,
        link: function(scope, element, attr, controller) {
            element.bind('change', function() {
                scope.$apply(function() {
                    if (attr.multiple) {
                        controller.$setViewValue(element[0].files);
                    } else {
                        controller.$setViewValue(element[0].files[0]);
                    }
                });
            });
        }
    };
});

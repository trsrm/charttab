'use strict';

angular.module('charttab').directive('chart', function () {
    return {
        templateUrl: '/views/directives/chart.html',
        restrict: 'E',
        scope: {
            data: '='
        }
    };
});

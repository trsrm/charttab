'use strict';

angular.module('charttab').directive('chart',
    function () {
        return {
            templateUrl: '/views/directives/chart.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            controller: function ($scope, $mdDialog) {
                $scope.updateValue = function (event, id) {
                    $mdDialog.show({
                        templateUrl: '/views/update-value.html',
                        controller: 'UpdateValueCtrl',
                        targetEvent: event,
                        focusOnOpen: false,
                        locals: {
                            krIndex: id,
                            result: $scope.data.result,
                            units: $scope.data.units
                        }
                    });
                };
            }
        };
    });

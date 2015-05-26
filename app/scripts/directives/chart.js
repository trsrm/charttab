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

                $scope.updateValue = function (event) {
                    $mdDialog.show({
                        templateUrl: '/views/update-value.html',
                        controller: 'UpdateValueCtrl',
                        targetEvent: event,
                        focusOnOpen: false,
                        locals: {
                            krIndex: $scope.data.id,
                            result: $scope.data.result,
                            units: $scope.data.units
                        }
                    });
                };

                $scope.delete = function (event) {
                    $mdDialog.show({
                        templateUrl: '/views/delete-confirm.html',
                        controller: 'DeleteConfirmCtrl',
                        targetEvent: event,
                        focusOnOpen: false,
                        locals: {
                            krIndex: $scope.data.id,
                            title: $scope.data.title
                        }
                    });
                };
            }
        };
    });

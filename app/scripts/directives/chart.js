'use strict';

angular.module('charttab').directive('chart',
    function () {
        return {
            templateUrl: '/views/directives/chart.html',
            restrict: 'E',
            scope: {
                data: '='
            },
            controller: function ($scope, $mdDialog, moment, config) {

                var updateValueDialog = function (event, result, date) {
                    $mdDialog.show({
                        templateUrl: '/views/update-value.html',
                        controller: 'UpdateValueCtrl',
                        targetEvent: event,
                        focusOnOpen: false,
                        locals: {
                            chartData: $scope.data,
                            date: date,
                            result: result
                        }
                    });
                };

                $scope.updateValue = function (event) {
                    var today = moment().format(config.dateFormat);
                    updateValueDialog(event, $scope.data.result, today);
                };

                $scope.remove = function (event) {
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

                $scope.chartClick = function (elements, event) {
                    if (!elements.length) return;
                    var point = elements[0];
                    var date = moment(point.label, config.dateFormat).subtract(1, 'days').format(config.dateFormat);
                    updateValueDialog(event, point.value, date);
                };
            }
        };
    });

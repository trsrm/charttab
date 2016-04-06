angular.module('charttab').directive('chart', function() {
    'use strict';
    
    return {
        templateUrl: '/views/directives/chart.html',
        restrict: 'E',
        scope: {
            data: '=',
            height: '='
        },
        controller: function($scope, ui, moment, config) {

            var updateValueDialog = function(event, result, date) {
                ui.showDialog(event, '/views/update-value.html', {
                    controller: 'UpdateValueCtrl',
                    locals: {
                        chartData: $scope.data,
                        date: date,
                        result: result
                    }
                });
            };

            $scope.chartClick = function(elements, event) {
                if (!elements.length) {
                    return;
                }
                var point = elements[0];
                var date = moment(point.label, config.dateFormat).subtract(1, 'days').format(config.dateFormat);
                updateValueDialog(event, point.value, date);
            };

            $scope.updateValue = function(event) {
                var today = moment().format(config.dateFormat);
                updateValueDialog(event, $scope.data.result, today);
            };

            $scope.edit = function(event) {
                ui.showDialog(event, '/views/key-result-form.html', {
                    controller: 'KeyResultFormCtrl',
                    locals: {
                        kr: angular.copy($scope.data)
                    }
                });
            };

            $scope.remove = function(event) {
                ui.showDialog(event, '/views/delete-confirm.html', {
                    controller: 'DeleteKrCtrl',
                    locals: {
                        kr: $scope.data
                    }
                });
            };

        }
    };
});

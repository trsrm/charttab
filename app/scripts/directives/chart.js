angular.module('charttab').directive('chart', function () {
    return {
        templateUrl: '/views/directives/chart.html',
        restrict: 'E',
        scope: {
            data: '=',
            height: '='
        },
        controller: function ($scope, ui, moment, config) {

            let updateValueDialog = function (event, result, date) {
                ui.showDialog(event, '/views/update-value.html', {
                    controller: 'UpdateValueCtrl',
                    locals: {
                        chartData: $scope.data,
                        date: date,
                        result: result
                    }
                });
            };

            $scope.chartClick = function (elements, event) {
                if (!elements.length) {
                    return;
                }
                let pointIndex = elements[0]._index;
                let labels = $scope.data.labels;
                let data = $scope.data.data[0];
                let date = moment(labels[pointIndex], config.dateFormat).subtract(1, 'days').format(config.dateFormat);
                updateValueDialog(event, data[pointIndex], date);
            };

            $scope.updateValue = function (event) {
                let today = moment().format(config.dateFormat);
                updateValueDialog(event, $scope.data.result, today);
            };

            $scope.edit = function (event) {
                ui.showDialog(event, '/views/key-result-form.html', {
                    controller: 'KeyResultFormCtrl',
                    locals: {
                        kr: angular.copy($scope.data)
                    }
                });
            };

            $scope.remove = function (event) {
                ui.showDialog(event, '/views/delete-confirm.html', {
                    controller: 'DeleteKrCtrl',
                    locals: {
                        kr: $scope.data
                    }
                });
            };

            $scope.isOutdated = function () {
                let now = moment();
                return moment($scope.data.end, config.dateFormat).isBefore(now)
                       || moment($scope.data.start, config.dateFormat).isAfter(now);
            };

        }
    };
});

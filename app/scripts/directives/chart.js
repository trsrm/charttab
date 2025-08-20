angular.module('charttab').directive('chart', function () {
    return {
        templateUrl: '/views/directives/chart.html',
        restrict: 'E',
        scope: {
            data: '=',
            height: '=',
        },
        controller: function ($scope, ui, moment, config) {

            const updateValueDialog = function (event, result, date) {
                ui.showDialog(event, '/views/dialogs/update-value.html', {
                    controller: 'UpdateValueCtrl',
                    locals: {
                        chartData: $scope.data,
                        date: date,
                        result: result,
                    },
                });
            };

            $scope.chartClick = function (elements, event) {
                if (!elements.length) {
                    return;
                }
                const pointIndex = elements[0]._index;
                const labels = $scope.data.labels;
                const data = $scope.data.data[0];
                const date = moment(labels[pointIndex], config.dateFormat).subtract(1, 'days').format(config.dateFormat);
                updateValueDialog(event, data[pointIndex], date);
            };

            $scope.updateValue = function (event) {
                const today = moment().format(config.dateFormat);
                updateValueDialog(event, $scope.data.result, today);
            };

            $scope.edit = function (event) {
                ui.showDialog(event, '/views/dialogs/key-result-form.html', {
                    controller: 'KeyResultFormCtrl',
                    locals: {
                        kr: angular.copy($scope.data),
                    },
                });
            };

            $scope.remove = function (event) {
                ui.showDialog(event, '/views/dialogs/delete-confirm.html', {
                    controller: 'DeleteKrCtrl',
                    locals: {
                        kr: $scope.data,
                    },
                });
            };

            $scope.isOutdated = function () {
                const now = moment();
                return moment($scope.data.end, config.dateFormat).isBefore(now)
                       || moment($scope.data.start, config.dateFormat).isAfter(now);
            };

        },
    };
});

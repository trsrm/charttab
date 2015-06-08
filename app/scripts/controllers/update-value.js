'use strict';

angular.module('charttab').controller('UpdateValueCtrl',
    function ($scope, $mdDialog, moment, config, krs, chartData, date, result) {

        // pre-fill previous value for a new week:
        var nextMonday = moment().endOf('isoWeek');
        if (moment(date, config.dateFormat).endOf('isoWeek').isSame(nextMonday) && result === 0) {
            result = krs.getLastValue(chartData.results);
        }

        $scope.data = {
            date: date,
            value: result
        };

        $scope.chartData = chartData;

        $scope.dateFormat = config.dateFormat;

        $scope.update = function () {
            krs.updateValue(chartData.id, $scope.data.date, $scope.data.value).then($mdDialog.hide);
        };

        $scope.cancel = $mdDialog.hide;

    });

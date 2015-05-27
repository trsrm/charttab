'use strict';

angular.module('charttab').controller('UpdateValueCtrl',
    function ($scope, $mdDialog, moment, config, krs, chartData, date, result) {

        $scope.data = {
            date: date,
            value: result
        };

        $scope.chartData = chartData;

        $scope.dateFormat = config.dateFormat;

        $scope.add = function () {
            krs.updateValue(chartData.id, $scope.data.date, $scope.data.value).then($mdDialog.hide);
        };

        $scope.cancel = $mdDialog.hide;

    });

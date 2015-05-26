'use strict';

angular.module('charttab').controller('UpdateValueCtrl',
    function ($scope, $mdDialog, moment, config, krIndex, result, units, krs) {

        $scope.data = {
            date: moment().format(config.dateFormat),
            value: result
        };

        $scope.units = units;

        $scope.dateFormat = config.dateFormat;

        $scope.add = function () {
            krs.updateValue(krIndex, $scope.data.date, $scope.data.value).then($mdDialog.hide);
        };

        $scope.cancel = $mdDialog.hide;

    });

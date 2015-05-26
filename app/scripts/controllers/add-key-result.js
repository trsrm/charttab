'use strict';

angular.module('charttab').controller('AddKeyResultCtrl',
    function ($scope, $mdDialog, krs, config) {

        $scope.kr = {};

        $scope.dateFormat = config.dateFormat;

        $scope.add = function () {
            var kr = angular.copy($scope.kr);
            krs.add(kr).then($mdDialog.hide);
        };

        $scope.cancel = $mdDialog.hide;

    });

'use strict';

angular.module('charttab').controller('AddKrCtrl', function ($scope, dialog, krs, config) {

    $scope.kr = {};

    $scope.dateFormat = config.dateFormat;

    $scope.add = function () {
        var kr = angular.copy($scope.kr);
        krs.add(kr).then(dialog.hide);
    };

    $scope.cancel = dialog.hide;

});

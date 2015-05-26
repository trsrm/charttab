'use strict';

angular.module('charttab').controller('DeleteConfirmCtrl',
    function ($scope, $mdDialog, krIndex, title, krs) {

        $scope.title = title;

        $scope.remove = function () {
            krs.remove(krIndex).then($mdDialog.hide);
        };

        $scope.cancel = $mdDialog.hide;

    });

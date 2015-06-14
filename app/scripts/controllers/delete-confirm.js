'use strict';

angular.module('charttab').controller('DeleteConfirmCtrl',
    function ($scope, ui, krIndex, title, krs) {

        $scope.title = title;

        $scope.remove = function () {
            krs.remove(krIndex).then(ui.hideDialog);
        };

        $scope.cancel = ui.hideDialog;

    });

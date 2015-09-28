'use strict';

angular.module('charttab').controller('KeyResultFormCtrl',
    function ($scope, ui, krs, config) {

        if (this.kr) {
            $scope.kr = this.kr;
        } else {
            krs.getDates().then(function (dates) {
                $scope.kr = dates;
                console.log($scope.kr);
            });
        }

        $scope.isEdit = Boolean(this.kr);

        $scope.dateFormat = config.dateFormat;

        $scope.submit = function () {
            var kr = angular.copy($scope.kr);
            if ($scope.isEdit) {
                krs.update(kr.id, kr).then(ui.hideDialog);
            } else {
                krs.add(kr).then(ui.hideDialog);
            }
        };

        $scope.cancel = ui.hideDialog;

    });

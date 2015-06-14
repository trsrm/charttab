'use strict';

angular.module('charttab').controller('KeyResultFormCtrl',
    function ($scope, ui, krs, config, krData) {

        $scope.kr = krData || {};

        $scope.isEdit = Boolean(krData);

        $scope.dateFormat = config.dateFormat;

        $scope.submit = function () {
            var kr = angular.copy($scope.kr);
            var promise;
            if ($scope.isEdit) {
                promise = krs.update(kr.id, kr);
            } else {
                promise = krs.add(kr);
            }
            promise.then(ui.hideDialog);
        };

        $scope.cancel = ui.hideDialog;

    });

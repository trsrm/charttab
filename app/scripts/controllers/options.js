'use strict';

angular.module('charttab').controller('OptionsCtrl',
    function ($scope, $timeout, $mdToast, moment, config, krs) {

        krs.exportData().then(function (dataFile) {
            $scope.exportFile = dataFile;
        });

        $scope.today = moment().format(config.dateFormat);

        $scope.importData = function () {
            krs.importData($scope.importFile).then(function () {
                var toast = $mdToast.simple().content('Charts data has been updated');
                $mdToast.show(toast);
            });
        };

        $scope.openFile = function () {
            $timeout(function() {
                document.querySelector('#file').click();
            }, 0);
        };

    });

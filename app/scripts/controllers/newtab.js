'use strict';

angular.module('charttab').controller('NewTabCtrl',
    function ($scope, $mdDialog, charts) {

        $scope.addKr = function (event) {
            $mdDialog.show({
                templateUrl: '/views/add-key-result.html',
                controller: 'AddKeyResultCtrl',
                targetEvent: event,
                focusOnOpen: false
            });
        };

        charts.getAll().then(function (chartsData) {
            $scope.charts = chartsData;
        });

        chrome.storage.onChanged.addListener(function (changes) {
            if (!changes.krs) return;
            charts.getAll().then(function (chartsData) {
                $scope.charts = chartsData;
            });
        });

    });

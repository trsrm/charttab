'use strict';

angular.module('charttab').controller('NewTabCtrl',
    function ($scope, $mdDialog, charts) {

        $scope.pages = {
            charts: 1,
            bookmarks: 2,
            apps: 3
        };

        $scope.page = $scope.pages.charts;

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
            $scope.ready = true;
        });

        chrome.storage.onChanged.addListener(function () {
            charts.getAll().then(function (chartsData) {
                $scope.charts = chartsData;
            });
        });

    });

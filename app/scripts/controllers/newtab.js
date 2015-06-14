'use strict';

angular.module('charttab').controller('NewTabCtrl',
    function ($scope, ui, charts) {

        $scope.pages = {
            charts: 1,
            bookmarks: 2,
            apps: 3
        };

        $scope.page = $scope.pages.charts;

        $scope.addKr = function (event) {
            ui.showDialog(event, '/views/key-result-form.html', {
                controller: 'KeyResultFormCtrl'
            });
        };

        charts.getAll().then(function (chartsData) {
            $scope.charts = chartsData;
            $scope.ready = true;
        });

        // redraw charts on stored collection changes:
        chrome.storage.onChanged.addListener(function () {
            charts.getAll().then(function (chartsData) {
                $scope.charts = chartsData;
            });
        });

        // set flex and height for charts to best fit the screen:
        $scope.$watch('charts.length', function (chartsNumber) {
            if (!chartsNumber) return;
            $scope.chartHeight = charts.getBestHeight(chartsNumber);
            $scope.chartFlex = charts.getBestFlex(chartsNumber);
        });

    });

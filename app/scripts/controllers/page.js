'use strict';

angular.module('charttab').controller('PageCtrl',
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

    });

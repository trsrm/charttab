'use strict';

angular.module('charttab').controller('NewtabCtrl', function ($scope, dialog, charts) {

    $scope.addKr = function (event) {
        dialog.show('/views/add-kr.html', event);
    };

    charts.getAll().then(function (chartsData) {
        $scope.charts = chartsData;
    });

});

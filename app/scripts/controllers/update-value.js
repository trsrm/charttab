angular.module('charttab').controller('UpdateValueCtrl', function($scope, ui, moment, config, krs) {
    'use strict';

    // pre-fill previous value for a new week:
    var nextMonday = moment().endOf('isoWeek');
    if (moment(this.date, config.dateFormat).endOf('isoWeek').isSame(nextMonday) && this.result === 0) {
        this.result = krs.getLastValue(this.chartData.results);
    }

    $scope.data = {
        date: this.date,
        value: this.result
    };

    $scope.chartData = this.chartData;

    $scope.dateFormat = config.dateFormat;

    $scope.update = function() {
        krs.updateValue($scope.chartData.id, $scope.data.date, $scope.data.value).then(ui.hideDialog);
    };

    $scope.cancel = ui.hideDialog;

});

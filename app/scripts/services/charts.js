'use strict';

angular.module('charttab').service('charts', function ($q, moment, krs, config) {

    var defaultOptions = {
        animation: false,
        scaleOverride: true,
        scaleStepWidth: 1,
        scaleStartValue: 0,
        showScale: false,
        pointDotRadius: 3,
        pointHitDetectionRadius: 3
    };

    /**
     * Returns data for all charts.
     */
    this.getAll = function () {
        var deferred = $q.defer();

        krs.getAll().then(function (krsData) {
            var charts = [];

            krsData.forEach(function (kr) {
                var chart = {
                    title: kr.title,
                    goal: kr.goal + ' ' + kr.units,
                    labels: [],
                    data: [[]],
                    options: angular.extend({
                        scaleSteps: kr.goal,
                        tooltipTemplate: '<%=label%>: <%= value %> ' + kr.units
                    }, defaultOptions)
                };

                kr.results.forEach(function (result) {
                    chart.labels.push(result.day);
                    var resultDay = moment(result.day, config.dateFormat);
                    var nextMonday = moment().add(1, 'weeks').startOf('isoWeek');
                    if (resultDay.isBefore(nextMonday)) {
                        chart.data[0].push(result.value);
                        chart.result = result.value;
                    }
                });

                charts.push(chart);
            });

            deferred.resolve(charts);
        });

        return deferred.promise;
    };

});

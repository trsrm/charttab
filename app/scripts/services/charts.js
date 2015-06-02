'use strict';

angular.module('charttab').service('charts',
    function ($q, moment, krs, config) {

        var defaultOptions = {
            bezierCurve: false,
            animation: false,
            scaleOverride: true,
            scaleStepWidth: 1,
            scaleStartValue: 0,
            showScale: false,
            pointDotRadius: 3,
            pointHitDetectionRadius: 5,
            tooltipFillColor: 'transparent',
            tooltipFontColor: 'transparent'
        };

        /**
         * Returns data for all charts.
         */
        this.getAll = function () {
            var deferred = $q.defer();

            krs.getAll().then(function (krsData) {
                var charts = [];

                angular.forEach(krsData, function (kr, id) {
                    var chart = angular.extend({
                        id: id,
                        labels: [],
                        data: [[]],
                        options: angular.extend({
                            scaleSteps: kr.goal
                        }, defaultOptions)
                    }, kr);

                    kr.results.forEach(function (result) {
                        chart.labels.push(result.day);
                        var resultDay = moment(result.day, config.dateFormat);
                        var nextTuesday = moment().add(1, 'weeks').startOf('isoWeek').add(1, 'days');
                        if (resultDay.isBefore(nextTuesday)) {
                            chart.data[0].push(result.value);
                            chart.result = result.value;
                        }
                    });

                    charts.push(chart);
                });

                charts = charts.sort(function (a, b) {
                    if (a.title.localeCompare(b.title) < 0) return -1;
                    if (a.title.localeCompare(b.title) > 0) return 1;
                    return 0;
                });

                deferred.resolve(charts);
            });

            return deferred.promise;
        };

    });

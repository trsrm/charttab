'use strict';

angular.module('charttab').service('charts',
    function ($q, $window, moment, krs, config) {

        var defaultOptions = {
            animation: false,
            showScale: false,
            scaleOverride: true,
            scaleSteps: 10,
            scaleStartValue: 0,
            maintainAspectRatio: false,
            tooltipFillColor: 'transparent',
            tooltipFontColor: 'transparent',
            bezierCurve: false,
            pointDotRadius: 3,
            pointHitDetectionRadius: 5
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
                            scaleStepWidth: kr.goal / 10
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

        /**
         * Detect best height to fit the screen
         * @param {number} chartsNumber
         * @return {number}
         */
        this.getBestHeight = function (chartsNumber) {
            var window = $window.innerHeight;
            var navbar = 64;
            var heading = 48;
            var spacings = 26;
            var rowsNumber;
            if (chartsNumber < 7) {
                rowsNumber = 2;
            } else if (chartsNumber < 13) {
                rowsNumber = 3;
            } else {
                rowsNumber = 4;
            }
            return Math.floor((window - navbar) / rowsNumber) - heading - spacings;
        };

        /**
         * Detect best flex to fit the screen
         * @param {number} chartsNumber
         * @return {number}
         */
        this.getBestFlex = function (chartsNumber) {
            console.log(chartsNumber);
            if (chartsNumber < 5) {
                return 50;
            } else if (chartsNumber < 10) {
                return 33;
            } else if (chartsNumber < 13) {
                return 25;
            } else {
                return 20;
            }
        };

    });

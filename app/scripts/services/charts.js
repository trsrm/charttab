angular.module('charttab').service('charts', function ($q, $window, moment, krs, config) {
    'use strict';

    var defaultOptions = {
        maintainAspectRatio: false,
        animation: false,
        tooltips: false,
        layout: {
            padding: {
                left: 5,
                bottom: 12
            }
        },
        elements: {
            point: {
                radius: 4,
                hitRadius: 4
            },
            line: {
                tension: 0
            }
        },
        scales: {
            yAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }],
            xAxes: [{
                display: false,
                gridLines: {
                    display: false
                }
            }]
        }
    };

    var overrideOptions = [{
        label: 'Progress'
    }, {
        label: 'Guide',
        borderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 0,
        pointHoverRadius: 0,
        fill: false
    }];

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
                    data: [[], []],
                    override: angular.copy(overrideOptions),
                    options: angular.copy(defaultOptions)
                }, kr);
                chart.options.scales.yAxes[0].ticks = {max: kr.goal};

                kr.results.forEach(function (result, index) {
                    chart.labels.push(result.day);
                    var resultDay = moment(result.day, config.dateFormat);
                    var nextTuesday = moment().add(1, 'weeks').startOf('isoWeek').add(1, 'days');
                    if (resultDay.isBefore(nextTuesday)) {
                        chart.data[0].push(result.value);
                        chart.result = result.value;
                    }
                    chart.data[1].push(kr.goal / kr.results.length * index);
                });

                chart.progress = Math.round(chart.result / chart.goal * 100) + '%';

                charts.push(chart);
            });

            charts = charts.sort(function (a, b) {
                if (a.title.localeCompare(b.title) < 0) {
                    return -1;
                }
                if (a.title.localeCompare(b.title) > 0) {
                    return 1;
                }
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

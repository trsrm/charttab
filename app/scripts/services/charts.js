angular.module('charttab').service('charts', function ($q, $window, moment, krs, config) {
    /**
     * @namespace charts
     */
    const charts = this;

    /**
     * Returns data for all charts.
     * @return {PromiseLike<any>}
     */
    charts.getAll = function () {
        let deferred = $q.defer();

        krs.getAll().then(krsData => {
            let charts = [];

            angular.forEach(krsData, (kr, id) => {
                let chart = angular.extend({
                    id: id,
                    labels: [],
                    data: [[], [], []],
                    override: angular.copy(overrideOptions),
                    options: angular.copy(defaultOptions)
                }, kr);
                chart.options.scales.yAxes[0].ticks = {max: kr.goal};

                let guideStep = kr.goal / kr.results.length;
                let predictionStep;
                kr.results.forEach((result, index) => {
                    chart.labels.push(result.day);
                    let resultDay = moment(result.day, config.dateFormat);
                    let nextTuesday = moment().add(1, 'weeks').startOf('isoWeek').add(1, 'days');
                    if (resultDay.isBefore(nextTuesday)) {
                        chart.data[0].push(result.value);
                        chart.result = result.value;
                        chart.data[2].push(undefined);
                    } else {
                        if (typeof predictionStep === 'undefined') {
                            let lastValue = kr.results[index - 1].value;
                            chart.data[2][index - 1] = lastValue;
                            predictionStep = (lastValue - kr.results[0].value) / (index - 1);
                            predictionStep = Math.max(predictionStep, 0);
                        }
                        chart.data[2].push(chart.data[2][index - 1] + predictionStep);
                    }
                    chart.data[1].push(guideStep * index);
                });

                chart.progress = Math.round(chart.result / chart.goal * 100) + '%';
                // chart.data.push(angular.copy(chart.data[2]));

                charts.push(chart);
            });

            charts = charts.sort((a, b) => {
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
    charts.getBestHeight = function (chartsNumber) {
        let window = $window.innerHeight;
        let navbar = 64;
        let heading = 48;
        let spacings = 26;
        let rowsNumber;
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
    charts.getBestFlex = function (chartsNumber) {
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

    // --------------------------------------------------------------------------------------------

    const defaultOptions = {
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

    const overrideOptions = [{
        label: 'Progress'
    }, {
        label: 'Guide',
        borderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 0,
        pointHoverRadius: 0,
        fill: false
    }, {
        label: 'Prediction',
        borderColor: '#FFCCBC',
        borderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 0,
        pointHoverRadius: 0,
        fill: false
    }];

});

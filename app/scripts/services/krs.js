'use strict';

angular.module('charttab').service('krs', function ($q, moment, config) {

    /**
     * Add new key result.
     * @param {object} kr
     * @return {Promise}
     */
    this.add = function (kr) {
        var deferred = $q.defer();

        this.getAll().then(function (krsData) {
            kr.results = [];

            var start = moment(kr.start, config.dateFormat).add(1, 'weeks').startOf('isoWeek');
            var end = moment(kr.end, config.dateFormat).add(1, 'day');
            while (start.isBefore(end)) {
                kr.results.push({
                    day: start.format(config.dateFormat),
                    value: 0
                });
                start.add(1, 'weeks');
            }

            krsData.push(kr);
            chrome.storage.sync.set({krs: krsData}, deferred.resolve);
        });

        return deferred.promise;
    };

    /**
     * Ket all key results.
     * @return {Promise}
     */
    this.getAll = function () {
        var deferred = $q.defer();

        chrome.storage.sync.get('krs', function (items) {
            var krsData = [];
            if (items.hasOwnProperty('krs')) {
                krsData = items.krs;
            }
            deferred.resolve(krsData);
        });

        return deferred.promise;
    };
});
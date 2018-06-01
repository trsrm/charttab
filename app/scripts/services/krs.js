angular.module('charttab').service('krs', function ($q, moment, config, uid) {
    /**
     * @namespace krs
     */
    const krs = this;

    /**
     * Add new key result.
     * @param {object} data
     * @return {PromiseLike<any>}
     */
    krs.add = function (data) {
        let deferred = $q.defer();

        data.result = getResultsArray(data);

        let item = {};
        item[uid()] = data;
        chrome.storage.sync.set(item, deferred.resolve);

        return deferred.promise;
    };

    /**
     * Get all key results.
     * @return {PromiseLike<any>}
     */
    krs.getAll = function () {
        let deferred = $q.defer();

        chrome.storage.sync.get(null, data => {
            deferred.resolve(data);
        });

        return deferred.promise;
    };

    /**
     * Get key result by ID.
     * @return {PromiseLike<any>}
     */
    krs.getById = function (id) {
        let deferred = $q.defer();

        chrome.storage.sync.get(id, results => {
            if (!results[id]) {
                deferred.reject();
            }

            deferred.resolve(results[id]);
        });

        return deferred.promise;
    };

    /**
     * Update key result data.
     * @param {number} id
     * @param {object} data
     * @return {PromiseLike<any>}
     */
    krs.update = function (id, data) {
        let deferred = $q.defer();

        krs.getById(id).then(kr => {

            kr.title = data.title;
            kr.goal = data.goal;
            kr.units = data.units;

            if (data.start !== kr.start || data.end !== kr.end) {
                let oldResults = kr.results;
                kr.start = data.start;
                kr.end = data.end;
                kr.results = getResultsArray(kr);
                kr.results.forEach(res => {
                    oldResults.forEach(oldRes => {
                        if (res.day === oldRes.day) {
                            res.value = oldRes.value;
                        }
                    })
                });
            }

            let item = {};
            item[id] = kr;
            chrome.storage.sync.set(item, deferred.resolve);
        });

        return deferred.promise;
    };

    /**
     * Delete key result.
     * @param {number} id
     * @return {PromiseLike<any>}
     */
    krs.remove = function (id) {
        let deferred = $q.defer();

        chrome.storage.sync.remove(id, deferred.resolve);

        return deferred.promise;
    };

    /**
     * Update value of key result.
     * @param {number} id
     * @param {string} date
     * @param {number} value
     * @return {PromiseLike<any>}
     */
    krs.updateValue = function (id, date, value) {
        let deferred = $q.defer();

        krs.getById(id).then(kr => {
            let day = moment(date, config.dateFormat).add(1, 'weeks').startOf('isoWeek').format(config.dateFormat);

            for (let i = 0; i < kr.results.length; i++) {
                if (kr.results[i].day === day) {
                    kr.results[i].value = value;
                    kr.lastUpdated = moment().format(config.dateTimeFormat);
                    break;
                }
            }

            let item = {};
            item[id] = kr;
            chrome.storage.sync.set(item, deferred.resolve);
        });

        return deferred.promise;
    };

    /**
     * Get the last value from results.
     * @param {array} results
     * @return {number}
     */
    krs.getLastValue = function (results) {
        for (let i = 0; i < results.length; i++) {
            if (results[i].day === moment().startOf('isoWeek').format(config.dateFormat)) {
                return results[i].value;
            }
        }
        return 0;
    };

    /**
     * Get common dates for KRs.
     * @return {PromiseLike<any>}
     */
    krs.getDates = function () {
        let deferred = $q.defer();

        krs.getAll().then(krs => {
            for (let key in krs) {
                if (krs.hasOwnProperty(key)) {
                    deferred.resolve({start: krs[key].start, end: krs[key].end});
                }
            }
        });

        return deferred.promise;
    };

    // --------------------------------------------------------------------------------------------

    function getResultsArray(kr) {
        let results = [];

        let start = moment(kr.start, config.dateFormat).add(1, 'weeks').startOf('isoWeek');
        let end = moment(kr.end, config.dateFormat).add(6, 'day');
        while (start.isBefore(end)) {
            results.push({
                day: start.format(config.dateFormat),
                value: 0
            });
            start.add(1, 'weeks');
        }

        return results;
    }
});

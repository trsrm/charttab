angular.module('charttab').service('krs', function($q, moment, config, uid) {
    'use strict';
    
    /**
     * Add new key result.
     * @param {object} data
     * @return {Promise}
     */
    this.add = function(data) {
        var deferred = $q.defer();

        data.results = [];

        var start = moment(data.start, config.dateFormat).add(1, 'weeks').startOf('isoWeek');
        var end = moment(data.end, config.dateFormat).add(1, 'day');
        while (start.isBefore(end)) {
            data.results.push({
                day: start.format(config.dateFormat),
                value: 0
            });
            start.add(1, 'weeks');
        }

        var item = {};
        item[uid()] = data;
        chrome.storage.sync.set(item, deferred.resolve);

        return deferred.promise;
    };

    /**
     * Get all key results.
     * @return {Promise}
     */
    this.getAll = function() {
        var deferred = $q.defer();

        chrome.storage.sync.get(null, function(data) {
            deferred.resolve(data);
        });

        return deferred.promise;
    };

    /**
     * Get key result by ID.
     * @return {Promise}
     */
    this.getById = function(id) {
        var deferred = $q.defer();

        chrome.storage.sync.get(id, function(results) {
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
     * @return {Promise}
     */
    this.update = function(id, data) {
        var deferred = $q.defer();

        this.getById(id).then(function(kr) {

            kr.title = data.title;
            kr.goal = data.goal;
            kr.units = data.units;

            var item = {};
            item[id] = kr;
            chrome.storage.sync.set(item, deferred.resolve);
        });

        return deferred.promise;
    };

    /**
     * Delete key result.
     * @param {number} id
     * @return {Promise}
     */
    this.remove = function(id) {
        var deferred = $q.defer();

        chrome.storage.sync.remove(id, deferred.resolve);

        return deferred.promise;
    };

    /**
     * Update value of key result.
     * @param {number} id
     * @param {string} date
     * @param {number} value
     * @return {Promise}
     */
    this.updateValue = function(id, date, value) {
        var deferred = $q.defer();

        this.getById(id).then(function(kr) {
            var day = moment(date, config.dateFormat).add(1, 'weeks').startOf('isoWeek').format(config.dateFormat);

            for (var i = 0; i < kr.results.length; i++) {
                if (kr.results[i].day === day) {
                    kr.results[i].value = value;
                    break;
                }
            }

            var item = {};
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
    this.getLastValue = function(results) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].day === moment().startOf('isoWeek').format(config.dateFormat)) {
                return results[i].value;
            }
        }
        return 0;
    };

    /**
     * Get common dates for KRs.
     * @return {*}
     */
    this.getDates = function() {
        var deferred = $q.defer();

        this.getAll().then(function(krs) {
            for (var key in krs) {
                if (krs.hasOwnProperty(key)) {
                    deferred.resolve({start: krs[key].start, end: krs[key].end});
                }
            }
        });

        return deferred.promise;
    };
});

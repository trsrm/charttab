'use strict';

angular.module('charttab').service('krs',
    function ($q, moment, config) {

        var dataFile = null;

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

        /**
         * Update value of key result.
         * @param {number} krIndex
         * @param {string} date
         * @param {number} value
         */
        this.updateValue = function (krIndex, date, value) {
            var deferred = $q.defer();

            this.getAll().then(function (krsData) {
                var kr = krsData[krIndex];
                if (!kr) deferred.reject();

                var day = moment(date, config.dateFormat).add(1, 'weeks').startOf('isoWeek').format(config.dateFormat);
                for (var i = 0; i < kr.results.length; i++) {
                    if (kr.results[i].day === day) {
                        kr.results[i].value = value;
                        break;
                    }
                }

                chrome.storage.sync.set({krs: krsData}, deferred.resolve);
            });

            return deferred.promise;
        };

        /**
         * Delete key result.
         * @param {number} krIndex
         */
        this.remove = function (krIndex) {
            var deferred = $q.defer();

            this.getAll().then(function (krsData) {
                krsData.splice(krIndex, 1);

                chrome.storage.sync.set({krs: krsData}, deferred.resolve);
            });

            return deferred.promise;
        };

        /**
         * Export key results data to file object.
         */
        this.exportData = function () {
            var deferred = $q.defer();

            this.getAll().then(function (krsData) {
                var data = JSON.stringify(krsData);
                var blob = new Blob([data], {type: 'application/json'});

                if (dataFile !== null) {
                    window.URL.revokeObjectURL(dataFile);
                }

                dataFile = window.URL.createObjectURL(blob);

                deferred.resolve(dataFile);
            });

            return deferred.promise;
        };

        /**
         * Import data from file.
         * @param {File} file
         */
        this.importData = function (file) {
            var deferred = $q.defer();

            if (file.type !== 'application/json') deferred.reject();

            var fileReader = new FileReader();
            fileReader.addEventListener('load', function (event) {
                try {
                    var data = JSON.parse(event.target.result);

                    if (data.length < 1) deferred.reject();
                    if (!data[0].title || !data[0].start || !data[0].end) deferred.reject();

                    chrome.storage.sync.set({krs: data}, deferred.resolve);
                } catch (error) {
                    deferred.reject(error);
                }
            });
            fileReader.readAsText(file);

            return deferred.promise;
        };

    });

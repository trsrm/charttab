'use strict';

angular.module('charttab').service('storage',
    function ($q) {

        var dataFile = null;

        /**
         * Export key results data to file object.
         * @return {Promise}
         */
        this.exportData = function () {
            var deferred = $q.defer();

            chrome.storage.sync.get(null, function (data) {
                var string = JSON.stringify(data);
                var blob = new Blob([string], {type: 'application/json'});

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
         * @return {Promise}
         */
        this.importData = function (file) {
            var deferred = $q.defer();

            if (file.type !== 'application/json') deferred.reject();

            var fileReader = new FileReader();
            fileReader.addEventListener('load', function (event) {
                try {
                    var data = JSON.parse(event.target.result);

                    chrome.storage.sync.clear(function () {
                        chrome.storage.sync.set(data, deferred.resolve);
                    });
                } catch (error) {
                    deferred.reject(error);
                }
            });
            fileReader.readAsText(file);

            return deferred.promise;
        };

    });

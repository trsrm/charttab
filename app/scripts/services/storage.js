angular.module('charttab').service('storage', function ($q, $window, moment, config) {
    /**
     * @namespace storage
     */
    const storage = this;

    /**
     * @type {string|null}
     */
    let dataFile = null;

    /**
     * Export key results data to file object.
     * @return {PromiseLike<any>}
     */
    storage.exportData = function () {
        const deferred = $q.defer();

        chrome.storage.sync.get(null, data => {
            const string = JSON.stringify(data);
            const blob = new Blob([string], {type: 'application/json'});
            const today = moment().format(config.dateFormat);

            if (dataFile !== null) {
                $window.URL.revokeObjectURL(dataFile);
            }
            dataFile = $window.URL.createObjectURL(blob);


            chrome.downloads.download({
                url: dataFile,
                filename: `charttab-backup_${today}.json`,
            });

            deferred.resolve(dataFile);
        });

        return deferred.promise;
    };

    /**
     * Import data from file.
     * @param {File} file
     * @return {PromiseLike<any>}
     */
    storage.importData = function (file) {
        const deferred = $q.defer();

        if (file.type !== 'application/json') {
            deferred.reject();
        }

        const fileReader = new FileReader();
        fileReader.addEventListener('load', event => {
            try {
                const data = JSON.parse(event.target.result);

                chrome.storage.sync.clear(() => {
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

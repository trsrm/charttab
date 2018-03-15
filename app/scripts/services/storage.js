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
        let deferred = $q.defer();

        chrome.storage.sync.get(null, data => {
            let string = JSON.stringify(data);
            let blob = new Blob([string], {type: 'application/json'});
            let today = moment().format(config.dateFormat);

            if (dataFile !== null) {
                $window.URL.revokeObjectURL(dataFile);
            }
            dataFile = $window.URL.createObjectURL(blob);


            chrome.downloads.download({
                url: dataFile,
                filename: `charttab-backup_${today}.json`
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
        let deferred = $q.defer();

        if (file.type !== 'application/json') {
            deferred.reject();
        }

        let fileReader = new FileReader();
        fileReader.addEventListener('load', event => {
            try {
                let data = JSON.parse(event.target.result);

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

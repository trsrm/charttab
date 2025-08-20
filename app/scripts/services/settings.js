angular.module('charttab').service('SettingsService', function ($q) {
    /**
     * @namespace SettingsService
     */
    const SettingsService = this;

    /**
     * Get config.
     * @return {PromiseLike<any>}
     */
    SettingsService.getConfig = function () {
        const deferred = $q.defer();

        chrome.storage.sync.get('chart-config', data => {
            deferred.resolve(data['chart-config']);
        });

        return deferred.promise;
    };

    /**
     * Update config.
     * @param {object} data
     * @return {PromiseLike<any>}
     */
    SettingsService.updateConfig = function (data) {
        const deferred = $q.defer();
        const item = {};
        item['chart-config'] = data;
        chrome.storage.sync.set(item, deferred.resolve);

        return deferred.promise;
    };
});

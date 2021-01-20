angular.module('charttab').service('ConfigService', function ($q) {
    /**
     * @namespace configService
     */
    const configService = this;

    /**
     * Get config.
     * @return {PromiseLike<any>}
     */
    configService.getConfig = function () {
        let deferred = $q.defer();

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
    configService.updateConfig = function (data) {
        let deferred = $q.defer();
        let item = {};
        item['chart-config'] = data;
        chrome.storage.sync.set(item, deferred.resolve);

        return deferred.promise;
    };
});

angular.module('charttab').service('bookmarks', function ($q, $window) {
    /**
     * @namespace bookmarks
     */
    const bookmarks = this;

    /**
     * Get bookmarks root node.
     * @return {PromiseLike<any>}
     */
    bookmarks.getFolder = function () {
        let deferred = $q.defer();

        chrome.bookmarks.search({title: 'ChartTab'}, results => {
            if (results && results[0] && results[0].parentId === '2') {
                deferred.resolve(results[0]);
            } else {
                chrome.bookmarks.create({title: 'ChartTab'}, node => {
                    deferred.resolve(node);
                });
            }
        });

        return deferred.promise;
    };

    /**
     * Add new bookmark.
     * @param {object} data
     * @return {PromiseLike<any>}
     */
    bookmarks.add = function (data) {
        let deferred = $q.defer();

        bookmarks.getFolder().then(folder => {
            data.parentId = folder.id;
            chrome.bookmarks.create(data, deferred.resolve);
        });

        return deferred.promise;
    };

    /**
     * Get all bookmarks.
     * @return {PromiseLike<any>}
     */
    bookmarks.getAll = function () {
        let deferred = $q.defer();

        bookmarks.getFolder().then(folder => {
            chrome.bookmarks.getSubTree(folder.id, subTree => {
                deferred.resolve(subTree[0].children);
            });
        });

        return deferred.promise;
    };

    /**
     * Update bookmark.
     * @param {number} id
     * @param {object} data
     * @return {PromiseLike<any>}
     */
    bookmarks.update = function (id, data) {
        let deferred = $q.defer();

        chrome.bookmarks.update(id, {
            title: data.title,
            url: data.url
        }, deferred.resolve);

        return deferred.promise;
    };

    /**
     * Delete bookmark.
     * @param {number} id
     * @return {PromiseLike<any>}
     */
    bookmarks.remove = function (id) {
        let deferred = $q.defer();

        chrome.bookmarks.remove(id, deferred.resolve);

        return deferred.promise;
    };

    /**
     * Detect best height to fit the screen
     * @param {number} bookmarksNumber
     * @return {number}
     */
    bookmarks.getBestHeight = function (bookmarksNumber) {
        let window = $window.innerHeight;
        let navbar = 64;
        let cardHeading = 44;
        let cardSpacings = 42;
        let rowsNumber;
        if (bookmarksNumber < 7) {
            rowsNumber = 2;
        } else if (bookmarksNumber < 13) {
            rowsNumber = 3;
        } else {
            rowsNumber = 4;
        }
        return Math.floor((window - navbar) / rowsNumber) - cardHeading - cardSpacings;
    };

    /**
     * Detect best flex to fit the screen
     * @param {number} bookmarksNumber
     * @return {number}
     */
    bookmarks.getBestFlex = function (bookmarksNumber) {
        if (bookmarksNumber < 7) {
            return 33;
        } else if (bookmarksNumber < 13) {
            return 25;
        } else {
            return 20;
        }
    };

});

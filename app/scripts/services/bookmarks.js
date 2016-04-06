angular.module('charttab').service('bookmarks', function($q, $window) {
    'use strict';

    /**
     * Get bookmarks root node.
     * @return {Promise}
     */
    this.getFolder = function() {
        var deferred = $q.defer();

        chrome.bookmarks.search({title: 'ChartTab'}, function(results) {
            if (results && results[0] && results[0].parentId === '2') {
                deferred.resolve(results[0]);
            } else {
                chrome.bookmarks.create({title: 'ChartTab'}, function(node) {
                    deferred.resolve(node);
                });
            }
        });

        return deferred.promise;
    };

    /**
     * Add new bookmark.
     * @param {object} data
     * @return {Promise}
     */
    this.add = function(data) {
        var deferred = $q.defer();

        this.getFolder().then(function(folder) {
            data.parentId = folder.id;
            chrome.bookmarks.create(data, deferred.resolve);
        });

        return deferred.promise;
    };

    /**
     * Get all bookmarks.
     * @return {Promise}
     */
    this.getAll = function() {
        var deferred = $q.defer();

        this.getFolder().then(function(folder) {
            chrome.bookmarks.getSubTree(folder.id, function(subTree) {
                deferred.resolve(subTree[0].children);
            });
        });

        return deferred.promise;
    };

    /**
     * Update bookmark.
     * @param {number} id
     * @param {object} data
     * @return {Promise}
     */
    this.update = function(id, data) {
        var deferred = $q.defer();

        chrome.bookmarks.update(id, {
            title: data.title,
            url: data.url
        }, deferred.resolve);

        return deferred.promise;
    };

    /**
     * Delete bookmark.
     * @param {number} id
     * @return {Promise}
     */
    this.remove = function(id) {
        var deferred = $q.defer();

        chrome.bookmarks.remove(id, deferred.resolve);

        return deferred.promise;
    };

    /**
     * Detect best height to fit the screen
     * @param {number} bookmarksNumber
     * @return {number}
     */
    this.getBestHeight = function(bookmarksNumber) {
        var window = $window.innerHeight;
        var navbar = 64;
        var heading = 48;
        var spacings = 28;
        var rowsNumber;
        if (bookmarksNumber < 7) {
            rowsNumber = 2;
        } else if (bookmarksNumber < 13) {
            rowsNumber = 3;
        } else {
            rowsNumber = 4;
        }
        return Math.floor((window - navbar) / rowsNumber) - heading - spacings;
    };

    /**
     * Detect best flex to fit the screen
     * @param {number} bookmarksNumber
     * @return {number}
     */
    this.getBestFlex = function(bookmarksNumber) {
        if (bookmarksNumber < 7) {
            return 33;
        } else if (bookmarksNumber < 13) {
            return 25;
        } else {
            return 20;
        }
    };

});

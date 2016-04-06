angular.module('charttab').controller('NewTabCtrl', function($scope, ui, charts, bookmarks) {
    'use strict';

    $scope.pages = {
        charts: 1,
        bookmarks: 2,
        apps: 3
    };

    // set default page:
    $scope.page = $scope.pages.charts;

    // listen to page change and mark it as not ready:
    $scope.$watch('page', function() {
        $scope.ready = false;
    });

    $scope.addKr = function(event) {
        ui.showDialog(event, '/views/key-result-form.html', {
            controller: 'KeyResultFormCtrl'
        });
    };

    $scope.addBookmark = function(event) {
        ui.showDialog(event, '/views/bookmark-form.html', {
            controller: 'BookmarkFormCtrl'
        });
    };

    var loadCharts = function() {
        $scope.charts = {};
        charts.getAll().then(function(chartsData) {
            $scope.charts = chartsData;
            $scope.chartHeight = charts.getBestHeight(chartsData.length);
            $scope.chartFlex = charts.getBestFlex(chartsData.length);
            $scope.ready = true;
        });
    };

    var loadBookmarks = function() {
        $scope.bookmarks = {};
        bookmarks.getAll().then(function(bookmarksData) {
            $scope.bookmarks = bookmarksData;
            $scope.bookmarkHeight = bookmarks.getBestHeight(bookmarksData.length);
            $scope.bookmarkFlex = bookmarks.getBestFlex(bookmarksData.length);
            $scope.ready = true;
        });
    };

    // redraw charts on stored collection changes:
    chrome.storage.onChanged.addListener(loadCharts);

    // redraw bookmarks on they changed:
    chrome.bookmarks.onCreated.addListener(loadBookmarks);
    chrome.bookmarks.onRemoved.addListener(loadBookmarks);
    chrome.bookmarks.onChanged.addListener(loadBookmarks);
    chrome.bookmarks.onMoved.addListener(loadBookmarks);
    chrome.bookmarks.onChildrenReordered.addListener(loadBookmarks);

    loadCharts();

    loadBookmarks();

});

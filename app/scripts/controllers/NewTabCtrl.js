angular.module('charttab').controller('NewTabCtrl', function ($scope, ui, charts, bookmarks) {
    let vm = this;

    vm.pages = {
        charts: 1,
        bookmarks: 2,
        apps: 3
    };

    // set default page:
    vm.page = vm.pages.charts;

    // listen to page change and mark it as not ready:
    $scope.$watch('page', function () {
        vm.ready = false;
    });

    vm.addKr = function (event) {
        ui.showDialog(event, '/views/key-result-form.html', {
            controller: 'KeyResultFormCtrl'
        });
    };

    vm.addBookmark = function (event) {
        ui.showDialog(event, '/views/bookmark-form.html', {
            controller: 'BookmarkFormCtrl'
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

    // --------------------------------------------------------------------------------------------

    function loadCharts() {
        vm.charts = {};
        charts.getAll().then(chartsData => {
            vm.charts = chartsData;
            vm.chartHeight = charts.getBestHeight(chartsData.length);
            vm.chartFlex = charts.getBestFlex(chartsData.length);
            vm.ready = true;
        });
    }

    function loadBookmarks() {
        vm.bookmarks = {};
        bookmarks.getAll().then(bookmarksData => {
            vm.bookmarks = bookmarksData;
            vm.bookmarkHeight = bookmarks.getBestHeight(bookmarksData.length);
            vm.bookmarkFlex = bookmarks.getBestFlex(bookmarksData.length);
            vm.ready = true;
        });
    }

});

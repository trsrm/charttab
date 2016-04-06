angular.module('charttab').controller('DeleteBookmarkCtrl', function($scope, ui, bookmarks) {
    'use strict';

    $scope.title = this.bookmark.title;

    $scope.id = this.bookmark.id;

    $scope.entity = 'bookmark';

    $scope.remove = function() {
        bookmarks.remove($scope.id).then(ui.hideDialog);
    };

    $scope.cancel = ui.hideDialog;

});

'use strict';

angular.module('charttab').controller('BookmarkFormCtrl',
    function ($scope, ui, bookmarks) {

        $scope.bookmark = this.bookmark || {};

        $scope.isEdit = Boolean(this.bookmark);

        $scope.submit = function () {
            var bookmark = angular.copy($scope.bookmark);
            if ($scope.isEdit) {
                bookmarks.update(bookmark.id, bookmark).then(ui.hideDialog);
            } else {
                bookmarks.add(bookmark).then(ui.hideDialog);
            }
        };

        $scope.cancel = ui.hideDialog;

    });

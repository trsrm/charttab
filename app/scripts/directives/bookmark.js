angular.module('charttab').directive('bookmark', function ($document) {
    return {
        templateUrl: '/views/directives/bookmark.html',
        restrict: 'E',
        scope: {
            data: '=',
            height: '='
        },
        controller: function ($scope, config, ui) {

            $scope.thumbnailStyle = {
                'background-image': 'url(' + config.thumbnailsURL.replace('{{url}}', $scope.data.url) + ')',
                'height': $scope.height + 'px'
            };

            let tmp = $document[0].createElement('a');
            tmp.href = $scope.data.url;
            $scope.host = tmp.hostname;

            $scope.edit = function (event) {
                ui.showDialog(event, '/views/dialogs/bookmark-form.html', {
                    controller: 'BookmarkFormCtrl',
                    locals: {
                        bookmark: angular.copy($scope.data)
                    }
                });
            };

            $scope.remove = function (event) {
                ui.showDialog(event, '/views/dialogs/delete-confirm.html', {
                    controller: 'DeleteBookmarkCtrl',
                    locals: {
                        bookmark: $scope.data
                    }
                });
            };
        }
    };
});

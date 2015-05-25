'use strict';

angular.module('newtab').controller('NewtabCtrl', function ($scope, $mdDialog) {

    $scope.openDialog = function(event) {
        $mdDialog.show({
            templateUrl: '/views/dialog.html',
            targetEvent: event
        });
    };

});

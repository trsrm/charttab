angular.module('charttab').controller('DeleteKrCtrl', function($scope, ui, krs) {
    'use strict';
    
    $scope.title = this.kr.title;

    $scope.id = this.kr.id;

    $scope.entity = 'chart';

    $scope.remove = function() {
        krs.remove($scope.id).then(ui.hideDialog);
    };

    $scope.cancel = ui.hideDialog;

});

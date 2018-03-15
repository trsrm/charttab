angular.module('charttab').controller('OptionsCtrl', function($document, $timeout, $mdToast, storage) {
    let vm = this;

    vm.exportData = function () {
        storage.exportData();
    };

    vm.importData = function() {
        storage.importData(vm.importFile).then(() => {
            let toast = $mdToast.simple().content('Charts data has been updated');
            $mdToast.show(toast);
        });
    };

    vm.openFile = function() {
        $timeout(() => {
            $document[0].querySelector('#file').click();
        }, 0);
    };

});

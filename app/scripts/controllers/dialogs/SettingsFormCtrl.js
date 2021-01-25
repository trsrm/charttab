angular.module('charttab').controller('SettingsFormCtrl', function (
    locals, ui, SettingsService, storage, $timeout, $document
) {
    let vm = angular.extend(this, locals);

    // TODO: need to move in the separate file
    vm.pages = [
        {
            key: 'charts',
            name: 'Charts',
        },
        {
            key: 'bookmarks',
            name: 'Bookmarks',
        },
        {
            key: 'apps',
            name: 'Apps',
        },
    ];

    if (!vm.config) {
        SettingsService.getConfig().then(dates => {
            vm.config = dates;
        });
    }

    vm.submit = function () {
        let config = angular.copy(vm.config);
        SettingsService.updateConfig(config).then(() => {
            chrome.tabs.reload();
            ui.hideDialog;
        });
    };

    vm.exportData = function () {
        storage.exportData();
    };

    vm.importData = function () {
        storage.importData(vm.importFile).then(() => {
            chrome.tabs.reload();
        });
    };

    vm.openFile = function () {
        $timeout(() => {
            $document[0].querySelector('#file').click();
        }, 0);
    };

    vm.cancel = ui.hideDialog;

});

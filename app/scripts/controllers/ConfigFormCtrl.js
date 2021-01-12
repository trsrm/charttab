angular.module('charttab').controller('ConfigFormCtrl', function($scope, ui, ConfigService) {
    let vm = this;

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
        ConfigService.getConfig().then(dates => {
            vm.config = dates;
        });
    }

    vm.submit = function() {
        let config = angular.copy(vm.config);
        ConfigService.updateConfig(config).then(() => {
            chrome.tabs.reload();
            ui.hideDialog;
        });
    };

    vm.cancel = ui.hideDialog;

});

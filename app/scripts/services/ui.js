angular.module('charttab').service('ui', function ($mdDialog) {
    /**
     * @namespace ui
     */
    const ui = this;

    /**
     * Show modal dialog
     * @param {Event} event
     * @param {string} url
     * @param {object} options
     */
    ui.showDialog = function (event, url, options) {
        options = angular.extend({
            templateUrl: url,
            controllerAs: 'vm',
            targetEvent: event,
            focusOnOpen: false,
            bindToController: true
        }, options);
        $mdDialog.show(options);
    };

    /**
     * Hide modal dialog
     */
    ui.hideDialog = $mdDialog.hide;

});

'use strict';

angular.module('charttab').service('dialog', function ($mdDialog) {

    /**
     * Show modal dialog with given template.
     * @param {string} templateUrl
     * @param {Event} event
     */
    this.show = function (templateUrl, event) {
        $mdDialog.show({
            templateUrl: templateUrl,
            targetEvent: event,
            focusOnOpen: false
        });
    };

    /**
     * Close visible modal dialog.
     */
    this.hide = $mdDialog.hide;

});

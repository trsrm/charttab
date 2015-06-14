'use strict';

angular.module('charttab').service('ui',
    function ($mdDialog) {

        /**
         * Show modal dialog
         * @param {Event} event
         * @param {string} url
         * @param {object} options
         */
        this.showDialog = function (event, url, options) {
            options = angular.extend({
                templateUrl: url,
                controller: 'UpdateValueCtrl',
                targetEvent: event,
                focusOnOpen: false
            }, options);
            $mdDialog.show(options);
        };

        /**
         * Hide modal dialog
         */
        this.hideDialog = $mdDialog.hide;

    });

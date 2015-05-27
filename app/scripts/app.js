'use strict';

angular.module('charttab', ['ngMaterial', 'chart.js', 'angularMoment'])

    .config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|chrome-extension|blob):/);
    });

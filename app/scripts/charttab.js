angular.module('charttab',
    [
        'ngMaterial',
        'chart.js',
        'angularMoment'
    ])

    .config(function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|chrome-extension|blob):/);
    })

    .config(function ($mdThemingProvider) {
        $mdThemingProvider.definePalette('primary', {
            '50': 'dfeaf0',
            '100': 'cbdde6',
            '200': 'b9d2de',
            '300': 'a8c6d5',
            '400': '97bbcd',
            '500': '86b0c5',
            '600': '75a4bc',
            '700': '6399b4',
            '800': '528eab',
            '900': '4a7f9a',
            'A100': 'A8E3FF',
            'A200': '77D3FF',
            'A400': '005C89',
            'A700': '00476A',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50', '100', '200', '300', '400']
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('primary')
            .accentPalette('pink', {
                'default': '300'
            });
        $mdThemingProvider.theme('darkMode')
            .primaryPalette('grey', {
                'default': '900'})
            .accentPalette('grey', {
                'default': '400'})
            .dark();
    })

    .config(function ($mdDateLocaleProvider, config) {
        $mdDateLocaleProvider.firstDayOfWeek = 1;

        $mdDateLocaleProvider.parseDate = function (dateString) {
            let m = moment(dateString, config.dateFormat);
            return m.isValid() ? m.toDate() : new Date();
        };

        $mdDateLocaleProvider.formatDate = function (date) {
            let m = moment(date);
            return m.isValid() ? m.format(config.dateFormat) : '';
        };
    });

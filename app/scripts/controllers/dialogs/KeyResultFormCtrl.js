angular.module('charttab').controller('KeyResultFormCtrl', function (
    locals, $scope, ui, krs, config, moment
) {
    let vm = angular.extend(this, locals);

    vm.isEdit = Boolean(vm.kr);

    if (!vm.kr) {
        krs.getDates().then(dates => {
            vm.kr = dates;
        });
    }

    vm.dateFormat = config.dateFormat;

    vm.getDate = function (dateString) {
        return moment(dateString, config.dateFormat).toDate();
    };

    $scope.$watch(() => vm.kr, function () {
        if (vm.kr) {
            vm.minDate = moment(vm.kr.start, config.dateFormat).toDate();
        }
    }, true);

    vm.submit = function () {
        let kr = angular.copy(vm.kr);
        kr.start = moment(vm.kr.start).format(config.dateFormat);
        kr.end = moment(vm.kr.end).format(config.dateFormat);

        if (vm.isEdit) {
            krs.update(kr.id, kr).then(ui.hideDialog);
        } else {
            krs.add(kr).then(ui.hideDialog);
        }
    };

    vm.cancel = ui.hideDialog;

});

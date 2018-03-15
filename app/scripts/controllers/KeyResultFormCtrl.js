angular.module('charttab').controller('KeyResultFormCtrl', function(ui, krs, config) {
    let vm = this;

    vm.isEdit = Boolean(vm.kr);

    if (!vm.kr) {
        krs.getDates().then(dates => {
            vm.kr = dates;
        });
    }

    vm.dateFormat = config.dateFormat;

    vm.submit = function() {
        let kr = angular.copy(vm.kr);
        if (vm.isEdit) {
            krs.update(kr.id, kr).then(ui.hideDialog);
        } else {
            krs.add(kr).then(ui.hideDialog);
        }
    };

    vm.cancel = ui.hideDialog;

});

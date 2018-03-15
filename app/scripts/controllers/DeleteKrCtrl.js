angular.module('charttab').controller('DeleteKrCtrl', function (ui, krs) {
    let vm = this;

    vm.title = vm.kr.title;

    vm.id = vm.kr.id;

    vm.entity = 'chart';

    vm.remove = function () {
        krs.remove(vm.id).then(ui.hideDialog);
    };

    vm.cancel = ui.hideDialog;

});

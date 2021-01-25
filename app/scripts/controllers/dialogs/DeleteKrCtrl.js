angular.module('charttab').controller('DeleteKrCtrl', function (
    locals, ui, krs
) {
    let vm = angular.extend(this, locals);

    vm.title = vm.kr.title;

    vm.id = vm.kr.id;

    vm.entity = 'chart';

    vm.remove = function () {
        krs.remove(vm.id).then(ui.hideDialog);
    };

    vm.cancel = ui.hideDialog;

});

angular.module('charttab').controller('UpdateValueCtrl', function(ui, moment, config, krs) {
    let vm = this;

    // pre-fill previous value for a new week:
    let nextMonday = moment().endOf('isoWeek');
    if (moment(vm.date, config.dateFormat).endOf('isoWeek').isSame(nextMonday) && vm.result === 0) {
        vm.result = krs.getLastValue(vm.chartData.results);
    }

    vm.data = {
        date: vm.date,
        value: vm.result
    };

    vm.dateFormat = config.dateFormat;

    vm.update = function() {
        krs.updateValue(vm.chartData.id, vm.data.date, vm.data.value).then(ui.hideDialog);
    };

    vm.cancel = ui.hideDialog;

});

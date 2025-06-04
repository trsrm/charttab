angular.module('charttab').controller('UpdateValueCtrl', function (
    locals, ui, moment, config, krs
) {
    let vm = angular.extend(this, locals);

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

    vm.minDate = moment(vm.chartData.start, config.dateFormat).startOf('isoWeek').subtract(1, 'days').toDate();

    vm.maxDate = moment(vm.chartData.end, config.dateFormat).endOf('isoWeek').toDate();

    vm.update = function () {
        krs.updateValue(vm.chartData.id, vm.data.date, vm.data.value).then(ui.hideDialog);
    };

    vm.cancel = ui.hideDialog;

});

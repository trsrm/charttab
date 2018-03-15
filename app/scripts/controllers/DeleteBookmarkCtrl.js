angular.module('charttab').controller('DeleteBookmarkCtrl', function (ui, bookmarks) {
    let vm = this;

    vm.title = vm.bookmark.title;

    vm.id = vm.bookmark.id;

    vm.entity = 'bookmark';

    vm.remove = function () {
        bookmarks.remove(vm.id).then(ui.hideDialog);
    };

    vm.cancel = ui.hideDialog;

});

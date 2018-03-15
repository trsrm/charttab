angular.module('charttab').factory('uid', function () {

    function uid() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return function () {
        return uid() + uid();
    };

});

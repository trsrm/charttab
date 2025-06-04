/**
 * Service that returns a function generating a pseudo-random string
 * identifier.
 */
angular.module('charttab').factory('uid', function () {

    function uid() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return function () {
        return uid() + uid();
    };

});

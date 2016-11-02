require('./loginForm');

$(document).ready(function () {
    (function () {
        _.each(arguments, function (mod) {
            instMod = require('./' + mod)();
            instMod.setListeners();
        });
    })('loginForm');
});

require(["libs/zepto/zepto.min.js",
        "libs/modernizr/modernizr.min.js",
        "js/controller/session/session.js",
        "js/controller/login/login.js",
        "libs/md5/md5.js"], function() {

        require(["libs/phelipehs/phelipehs.js"], function(){

            session.loadPageLogin();
        });
});
require(["libs/zepto/zepto.min.js",
        "libs/modernizr/modernizr.min.js",
        "js/controller/session/session.js"], function() {
    
		session.changeUserNames = ['.username'];
        session.changeTimeSessionUsers = ['.timeSession'];

        session.validateSessionRecursive();
});
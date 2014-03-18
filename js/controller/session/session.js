
var session = {
    minutesLeft: 0,
    minuteRecursive: 1,
    minuteExpira: 4,
    changeTimeSessionUsers: [],
    flagChangeUserName: false,
    changeUserNames: [],
    isStorage: function() {

        if (typeof (Storage) != "undefined")
            return true;
        else
            return false;
    },
    isLoginOn: function() {

        if (typeof (localStorage.yourSiteLoginOn) != "undefined")
            if (localStorage.yourSiteLoginOn)
                return true;

        return false;
    },
    calculateTime: function() {

        if (typeof (localStorage.yourSiteSessionDate) != "undefined") {

            var now = new Date();
            var nowD = now.getDate();
            var nowY = now.getFullYear();
            var nowM = now.getMonth();
            var nowH = now.getHours();
            var nowMi = now.getMinutes();

            var past = new Date(localStorage.yourSiteSessionDate);
            var pastD = past.getDate();
            var pastY = past.getFullYear();
            var pastM = past.getMonth();
            var pastH = past.getHours();
            var pastMi = past.getMinutes();

            if (nowD == pastD && nowY == pastY && nowM == pastM && (nowH == pastH || (nowH - 1) == pastH)) {

                var calc = nowMi - pastMi;

                if (calc < 0)
                    calc = (60 - pastMi) + nowMi;

                session.minutesLeft = calc;

                if (calc >= 0 && calc <= session.minuteExpira)
                    return true;
            }
        }

        return false;
    },
    validateSession: function() {

        var array = [session.isStorage, session.isLoginOn, session.calculateTime];

        for (var i = 0; i < array.length; ++i)
            if (!array[i]())
                return false;

        return true;
    },
    logout: function() {

        localStorage.clear();

        window.location = 'index.html';
    },
    validateSessionRecursive: function() {

        if (!session.validateSession()) {

            $("#container").remove();

            if (!session.isLoginOn())
                alert('Bad boy, u can\'t do it! :)');
            else
                alert('Your session has expired!');

            localStorage.clear();

            window.location = 'index.html';
        }

        if(!session.flagChangeUserName){

            session.flagChangeUserName = true;

            for(var i = 0; i < session.changeUserNames.length; ++i)
                $(session.changeUserNames[i]).html(localStorage.yourSiteUserName);
        }

        var stringTime = "minutes";
        if(parseInt(session.minuteExpira - session.minutesLeft) == 0)
            stringTime = "minute";

        for(var i = 0; i < session.changeTimeSessionUsers.length; ++i)
                $(session.changeTimeSessionUsers[i]).html(parseInt(session.minuteExpira - session.minutesLeft) + ' ' + stringTime);

        window.setTimeout("session.validateSessionRecursive()", session.minuteRecursive * 60000);
    },
    initSession: function(username) {

        localStorage.yourSiteUserName = username;
        localStorage.yourSiteLoginOn = true;
        localStorage.yourSiteSessionDate = new Date();

        window.location = 'indexSistema.html';
    },
    loadPageLogin: function() {

        if (session.validateSession())
            window.location = 'indexSistema.html';
    }
};
var userLoginTeste = {
    username: 'teste',
    password: 'aa1bf4646de67fd9086cf6c79007026c'
};

var login = {
    username: '',
    password: '',
    validateServer: function() {

        if(login.username == userLoginTeste.username && md5(login.password) == userLoginTeste.password)
            session.initSession(userLoginTeste.username);
        else
            alert('Username or password incorrect!');
    },
    validateLogin: function() {

        if (login.username.length > 20 || login.password.length > 20)
            return false;

        if (login.username.length == 0 || login.password.length == 0)
            return false;

        return true;
    },
    initLogin: function() {

        login.username = $('#username').val();
        login.password = $('#password').val();

        if (login.validateLogin())
            login.validateServer();
        else
            alert('Username or password incorrect!');

    },
    buildEvents: function() {

        $('.buttonImagem').on(phelipehs.touchOrClick.start, function() {

            login.initLogin();
        });

        if(phelipehs.touchOrClick.start == 'click'){

            $('.buttonImagem').on('keypress', function(e) {

                if (e.which == 13)
                    login.initLogin();
            });
        }
    },
    centerContainer: function() {

        var calc = ($(window).height() - $("#container").height()) / 2;
        $("#container").css('margin-top', calc + 'px');

        $('#container').show();
    },
    init: function(){
        
        login.centerContainer();
        login.buildEvents();
    }
};

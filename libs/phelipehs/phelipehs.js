/** 
 * @fileOverview API phelipehs criada para facilitar desenvolvimento html5, com as principais chamadas de funções. 
 * @author PhelipeHS
 * @version 1.5.2
 */
var phelipehs = {
    /**
     * @argument {maxWidth} int Contém a largura máxima de toda a tela;
     */
    maxWidth: 0,
    /**
     * @argument {maxHeight} int Contém a altura máxima de toda a tela;
     */
    maxHeight: 0,
    /**
     * @argument {hasWebKit} string Se o browser utiliza webkit no CSS. Vai conter nela "-webkit-", é util quando o javascript criar/modificar um container, por exemplo: $(div).css(phelipehs.hasWebKit + 'transform': 'translate3d(10px, 10px, 0px)');
     */
    hasWebKit: "",
    /**
     * @argument {idAnalytics} string Array de IDs do Google Analytics;
     */
    idAnalytics: new Array('UA-44823385-1'),
    /**
     * @argument {siteAnalytics} string variavel opcional para Google Analytics;
     */
    siteAnalytics: "",
    /**
     * @argument {linkToSiteTemporario} string variável temporário utilizada pela API
     */
    linkToSiteTemporario: '',
    /**
     * TouchOrClick é uma variavel que contém filhos que auxiliam na distinção de Touch (mobile) ou Mouse (desktop)
     * Com isto é possível criar funções especificas para, por exemplo, o Click do Mouse ou o Touch do Dedo
     * @argument {start} string Inicia com mousedown (botão do mouse esquerdo pressionado), se for mobile é alterado para touchstart (pressionou o dedo na tela)
     * @argument {move} string Inicia com mousemove (deslocou o mouse sobre a tela), se for mobile é alterado para touchmove (deslocou o dedo pressionando-o sobre a tela)
     * @argument {end} string Inicia com mouseup (dedo do mouse liberado), se for mobile é alterado para touchend (dedo liberado da tela)
     */
    touchOrClick: {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    },
    /**
     * Função utilizada pela API
     */
    init: function() {

        phelipehs.setMaxWidthHeight();
        phelipehs.setTouchOrClick();
        phelipehs.setHasWebKit();
    },
    /**
     * Ajusta o CONTAINER MAIN com a resolução do dispositivo
     * Com isto pode-se trabalhar com layout em pixels (px)
     * @argument {t} int largura da div main. Ex: 768
     * @argument {n} int altura da div main. Ex: 1024
     * @argument {r} string Div Main. Ex: #container / .container.
     * @argument {i} callback nome da função que será chamado ao termino da função
     */
    responsivoCss3Scale: function(t, n, r, i) {
        var s = Math.min(phelipehs.maxWidth / t, phelipehs.maxHeight / n);
        console.log(phelipehs.maxWidth + ' ' + phelipehs.maxHeight + ' ' + t + ' ' + n);
        $(r).css(phelipehs.hasWebKit + "transform", "scale(" + s + ", " + s + ")");
        var o = n - n * s;
        var u = t - t * s;
        $(r).css("top", phelipehs.maxHeight / 2 - n * s / 2 - o / 2 + "px");
        $(r).css("left", phelipehs.maxWidth / 2 - t * s / 2 - u / 2 + "px");
        window.setTimeout(function() {
            $(r).show();
            if (typeof i != "undefined")
                i()
        }, 33)
    },
    /**
     * Ajusta o CONTAINER MAIN com a resolução do dispositivo
     * Com isto as divs filhos devem ser estilizados utilizando PORCENTAGEM
     * @argument {e} int largura inicial da div main. Ex: 768
     * @argument {t} int altura inicial da div main. Ex: 1024
     * @argument {n} string Div Main. Ex: #container / .container.
     * @argument {r} callback nome da função que será chamado ao termino da função
     */
    responsivoComPorcentagem: function(e, t, n, r) {
        var i1 = Math.min(phelipehs.maxWidth / e, phelipehs.maxHeight / t);
        var i = {
            w: e * i1,
            h: t * i1
        };
        $(n).width(parseInt(i.w));
        $(n).height(parseInt(i.h) - 1);
        $(n).css("top", parseInt((phelipehs.maxHeight - i.h) / 2) + "px");
        $(n).css("left", parseInt((phelipehs.maxWidth - i.w) / 2) + "px");
        window.setTimeout(function() {
            $(n).show();
            if (typeof r != "undefined")
                r()
        }, 33)
    },
    gaTrack: function(g, h, i) {
        var c = function(e, j) {
            return e + Math.floor(Math.random() * (j - e))
        };

        var f = 1000000000;
        var k = c(f, 9999999999);
        var a = c(10000000, 99999999);
        var l = c(f, 2147483647);
        var b = new Date().getTime();
        var d = window.location;
        var m = new Image();
        var n = 'http://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn=' + k + '&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn=' + h + '&utmr=' + d + '&utmp=' + i + '&utmac=' + g + '&utmcc=__utma%3D' + a + '.' + l + '.' + b + '.' + b + '.' + b + '.2%3B%2B__utmb%3D' + a + '%3B%2B__utmc%3D' + a + '%3B%2B__utmz%3D' + a + '.' + b + '.2.2.utmccn%3D(referral)%7Cutmcsr%3D' + d.pathname + '%7Cutmcct%3D' + d.pathname + '%7Cutmcmd%3Dreferral%3B%2B__utmv%3D' + a + '.-%3B';
        m.src = n
    },
    /**
     * Função utilizada para contar as impressões (views) da peça no servidor do Google Analytics
     * Resultados produzidos: portrait-impressao (quando estiver na vertical) ou landscape-impressao (quando estiver na horizontal) do dispositivo
     * PS: não esqueça de adicionar o ID da campanha na variavel idAnalytics diferetamente no código ou phelipe.idAnalytics.push('IDAQUI') (se usar o método push cuidado para não duplicar o id)
     */
    googleAnalyticsImpresao: function() {
        if (phelipehs.idAnalytics.length > 0) {
            if (phelipehs.maxHeight > phelipehs.maxWidth) {
                for (var i = 0; i < phelipehs.idAnalytics.length; ++i)
                    phelipehs.gaTrack(phelipehs.idAnalytics[i], phelipehs.siteAnalytics, "portrait-impressao");
            } else {
                for (var i = 0; i < phelipehs.idAnalytics.length; ++i)
                    phelipehs.gaTrack(phelipehs.idAnalytics, phelipehs.siteAnalytics, "landscape-impressao")
            }
        }
    },
    /**
     * Função utilizada para contar algo generico no servidor do Google Analytics que for necessário
     * Como, os exemplos finais gerados: portrait-to-site, portrait-botao, landscape-to-site, landscape-botao, etc...
     * PS: não esqueça de adicionar o ID da campanha do GA na variavel idAnalytics diferetamente no código ou phelipe.idAnalytics.push('IDAQUI') (se usar o método push cuidado para não duplicar o id)
     * @argument {t} string descrição da informação que será mostrada no GA
     */
    googleAnalyticsGenerico: function(t) {
        if (phelipehs.idAnalytics.length > 0) {
            if (phelipehs.maxHeight > phelipehs.maxWidth) {
                for (var i = 0; i < phelipehs.idAnalytics.length; ++i)
                    phelipehs.gaTrack(phelipehs.idAnalytics[i], phelipehs.siteAnalytics, "portrait-" + t);
            } else {
                for (var i = 0; i < phelipehs.idAnalytics.length; ++i)
                    phelipehs.gaTrack(phelipehs.idAnalytics, phelipehs.siteAnalytics, "landscape-" + t)
            }
        }
    },
    /**
     * Função utilizada para contar quantas vezes o usuário acessou uma informação da peça e foi redicionado para uma url
     * Informação gerada no Google Analytics: portrait-press-to-url ou landscape-press-to-url
     * PS: não esqueça de adicionar o ID da campanha do GA na variavel idAnalytics diferetamente no código ou phelipe.idAnalytics.push('IDAQUI') (se usar o método push cuidado para não duplicar o id)
     * @argument {t} string url completa de alguma coisa: site, adserv, etc, que redirecionará o dispositivo
     */
    googleAnalyticsPressToURL: function(t) {
        phelipehs.linkToSiteTemporario = t;
        if (phelipehs.idAnalytics.length > 0) {
            if (phelipehs.maxHeight > phelipehs.maxWidth) {
                for (var i = 0; i < phelipehs.idAnalytics.length; ++i)
                    phelipehs.gaTrack(phelipehs.idAnalytics[i], phelipehs.siteAnalytics, "portrait-press-to-url");
                window.setTimeout(function() {
                    document.location.href = phelipehs.linkToSiteTemporario;
                }, 500);
            } else {
                for (var i = 0; i < phelipehs.idAnalytics.length; ++i)
                    phelipehs.gaTrack(phelipehs.idAnalytics, phelipehs.siteAnalytics, "landscape-press-to-url")
                window.setTimeout(function() {
                    document.location.href = phelipehs.linkToSiteTemporario;
                }, 500);
            }
        }
    },
    /**
     * Normalmente o Adserv da agência conta impressões (views) carregando uma imagem do servidor deles.
     * Esta função auxilia neste processo.
     * 1: normalmente a url da agência tem um argumento chamado timestamp. Serve para não deixa o browser cachear a imagem.
     * 2: Remova o argumento da url e passe para função. A função se encarrega de gerar o timestamp.
     * @argument {a} string url sem o parametro de timestamp
     */
    adservImpressao: function(a) {
        var noCache = new Date().getMilliseconds();
        var img = '<img src="' + a + '&timestamp=' + noCache + '" style="display: none;"/>';
        $('body').append(img);
    },
    setMaxWidthHeight: function() {

        /*
         if (phelipehs.isIOS()) {
         phelipehs.maxWidth = $(window).width();
         phelipehs.maxHeight = $(window).height();
         } else {
         phelipehs.maxWidth = $(document).width();
         phelipehs.maxHeight = $(document).height();
         }
         */

        phelipehs.maxWidth = $(window).width();
        phelipehs.maxHeight = $(window).height();
    },
    setTouchOrClick: function() {
        var t = "ontouchstart" in document.documentElement;
        if (t) {
            phelipehs.touchOrClick.start = "touchstart";
            phelipehs.touchOrClick.move = "touchmove";
            phelipehs.touchOrClick.end = "touchend"
        }
    },
    setHasWebKit: function() {
        var t = "webkitRequestAnimationFrame" in window;
        if (t) {
            phelipehs.hasWebKit = "-webkit-"
        }
    },
    /**
     * Returna TRUE se for IOS
     */
    isIOS: function() {

        return (navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false);
    },
    /**
     * Returna TRUE se for Android
     */
    isAndroid: function() {

        return /mobile|android/i.test(navigator.userAgent);
    },
    /**
     * Returna TRUE se o dispositivo tem tela retina
     */
    isRetina: function() {

        var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                      (min--moz-device-pixel-ratio: 1.5),\
                      (-o-min-device-pixel-ratio: 3/2),\
                      (min-resolution: 1.5dppx)";

        if (window.devicePixelRatio > 1)
            return true;

        if (window.matchMedia && window.matchMedia(mediaQuery).matches)
            return true;

        return false;
    },
    /**
     * Se o dispositivo rotacionar é redirecionado para um arquivo interno na peça
     * Pode ser utilizado para chamar um arquivo main. E este arquivo redicionar para outro que renderiza um layout vertical (portrait) ou horizontal (landscape)
     * PS: De preferencia html
     * @argument {a} string O nome do arquivo "index" ou o caminho até ele mais o seu nome "../pasta/index"
     */
    ativaOnRotation: function(a) {

        $(window).on("orientationchange", function() {
            var e = (new Date).getTime();
            document.location.href = a + ".html?timestamp=" + e
        })
    }
};

phelipehs.init();
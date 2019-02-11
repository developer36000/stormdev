/*Init fp*/
$(document).ready(function () {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    document.addEventListener('contextmenu', function(event){
        event.preventDefault()
    });

    if ($(window).width() < 960) {
        $('.philo_ei_vid > video').remove();
        $('html').addClass('moba');
    }

    if ($(window).width() >= 960) {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');

        $('#fullpage').fullpage({
            normalScrollElements: '.expand .scrollable-element',
            onLeave:              function (origin, destination) {
                if (destination == 4) {
                    videoselect = $('#philo_1').find('video').attr('id');                    
                    accordvid = videojs(videoselect);
                    $('#' + videoselect).attr('loop', '');
                    if(iOS){
                        accordvid.play();
                    } else{
                        accordvid.on('loadeddata', function(){
                            accordvid.play();
                        });
                    }
                }
            },
        });
        $('.scrollable-element').mCustomScrollbar({
                mouseWheel: {scrollAmount: '100px', normalizeDelta: 'false'}, 
                scrollInertia: 0
        });
    }

    if (!$(window).scrollTop()) { //abuse 0 == false :)
        $('html').addClass('topped');
    }
    $(document).on('scroll', function (event) {
        if (!$(window).scrollTop()) { //abuse 0 == false :)
            $('html').addClass('topped');
        } else {
            if ($('html').hasClass('topped')) {
                $('html').removeClass('topped');
            }
        }
    });

});

/*Pageloader*/
function showPage () {
    $('#loader').removeClass('active');
    $('#loader').addClass('animate');
    setTimeout(end, 300);
    checkCookie();
}

function end () {
    $('#loader').removeClass('animate');
    $('body').addClass('loaded');
    $('#loader').addClass('inactive');
}

/*Menu Toggle bei click auf Nav section*/
$(document).ready(function () {
    $('.link').on('click tap', function (event) {
        $('body').removeClass('nav-open');
        $('#menu_toggle').removeClass('menu_open');
    });

    /*Menu Toggle bei click auf menu button*/
    $('#menu_toggle').on('click tap', function (event) {
        if ($('#menu_toggle').hasClass('menu_open')) {
            $('body').removeClass('nav-open');
            $('#menu_toggle').removeClass('menu_open');
        } else {
            $('body').addClass('nav-open');
            $('#menu_toggle').addClass('menu_open');
        }
    });
});

/*Mobile Functions*/
if ($(window).width() < 960) {
    /*Insert here*/
    $(document).ready(function () {
        $('#mobilelogo').on('click tap', function () {
            if ($('body').hasClass('nav-open') !== true) {
                $('html, body').animate({
                    scrollTop: $('#fullpage').offset().top,
                }, 2000);
            }
        });
    });

}

/* DSGVO Cookie */
function checkCookie () {
    var cookieName = 'hasSeenCookieNotice';
    var hasSeenCookieNotice = Cookies.get(cookieName);
    var popup = document.getElementById('cookies');
    if (!hasSeenCookieNotice || hasSeenCookieNotice === undefined) {
        $(popup).addClass('show');
    }

    $('.acceptCookies.accept').on('click', function () {
        Cookies.set(cookieName, true);
        $(popup).removeClass('show');
    });
}
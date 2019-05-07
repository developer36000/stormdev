/*Init fp*/


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
	$(document).find('.accord_open').each(function () {
		var nav = $(this).find('.accordion_nav'),
			nav_el = $(this).find('.accord_button'),
			list = $(this).find('.accord_listing'),
			list_el = list.find('.accord_chooser'),
			active = 1;
		$(this).find('#prevbutton, #nextbutton').click(function () {
			if ( active == list_el.length ) {
				$(this).addClass('icon-prev-inactive');
				console.log( 'icon-prev-inactive');
				active=1;
			} else if ( active != list_el.length ) {
				$('#prevbutton, #nextbutton').removeClass('icon-prev-inactive');
				console.log( 'icon-prev-active');
			}
			active++;
		});
	});
	/* Creative Studios */
	var nav_el = $(document).find('#studios .accord_button'),
        nav_el_active = $(document).find('#studios .accord_button.active_accord_item'),
		active_el = 1;
	$(document).on('click', '#studios #prevbutton', function () {
		console.log(nav_el.length);
		console.log(active_el);
		if ( active_el == nav_el.length ) {
			$(this).addClass('icon-prev-inactive');
			$(this).parent().find('#nextbutton').removeClass('icon-next-inactive');
			active_el=1;
		} else if ( active_el != nav_el.length )  {
			$(this).removeClass('icon-prev-inactive');
			$(this).parent().find('#nextbutton').removeClass('icon-next-inactive');
			active_el++;
		} else  {
			$(this).parent().find('#nextbutton').removeClass('icon-next-inactive');
			$(this).removeClass('icon-prev-inactive');
			active_el++;
		}
		
	});
	$(document).on('click', '#studios #nextbutton', function () {
		console.log(nav_el.length);
		console.log(active_el);
		if ( active_el == nav_el.length ) {
			$(this).addClass('icon-next-inactive');
			$(this).parent().find('#prevbutton').removeClass('icon-prev-inactive');
			active_el=1;
		} else if ( active_el != nav_el.length )  {
			$(this).removeClass('icon-next-inactive');
			$(this).parent().find('#prevbutton').removeClass('icon-prev-inactive');
			active_el++;
		} else  {
			$(this).parent().find('#prevbutton').removeClass('icon-prev-inactive');
			$(this).removeClass('icon-next-inactive');
			active_el++;
		}
	});

	
});

$(document).ready(function () {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    document.addEventListener('contextmenu', function(event){
        event.preventDefault()
    });

    if ($(window).width() < 960) {
	    $('html').addClass('moba');
        $('.philo_ei_vid > video').remove();
      //  $('.philo_ei_vid').remove();
	    $('.philo_ei_vid').each(function () {
            var philo_img = $(this).data('philo_img');
            $(this).find('video').remove();
		    $(this).html('<img class="philo_image" src="'+philo_img+'" alt="Ei-STORMING" title="Ei-STORMING">');
	    });
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



/*Mobile Functions*/
if ($(window).width() < 960) {
    /*Insert here*/
    $(document).ready(function () {
        $('#mobilelogo').on('click tap', function () {
            if ($('body').hasClass('nav-open') !== true) {
                $('html, body').animate({
                    scrollTop: $('#fullpage').offset().top
                }, 2000);
            }
        });
        $('#page-home .video_block > video').hide();
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
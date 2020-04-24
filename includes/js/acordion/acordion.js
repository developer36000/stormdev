/*Studio Chooser Acordion*/
$(document).ready(function() {	
	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

	var count, parentid, videoselect, accordvid;
	/*Close on Buttonclick*/
	$('#accordion_toggle_close').on('click tap', function () {
		/*Dont forget the prev and next button*/
		if($('#creative_studios #nextbutton').hasClass('icon-next-inactive')){
			$('#creative_studios #nextbutton').removeClass('icon-next-inactive')
		} else if ($('#creative_studios #prevbutton').hasClass('icon-prev-inactive')){
			$('#creative_studios #prevbutton').removeClass('icon-prev-inactive')
		}
		$('#creative_studios .active_accord_item').removeClass('active_accord_item');
		$('#creative_studios .accord_open').removeClass('accord_open');
		$('#creative_studios .active_accord').removeClass('active_accord');
		$('body').removeClass('studio_accord_open');
		$('#creative_studios .bp-header__title').text('CREATIVE STUDIOS');
		
	});
	/*Accord Click*/
	$('.accord_chooser').on('click tap', function(event) {
			parentid = $( this ).parents( ".accordion" ).attr("id");
			if( ! $('#' + parentid + '.accordion').hasClass('accord_open') ){
				$('#' + parentid + '.accordion').addClass('accord_open');
				$('body').addClass('studio_accord_open');
			}
			$('#' + parentid + '.accordion li').removeClass('active_accord');
			$(this).addClass('active_accord');
			count = $('#' + parentid + ' .accord_chooser').index(this);
			$('#' + parentid + ' .accord_item_' + count).addClass('active_accord_item');
				
			if(!$('#' + parentid + ' .active_accord').next().hasClass('accord_chooser')){
				$('#' + parentid + ' #nextbutton').addClass('icon-next-inactive');
			}
			
			if(!$('#' + parentid + ' .active_accord').prev().hasClass('accord_chooser')){
				$('#' + parentid + ' #prevbutton').addClass('icon-prev-inactive');
			}
		 
		$(this).parents('.creative_studios').find('.bp-header__title').text('DIE CREATIVE STUDIOS');
			
	});
	/*Next Button*/
	$('.icon-next').on('click tap', function(event) {
		parentid = $( this ).parents( ".accordion" ).attr("id");		
		if($('#' + parentid + ' .active_accord').next().hasClass('accord_chooser')){
			$('#' + parentid + ' .active_accord').addClass('switching');
			$('#' + parentid + ' .active_accord').next().addClass('active_accord');
			$('#' + parentid + ' .switching').removeClass('switching active_accord');
			
			$('#' + parentid + ' .active_accord_item').addClass('active_accord_item_switching');
			$('#' + parentid + ' .active_accord_item').next().addClass('active_accord_item');
			$('#' + parentid + ' .active_accord_item_switching').removeClass('active_accord_item_switching active_accord_item');
			videoselect = ($('#' + parentid + ' .active_accord_item').attr('data-video'));
			$( '#' + videoselect ).attr('loop', '');
			accordvid = videojs( videoselect );
			if(iOS){
				accordvid.play();
			} else{
				accordvid.on('loadeddata', function(){
					accordvid.play();
				});
			}
			if(!$('#' + parentid + ' .active_accord').next().hasClass('accord_chooser')){
				$('#' + parentid + ' #nextbutton').addClass('icon-next-inactive');
			}
			
			if ($('#' + parentid + ' #prevbutton').hasClass('icon-prev-inactive')){
				$('#' + parentid + ' #prevbutton').removeClass('icon-prev-inactive');
			}
		}
	});
	/*Prev Button*/
	$('.icon-prev').on('click tap', function(event) {
		parentid = $( this ).parents( ".accordion" ).attr("id");
		if($('#' + parentid + ' .active_accord').prev().hasClass('accord_chooser')){
			$('#' + parentid + ' .active_accord').addClass('switching');
			$('#' + parentid + ' .active_accord').prev().addClass('active_accord');
			$('#' + parentid + ' .switching').removeClass('switching active_accord');

			$('#' + parentid + ' .active_accord_item').addClass('active_accord_item_switching');
			$('#' + parentid + ' .active_accord_item').prev().addClass('active_accord_item');
			$('#' + parentid + ' .active_accord_item_switching').removeClass('active_accord_item_switching active_accord_item');
			videoselect = ($('#' + parentid + ' .active_accord_item').attr('data-video'));
			$( '#' + videoselect ).attr('loop', '');
			accordvid = videojs( videoselect );
			if(iOS){
				accordvid.play();
			} else{
				accordvid.on('loadeddata', function(){
					accordvid.play();
				});
			}

			if(!$('#' + parentid + ' .active_accord').prev().hasClass('accord_chooser')){
				$('#' + parentid + ' #prevbutton').addClass('icon-prev-inactive');
			}
			
			if ($('#' + parentid + ' #nextbutton').hasClass('icon-next-inactive')){
				$('#' + parentid + ' #nextbutton').removeClass('icon-next-inactive');
			}
		}
	});

	$('.accordion_nav_points div').on('click tap', function(event) {
		parentid = $( this ).parents( ".accordion" ).attr("id");
		count = $('#' + parentid + ' .accordion_nav_points div').index(this);
		
		$('#' + parentid + ' .active_accord').removeClass('active_accord');
		$('#' + parentid + ' .active_accord_item').removeClass('active_accord_item');
		$('#' + parentid + '.accordion ul').children().eq(count).addClass('active_accord');
		$('#' + parentid + ' .accordion_nav_points').children().eq(count).addClass('active_accord_item');
		
		if(!$('#' + parentid + ' .active_accord').next().hasClass('accord_chooser')){
			$('#' + parentid + ' #nextbutton').addClass('icon-next-inactive');
		} else {
			$('#' + parentid + ' #nextbutton').removeClass('icon-next-inactive');
		}
			
		if(!$('#' + parentid + ' .active_accord').prev().hasClass('accord_chooser')){
			$('#' + parentid + ' #prevbutton').addClass('icon-prev-inactive');
		} else {
			$('#' + parentid + ' #prevbutton').removeClass('icon-prev-inactive');
		}
	});
	
	/*Click Button Philosophie*/
	$('.accord_text_button').on('click tap', function(event) {
		parentid = $( this ).parents( ".accord_chooser" ).attr("id");
		if ($('#' + parentid + ' .accord_textholder').hasClass('expand'))	{
			$('#' + parentid + ' .accord_textholder').removeClass('expand');
			$('#' + parentid + ' .philo_vid_button').html('Weiterlesen');
			$('html, body').animate({
				scrollTop: $('#philosophie').offset().top
			}, 800);
		} 		
		else {
			$('#' + parentid + ' .philo_vid_button').html('Schlie&szlig;en');
			$('#' + parentid + ' .accord_textholder').addClass('expand');
		}
	});


	
	$('.accord_tab_button').on('click tap', function(event) {
		videoselect = $( this ).attr('data-video');
		$( '#' + videoselect ).attr('loop', '');
		accordvid = videojs( videoselect );
		if(iOS){
			accordvid.play();
		} else{
			accordvid.on('loadeddata', function(){
				accordvid.play();
			});
		}
	});
});


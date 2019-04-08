/*film init*/
$(document).ready(function() {			
	/*Playbutton*/
	var fullvid, fullscreen, fullvid_ob;
	if ($(window).width() > 960 ) {
		$('.icon-play *').on('click tap', function(event) {
			fullvid_ob = '.full_video_block';
			fullvid = videojs('fullvideo');
			videofunc(fullvid_ob, fullvid);
		});
		
		/*Check if vidoe is still on fullscreen when windows resize*/
		window.onresize = function () {
			if (typeof fullvid !== 'undefined'){
				if (window.innerWidth === screen.width && window.innerHeight === screen.height) {
					if (!fullscreen) {
						fullscreen = true;
						fullvid.play();
					}
				} else {
					if (fullscreen) {
						fullscreen = false;
						fullvid.pause();
						fullvid.currentTime(0);
						$(fullvid_ob).removeClass('active');
						//$('.video_close_button').remove();
					}
				}
			}
		};
		
	} else if ($(window).width() < 960 ) {
		var fullvid_ob_mob = '.video_block.active_mob';
		var fullvid_mob = videojs('show_mobile');
		$('.icon-play *').on('click tap', function(event) {
			
			//$('#show_mobile').play();
			//$(this).fadeOut();
			videofunc_mob(fullvid_ob_mob, fullvid_mob);
		});
		/*Check if vidoe is still on fullscreen when windows resize*/
		window.onresize = function () {
			if (typeof fullvid_mob !== 'undefined'){
				if (window.innerWidth === screen.width && window.innerHeight === screen.height) {
					if (!fullscreen) {
						fullscreen = true;
						fullvid_mob.play();
					}
				} else {
					if (fullscreen) {
						fullscreen = false;
						fullvid_mob.pause();
						fullvid_mob.currentTime(0);
					//	$(fullvid_ob_mob).removeClass('active');
						//$('.video_close_button').remove();
					}
				}
			}
		};
		
		$('.video_block #default').remove();
		$('.full_video_block').remove();
	}
	
	
	
	function videofunc (fullvid_ob, fullvid) {
		$('#page-home .video_block').removeClass('active');
		$(fullvid_ob).addClass('active');
		$(fullvid_ob + ' video').attr('data-keepplaying', '');
		$(fullvid_ob + ' video').attr('controls', '');
		fullvid.requestFullscreen();
		fullvid.play();
		fullvid.ready(function(){
			this.on('ended', function() {
				this.exitFullscreen();
				$(fullvid_ob).removeClass('active');
				//$('#page-home .video_block').addClass('active');
				$('.video_close_button').remove();
			});
			$('.video_close_button').on("click tap", function() {
				fullvid.exitFullscreen();
				//$('#page-home .video_block').addClass('active');
				$(fullvid_ob).removeClass('active');
				$('.video_close_button').remove();
			});
		});
		var xbutton = '<button class="menu-button  video_close_button"></button>';
		$(fullvid_ob).find('#fullvideo').append(xbutton);
	}
	
	function videofunc_mob (fullvid_ob_mob, fullvid_mob) {
		$('#page-home .video_block').removeClass('active');
		$(fullvid_ob_mob).addClass('show_full');
		$(fullvid_ob_mob + ' video').attr('data-keepplaying', '');
		$(fullvid_ob_mob + ' video').attr('controls', '');
		fullvid_mob.requestFullscreen();
		fullvid_mob.play();
		fullvid_mob.ready(function(){
			this.on('ended', function() {
				this.exitFullscreen();
				$(fullvid_ob_mob).removeClass('show_full');
				//$('#page-home .video_block').addClass('active');
				$('.video_close_button').remove();
			});
			$('.video_close_button').on("click tap", function() {
				fullvid_mob.exitFullscreen();
				fullvid_mob.pause();
				//$('#page-home .video_block').addClass('active');
				$(fullvid_ob_mob).removeClass('show_full');
				$('.video_close_button').remove();
			});
		});
		var xbutton = '<button class="menu-button  video_close_button"></button>';
		$(fullvid_ob_mob).find('#show_mobile').append(xbutton);
	}
	

});
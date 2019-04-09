/*film init*/
$(document).ready(function() {
	/*Playbutton*/
	var fullvid, fullscreen, fullvid_ob;
	
	
	
	if ($(window).width() > 960 ) {
		$('.icon-play *').on('click tap', function(event) {
			fullvid_ob = '.full_video_block';
			fullvid = videojs('fullvideo');
			$(fullvid_ob).addClass('show_close');
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
						fullvid.get(0).pause();
						fullvid.currentTime(0);
						$(fullvid_ob).removeClass('active');
						$('.video_close_button').remove();
					}
				}
			}
		};
		
	} else if ($(window).width() < 960 ) {
		var fullvid_ob_mob = '.video_block.active_mob';
		var fullvid_mob = videojs('show_mobile');
		$('.icon-play *').on('click tap', function(event) {
			
			$(fullvid_ob_mob).addClass('show_close');
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
						fullvid_mob.get(0).pause();
						fullvid_mob.currentTime(0);
						$(fullvid_ob_mob).removeClass('show_full');
						//	$(fullvid_ob_mob).removeClass('active');
						$('.video_close_button').remove();
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
				$(fullvid_ob).removeClass('active');
				//$('#page-home .video_block').addClass('active');
				$('.video_close_button').remove();
				$(fullvid_ob).removeClass('show_close');
				this.exitFullscreen();
				this.get(0).pause();
			});
			$('.video_close_button').on("click tap", function() {
				//$('#page-home .video_block').addClass('active');
				$(fullvid_ob).removeClass('active');
				$('.video_close_button').remove();
				$(fullvid_ob).removeClass('show_close');
				fullvid.exitFullscreen();
				fullvid.get(0).pause();
			});
		});
		$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
			console.log(this);
			console.log('----');
			console.log(this['fullscreen']);
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
				$(fullvid_ob_mob).removeClass('show_full');
				$(fullvid_ob_mob + ' video').removeAttr('controls');
				$('.video_close_button').remove();
				$(fullvid_ob_mob).removeClass('show_close');
				this.exitFullscreen();
				this.get(0).pause();
			});
			$('.video_close_button').on("click tap", function() {
				$(fullvid_ob_mob).removeClass('show_full');
				$(fullvid_ob_mob + ' video').removeAttr('controls');
				$('.video_close_button').remove();
				$(fullvid_ob_mob).removeClass('show_close');
				fullvid_mob.exitFullscreen();
				fullvid_mob.get(0).pause();
			});
		});
		$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
			console.log(this);
			console.log('----');
			console.log(this['fullscreen']);
		});
		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
			console.log('iPhone');
		} else {
			var xbutton = '<button class="menu-button  video_close_button"></button>';
			$(fullvid_ob_mob).find('#show_mobile').append(xbutton);
		}
		
	}
	
	
	
});
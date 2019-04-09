/*film init*/
$(document).ready(function() {			
	/*Playbutton*/
	var fullvid, fullscreen, fullvid_ob, fullvid_ob_mob, def;
	
	if ($(window).width() > 960 ) {
		
		$('.icon-play *').on('click tap', function(event) {
			fullvid_ob = '.full_video_block';
			fullvid = videojs('fullvideo');
			def = videojs('default');
			$(fullvid_ob).addClass('show_close');
			videofunc(fullvid_ob, fullvid, def);
		});
		
		/*Check if vidoe is still on fullscreen when windows resize*/
		window.onresize = function () {
			if (typeof fullvid !== 'undefined'){
				if (window.innerWidth === screen.width && window.innerHeight === screen.height) {
					if (!fullscreen) {
						fullscreen = true;
						fullvid.play();
						def.currentTime(0);
						def.pause();
					}
				} else {
					if (fullscreen) {
						fullscreen = false;
						fullvid.currentTime(0);
						fullvid.pause();
						$(fullvid_ob).removeClass('active');
						$('.video_close_button').remove();
						def.play();
					}
				}
			}
		};
		
	} else if ($(window).width() < 960 ) {
		var fullvid_mob = videojs('show_mobile');
		$('.icon-play *').on('click tap', function(event) {
			
			fullvid_ob_mob = '.video_block.active_mob';
			$(fullvid_ob_mob).addClass('show_close');
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
						$(fullvid_ob_mob).removeClass('show_full');
						$('.video_close_button').remove();
						//fullvid_mob.currentTime(0);
						fullvid_mob.get(0).pause();
					}
				}
			}
		};
		
		$('.video_block #default').remove();
		$('.full_video_block').remove();
	}
	
	
	
	function videofunc (fullvid_ob, fullvid, def) {
		$('#page-home .video_block').removeClass('active');
		$(fullvid_ob).addClass('active');
		$(fullvid_ob + ' video').attr('data-keepplaying', '');
		$(fullvid_ob + ' video').attr('controls', '');
		fullvid.requestFullscreen();
		fullvid.play();
		def.currentTime(0);
		def.pause();
		fullvid.ready(function(){
			this.on('ended', function() {
				this.exitFullscreen();
				$(fullvid_ob).removeClass('active');
				$('.video_close_button').remove();
				$(fullvid_ob).removeClass('show_close');
				def.play();
				this.currentTime(0);
				this.pause();
			});
			$('.video_close_button').on("click tap", function() {
				fullvid.exitFullscreen();
				//$('#page-home .video_block').addClass('active');
				$(fullvid_ob).removeClass('active');
				$(fullvid_ob).removeClass('show_close');
				$('.video_close_button').remove();
				def.play();
				fullvid.currentTime(0);
				fullvid.pause();
			});
		});
		var xbutton = '<button class="menu-button  video_close_button"></button>';
		$(fullvid_ob).find('#fullvideo').append(xbutton);
		/*$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
			console.log(this);
			console.log('----');
			console.log(this['fullscreen']);
		});*/
		
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
				$(fullvid_ob_mob + ' video').removeAttr('controls');
				$('.video_close_button').remove();
				$(fullvid_ob_mob).removeClass('show_close');
				//this.currentTime(0);
				this.get(0).pause();
			});
			$('.video_close_button').on("click tap", function() {
				fullvid_mob.exitFullscreen();
				$(fullvid_ob_mob).removeClass('show_full');
				$(fullvid_ob_mob + ' video').removeAttr('controls');
				$('.video_close_button').remove();
				$(fullvid_ob_mob).removeClass('show_close');
				//fullvid_mob.currentTime(0);
				fullvid_mob.get(0).pause();
			});
		});
		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
			
		} else {
			var xbutton = '<button class="menu-button  video_close_button"></button>';
			$(fullvid_ob_mob).find('#show_mobile').append(xbutton);
		}
		
	}
	
	

});
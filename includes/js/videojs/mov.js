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
						fullvid.currentTime(0);
						fullvid.play();
					}
				} else {
					if (fullscreen) {
						fullscreen = false;
						fullvid.pause();
						$(fullvid_ob).removeClass('active');
						$('.video_close_button').remove();
					}
				}
			}
		};
		window.addEventListener('keydown', function(e){
			if((e.key=='Escape'||e.key=='Esc'||e.keyCode==27) && (e.target.nodeName=='BODY')){
				$('.video_close_button').remove();
				$('.full_video_block').removeClass('show_close');
			}
		}, true);
		
		
	} else if ($(window).width() < 960 ) {
		var options = {};
		var fullvid_ob_mob = '.video_block.active_mob';
		var fullvid_mob = videojs('show_mobile', options);
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
						fullvid_mob.currentTime(0);
						fullvid_mob.play();
					}
				} else {
					if (fullscreen) {
						fullscreen = false;
						fullvid_mob.pause();
						$(fullvid_ob_mob).removeClass('show_full');
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
		//$(fullvid_ob + ' video').attr('controls', '');
		fullvid.requestFullscreen();
		fullvid.currentTime(0);
		fullvid.play();
		fullvid.ready(function(){
			this.on('ended', function() {
				$('.video_close_button').remove();
				$(fullvid_ob).removeClass('show_close');
				this.exitFullscreen();
				this.pause();
				$(fullvid_ob).removeClass('active');
			});
			$('.video_close_button').on("click tap", function() {
				$('.video_close_button').remove();
				$(fullvid_ob).removeClass('show_close');
				fullvid.exitFullscreen();
				fullvid.pause();
				$(fullvid_ob).removeClass('active');
				
			});
		});
		
		$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
		//	console.log(this);
		//	console.log('----');
		//	console.log(this['fullscreen']);
		});
		var xbutton = '<button class="menu-button  video_close_button"></button>';
		$(fullvid_ob).find('#fullvideo').append(xbutton);
	}
	
	function videofunc_mob (fullvid_ob_mob, fullvid_mob) {
		$('#page-home .video_block').removeClass('active');
		$(fullvid_ob_mob).addClass('show_full');
		$(fullvid_ob_mob + '> div').removeClass('vjs-controls-disabled').addClass('vjs-controls-enabled');
		$(fullvid_ob_mob + ' video').attr('data-keepplaying', '');
		//$(fullvid_ob_mob + ' video').attr('controls', '');
		fullvid_mob.requestFullscreen();
		fullvid_mob.currentTime(0);
		fullvid_mob.play();
		fullvid_mob.ready(function(){
			this.on('ended', function() {
				this.exitFullscreen();
				this.pause();
				$(fullvid_ob_mob).removeClass('show_full');
			//	$(fullvid_ob_mob + ' video').removeAttr('controls');
				$('.video_close_button').remove();
				$(fullvid_ob_mob).removeClass('show_close');
			});
			$('.video_close_button').on("click tap", function() {
				fullvid_mob.exitFullscreen();
				fullvid_mob.pause();
				$(fullvid_ob_mob).removeClass('show_full');
				//$(fullvid_ob_mob + ' video').removeAttr('controls');
				$('.video_close_button').remove();
				$(fullvid_ob_mob + '> div').removeClass('vjs-controls-enabled').addClass('vjs-controls-disabled');
				$(fullvid_ob_mob).removeClass('show_close');
			});
			
		});
		$(document).on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
				console.log(this['fullscreen']);
				if (this['fullscreen'] == false) {
					fullvid_mob.pause();
					$(fullvid_ob_mob).removeClass('show_full');
					$('.video_close_button').remove();
					$(fullvid_ob_mob + '> div').removeClass('vjs-controls-enabled').addClass('vjs-controls-disabled');
					$(fullvid_ob_mob).removeClass('show_close');
				}
		});
		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
			//console.log('iPhone');
		} else {
			var xbutton = '<button class="menu-button  video_close_button"></button>';
			$(fullvid_ob_mob).find('#show_mobile').append(xbutton);
		}
		
	}
	
	
	
});


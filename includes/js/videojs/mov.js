/*film init*/
$(document).ready(function() {			
	/*Playbutton*/
	var fullvid, fullscreen, fullvid_ob;
	$('.icon-play *').on('click tap', function(event) {	
		fullvid_ob = '.full_video_block';	
		fullvid = videojs('fullvideo');
		videofunc(fullvid_ob, fullvid);
	});
	
	function videofunc (fullvid_ob, fullvid){
		$(fullvid_ob).addClass('active');
		$(fullvid_ob + ' video').attr('data-keepplaying', '');
		$(fullvid_ob + ' video').attr('controls', '');
		fullvid.requestFullscreen();
		fullvid.play();
		fullvid.ready(function(){
			this.on('ended', function() {
				this.exitFullscreen();
				$(fullvid_ob).removeClass('active');
				$('.video_close_button').remove();
			});
			$('.video_close_button').on("click tap", function() {
				fullvid.exitFullscreen();
				$(fullvid_ob).removeClass('active');
				$('.video_close_button').remove();
			});
		});
		var xbutton = '<button class="menu-button  video_close_button"></button>';
		$('.full_video_block.active #fullvideo').append(xbutton);
	}
	
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
					$('.video_close_button').remove();
				}
			}
		}
	};	
});
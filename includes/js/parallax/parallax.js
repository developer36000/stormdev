/*Parallax on mousemove*/
$(document).ready(function() {	
	$( "#geschaeft" ).mousemove(function( event ) {
		var height, width, accelX, accelY, topDistance, leftDistance, depth, i, layer, layers, len, movementY, movementX, topDistance, translate3d;
		height = $( "#geschaeft" ).height();
		width = $( "#geschaeft" ).width();
		if( event.pageX > (width / 2) ){
			accelX = event.pageX / (width / 2);
		} else {
			accelX = ( 1 - ( event.pageX / (width / 2) ) ) + 1 ;
		}
		if( event.pageY > (height / 2) ){
			accelY =  event.pageY / (height / 2);
		} else {
			accelY = ( 1 - ( event.pageY / (height / 2) ) ) + 1 ;
		}
		topDistance =  (( event.pageY /** accelY */ ) - ( height / 2)) / 10;
		leftDistance =  (( event.pageX /** accelX */ ) - ( width / 2 )) / 10;
		
		layers = document.querySelectorAll("[data-type='parallax']");
		for (i = 0, len = layers.length; i < len; i++) {
			layer = layers[i];
			depth = layer.getAttribute('data-depth');
			movementY = (topDistance * depth);
			movementX = (leftDistance * depth );
			translate3d = 'translate3d( '+ movementX +'px, ' + movementY + 'px, 0)';
			layer.style['-webkit-transform'] = translate3d;
			layer.style['-moz-transform'] = translate3d;
			layer.style['-ms-transform'] = translate3d;
			layer.style['-o-transform'] = translate3d;
			layer.style.transform = translate3d;
		}
	});
});
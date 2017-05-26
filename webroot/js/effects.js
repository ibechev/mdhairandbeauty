$(document).ready(function() {

	//**********************************
	// Adding / Removing animation class
	$.fn.extend({
		animateCss: function(animationName) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.css('display', 'block');
			this.addClass('animated ' + animationName).one(animationEnd, function() {
				$(this).removeClass('animated ' + animationName);
			});
		}
	});
		
	//**********************************

	$(window).scroll(function() {

		//************************** 
		// Show Scroll to top arrow

		var scrollTopBtn = $('#scroller-top');

		if ($(this).scrollTop() > 350) {
			scrollTopBtn.fadeIn();
		} else {
			scrollTopBtn.fadeOut();
		}

		//**************************

	});

})
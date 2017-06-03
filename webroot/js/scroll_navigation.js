$(document).ready(function() {

	// Contact page, Scroll on click over the form circle
	$('#form-circle').click(function(event) {
		event.preventDefault();
		
		var target = $('#contact-form').offset();
		var scroll = target.top - 100;
		$('html, body').stop().animate({scrollTop: scroll}, 800, 'swing');
		return false;	
	}); 

	$('#scroller-top').click(function() {
		//document.querySelector('header').scrollIntoView({ behavior: 'smooth' });
		$('body').transition({y: 500}, 700, 'ease');
	});

});
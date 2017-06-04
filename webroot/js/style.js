// Set min height for the HOME section
var setHomeHeight = function() {	
	var docHeight = $(window).height();
	$('section.home').css('height', docHeight + 'px');
	$('section.index:not(home)').css('min-height', docHeight + 'px');
}

var logoCenterVert = function() {
	//  Set the Logo on the Home page to be vertically centered
	var logoHome = $('section.home').find('div.logo-wrapper');
	logoHome.css('margin', ($(window).height() / 2) - ((logoHome.height() + 30) / 2) + 'px 0px');
}


$(document).ready(function() {

	setHomeHeight();

	// Set min height for the HOME section, when orientation change
	$(window).on('orientationchange', function() {
		setHomeHeight();
		logoCenterVert();
	});



	// Set all backgrounds to inherit full heigth from the parent element
	$('.background').each(function() {
		$(this).css('min-height', $(this).parent().height());
	});


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

});
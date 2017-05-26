$(document).ready(function() {

	// Set min height for the main sections
	var docHeight = $(window).height();
	$('section.index').css('min-height', docHeight + 'px');

	// Set all backgrounds to inherit full heigth from the parent element
	$('.background').each(function() {
		$(this).css('min-height', $(this).parent().height());
	});

	//  Set the Logo on the Home page to be vertically centered
	var logoHome = $('section.home').find('div.logo-wrapper');
	logoHome.css('margin', (docHeight / 2) - ((logoHome.height() + 30) / 2) + 'px 0px');

	// On orientation change, the home page resizes to the size of the screen

});
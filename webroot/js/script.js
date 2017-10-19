var bxSlider = require('bxSlider');

/*
//=================================
// Find spesific page section
//=================================
// not in use
function findPageSection(url) {
	var path = url.split('/')[url.split('/').length - 1];
	var pageSection = path.indexOf('#') > 0 ? path.substring(path.indexOf('#') + 1, path.length) : false;
	return pageSection ? jumpTo(pageSection) : false;
}


//=================================
// Go to spesific page section
//=================================
// not in use
function jumpTo(pageSection) {
	var section = $('.' + pageSection);
	//$('html, body').animate({scrollTop: section.offset().top}, 800);

	return false;
}
*/

//=================================
// Loading Screen
//=================================

$(window).on('load', function(){
	setTimeout(function removeLoader(){
		// fadeOut complete. Remove the loading div
		$('.loader').fadeOut(400, function() {
			$( ".loader" ).remove(); //makes page more lightweight
		});
	}, 800); //wait for page load PLUS 0.8s.
});


//============================================
// Set min height for the Home - Logo and Loading div, Home-slanted backgrounds
//============================================
function setHomeHeight() {
	var docHeight = $(window).height();


	$('section.index:not(home)').css('min-height', docHeight + 'px');


	// Set height for the Loading div element
	$('.loader').css('height', docHeight + 'px');
}

//==========================================================
//  Set Landing for Logo and Text on the home page
//==========================================================
function homeLogoParallax() {

	$('.home-logo .logo').removeClass('hide').addClass('show');
};

$(document).ready(function() {

	setTimeout(homeLogoParallax, 2000);

	setHomeHeight();

	$('.bxslider').bxSlider();

	//=============================================================
	// Set min height for the HOME section, when orientation change
	//=============================================================
	$(window).on('orientationchange', function() {
		setHomeHeight();
	});

	//============
	// Back to top
	//============
	$('#scroller-top').on('click', function(){
		$('html, body').animate({scrollTop: '0px'}, 800);
		return false;
	});


	$(window).scroll(function()	{

		/*
		var wScroll = $(this).scrollTop();

		$('.home-logo').css({
			'transition': 'unset',
			'transform': 'translate(0px, '+ wScroll / 4.5 +'%)'
		});

		$('.home-text').css({
			//'transition': 'unset',
			'transform': 'translate(0px, '+ wScroll / 5.2 +'%)'
		});
		*/



		// Check if the device is a mobile devices
		//if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {

			//============
			// Back to top
			//============
			if ($(this).scrollTop() > 300) {
				$('#scroller-top').css({
					'bottom': '25px'
				});
			} else {
				$('#scroller-top').css({
					'bottom': '-100px'
				});
			}
		//};
	});
});

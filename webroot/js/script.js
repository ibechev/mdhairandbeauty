
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
// Set min height for the Home - Logo and Loading div, Home-slanter backgrounds
//============================================
function setHomeHeight() {	
	var docHeight = $(window).height();

	$('div.home-face').css('height', docHeight + 'px');
	$('section.index:not(home)').css('min-height', docHeight + 'px');

	// Set background of the home page - fase to inherit full heigth from the parent element
	//$('.bg-home-face').css('height', docHeight + 'px');

	// Set height for the Loading div element
	$('.loader').css('height', docHeight + 'px');

	// Set height for the Home top slanter background element
	//$('.slanted-bg-home-top').css('height', docHeight + 'px');
}

/*
//==========================================================
//  Set the Logo on the Home page to be vertically centered
//==========================================================
function logoCenterVert() {
	var logoHome = $('section.home').find('div.logo-wrapper');
	logoHome.css('margin', ($(window).height() / 2) - ((logoHome.height() + 30) / 2) + 'px 0px');
}
*/

//==========================================================
//  Set Landing for Logo and Text on the home page 
//==========================================================
function homeLogoParallax() {
	$('.logo').css({'opacity' : 1});	
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
			if ($(this).scrollTop() > 100) {
				$('#scroller-top').css({
					'bottom': '65px'
				});
			} else {
				$('#scroller-top').css({
					'bottom': '-100px'
				});
			}
		//};
	});
});
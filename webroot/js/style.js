
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
	}, 800); //wait for page load PLUS 0.6s.
});


//============================================
// Set min height for the Home - Logo and Loading div section
//============================================
function setHomeHeight() {	
	var docHeight = $(window).height();

	$('div.home-face').css('height', docHeight + 'px');
	$('section.index:not(home)').css('min-height', docHeight + 'px');

	// Set background of the home page - fase to inherit full heigth from the parent element
	$('.bg-home-face').css('height', docHeight + 'px');

	// Set height for the Loading div element
	$('.loader').css('height', docHeight + 'px');
}

//==========================================================
//  Set the Logo on the Home page to be vertically centered
//==========================================================
function logoCenterVert() {
	var logoHome = $('section.home').find('div.logo-wrapper');
	logoHome.css('margin', ($(window).height() / 2) - ((logoHome.height() + 30) / 2) + 'px 0px');
}

//==========================================================
//  Set Landing for Logo and Text on the home page 
//==========================================================
function homeLogoParallax() {
	$('.home-logo').css({'opacity' : 0.9});	
};

$(document).ready(function() {

	setTimeout(homeLogoParallax, 1000);

	setHomeHeight();

	//=============================================================
	// Set min height for the HOME section, when orientation change
	//=============================================================
	$(window).on('orientationchange', function() {
		setHomeHeight();
		logoCenterVert();
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
					'bottom': '30px'
				});
			} else {
				$('#scroller-top').css({
					'bottom': '-100px'
				});
			}
		//};
	});
});
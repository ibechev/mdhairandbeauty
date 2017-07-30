//=================================
// Loading Screen
//=================================
/*
$(window).on('load', function(){
	setTimeout(function removeLoader(){
		
		
		// fadeOut complete. Remove the loading div
		$('.loader').fadeOut(400, function() {
			$( ".loader" ).remove(); //makes page more lightweight
		}); 
	}, 400); //wait for page load PLUS two seconds.
});
*/

//============================================
// Set min height for the Home - Logo and Loading div section
//============================================
var setHomeHeight = function() {	
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
var logoCenterVert = function() {
	var logoHome = $('section.home').find('div.logo-wrapper');
	logoHome.css('margin', ($(window).height() / 2) - ((logoHome.height() + 30) / 2) + 'px 0px');
}

//==========================================================
//  Set Landing for Logo and Text on the home page 
//==========================================================
function homeLogoParallax() {
	$('.home-logo').css({'opacity' : 0.9});	
};

function homeTextParallax() {
	$('.home-text .text-wrap p').each(function(i) {
		setTimeout(function() {
			$('.home-text .text-wrap p').eq(i).addClass('landing');
		}, 40 * ((i+1) * 5));
	});
};




$(document).ready(function() {

	setTimeout(homeLogoParallax, 1000);
	setTimeout(homeTextParallax, 2000);

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
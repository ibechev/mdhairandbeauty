// Set min height for the HOME - Logo section
var setHomeHeight = function() {	
	var docHeight = $(window).height();

	$('div.home-face').css('height', docHeight + 'px');
	$('section.index:not(home)').css('min-height', docHeight + 'px');

	// Set background of the hme page - fase to inherit full heigth from the parent element
	$('.bg-home-face').css('height', docHeight + 'px');
}

//  Set the Logo on the Home page to be vertically centered
var logoCenterVert = function() {
	var logoHome = $('section.home').find('div.logo-wrapper');
	logoHome.css('margin', ($(window).height() / 2) - ((logoHome.height() + 30) / 2) + 'px 0px');
}

function homeLogoParallax() {
	$('.home-logo').css({'opacity' : 0.9});	
};

function homeTextParallax() {
	$('.home-text .text-wrap p').each(function(i) {
		setTimeout(function() {
			$('.home-text .text-wrap p').eq(i).addClass('landing');
		}, 40 * ((i+1) * 3));
	});
};


$(document).ready(function() {

	setTimeout(homeLogoParallax, 350);
	setTimeout(homeTextParallax, 1100);
	setHomeHeight();

	// Set min height for the HOME section, when orientation change
	$(window).on('orientationchange', function() {
		setHomeHeight();
		logoCenterVert();
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
		if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {	

			// Show Scroll to top arrow
			var scrollTopBtn = $('#scroller-top');
			if ($(this).scrollTop() > 350) {
				scrollTopBtn.fadeIn();
			} else {
				scrollTopBtn.fadeOut();
			}
		};
	});
});
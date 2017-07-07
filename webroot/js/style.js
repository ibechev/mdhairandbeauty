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

function homeLogoParallax() {
	$('.home-logo').css({'transform' : 'translateY(0px)', 'opacity' : 0.8});	
};

function homeTextParallax() {
	$('.home-text .centerVH p').each(function(i) {
		setTimeout(function() {
			$('.home-text .centerVH p').eq(i).addClass('landing');
		}, 170 * (i+1));
	});
};


$(document).ready(function() {

	setTimeout(homeLogoParallax, 350);
	setTimeout(homeTextParallax, 550);
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

	$(window).scroll(function()	{
		
		var wScroll = $(this).scrollTop();

		$('.home-logo').css({
			'transition': 'unset',
			'transform': 'translate(0px, '+ wScroll / 4.5 +'%)'
		});

		$('.home-text').css({
			//'transition': 'unset',
			'transform': 'translate(0px, '+ wScroll / 5.2 +'%)'
		});



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
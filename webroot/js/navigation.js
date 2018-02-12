'use strict';
var transit = require('jquery.transit');


//=======================
// Menu - Navigation code
//=======================

var nav = {
	fixedBar			: $('header'),
	menu					: $('.menu-wrap'),
	menuCurtain		: $('.menu-curtain'),
	screenStyle		: null, // The current style of device
	root					: $('html, body'),
	screenModes		: ['mobile', 'desktop'], // possible values of screen mode

	// Menu button element
	barTop				: $('header').find('.bar-1'),
	barMiddle			: $('header').find('.bar-2'),
	barBottom			: $('header').find('.bar-3'),

	init: function() {
		this.btnClick.listen();
		this.resize.init();
	},

	screenMode: {	// Sets and checks in what currens style is the menu ( mobile or desktop )
		get() {
			return nav.screenStyle;
		},
		set(mode) {
			if ($.inArray(mode, nav.screenModes) != -1) {	// Check if the mode is valid
				nav.screenStyle = mode;
			} else {
				console.log('Screen mode is not valid!');
			}
		}
	},

	btnClick: {	// Button click object

		// Do something when a button is clicked
		listen() {
			$('#open-menu').click(function() {
				nav.animation.showMenu();
			});

			$('#close-menu').click(function() {
				nav.animation.hideMenu();
			});

			 document.getElementById('menu-Curtain').onclick = () => {
				 nav.animation.hideMenu();
			 }
		}
	},

	resize: {
		listen() {	// Listen for any kind of resizing
			$(window).on('resize', function() {
				switch(window.innerWidth < 768) {
					// Mobile menu
					case true:
						if (nav.screenMode.get() === 'desktop') {
							nav.resize.setInitPosMob();
						}
					break;

					// Desktop menu
					case false:
						if (nav.screenMode.get() === 'mobile') {
							nav.resize.setInitPosDesk();
						}
					break;
				}
			});
		},

		init() {
			if (nav.getViewportSize().width < 768) {
				this.setInitPosMob();
			} else {
				this.setInitPosDesk();
			}

			this.listen();
		},

		setInitPosMob() {
		// Set the default position and dimentions of the mobile menu (when closed)

			nav.menu
				.css('right', '-' + nav.menu.outerWidth() + 'px')
				.css('height', '100vh');

			// Add 'overflow: scroll' to the menu only if the devise is mobile
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent && nav.getViewportSize().width < 768)) {
				nav.menu.css('overflow-y', 'scroll');
			}

			nav.screenMode.set('mobile');
		},

		setInitPosDesk() { // Default position for desktop
			nav.menu
				.css('opacity', 1)
				.css('height', '50px')
				.css('right', '0');
			nav.menuCurtain
				.css('opacity', 'o')
				.css('visibility', 'hidden');
			$('html, body').css({'overflow': 'auto'});

			nav.screenMode.set('desktop');
		}
	},

	animation: {	// Menu and menu button animation
		slideSpeed: 300,

		showMenu: function() {
			nav.resize.setInitPosMob();
			nav.menu.animate({opacity: '0.95'}, 1);
			nav.menu.animate({right: 0}, this.slideSpeed, function() {
				// some callback
			});
			nav.menuCurtain.css({'visibility': 'visible'}).animate({opacity: .75}, this.slideSpeed);
			$('html, body').css({
				'overflow-x': 'hidden',
				'overflow-y': 'hidden'
			});
		},

		hideMenu: function(href) {
			nav.menu.animate({right: '-' + nav.menu.outerWidth() + 'px'}, this.slideSpeed, function() {
				nav.menu.animate({opacity: '0'}, 1);
			});
			nav.menuCurtain.animate({opacity: 0}, this.slideSpeed, () => {
				nav.menuCurtain.css({'visibility': 'hidden'});
			});
			$('html, body').css({'overflow': 'auto'});
		},

		// // Animate the trigger button
		// 	btnSpeed: 250,
		// 	// Menu opened - showing X
		// 	menuTriggerOpened: function() {
		// 		nav.barTop.transition({y: 9, x: 2.5, rotate: 45, width: 30}, this.btnSpeed);
		// 		nav.barMiddle.transition({x: 3, rotate: 45, width: 30}, this.btnSpeed);
		// 		nav.barBottom.transition({y: -9, x: 2.5, rotate: -45, width: 30}, this.btnSpeed);
		// 	},
    //
		// 	// Menu closed - showing 3 horizontal bars
		// 	menuTriggerClosed: function(href) {
		// 		nav.barTop.transition({y: 0, x: 0, width: 35, rotate: 0}, this.btnSpeed);
		// 		nav.barMiddle.transition({x: 0, width: 35, rotate: 0}, this.btnSpeed);
		// 		nav.barBottom.transition({y: 0, x: 0, width: 35, rotate: 0}, this.btnSpeed,
		// 			// Loading the selected page after the last animation has completed
		// 			function(href) {
		// 				if (href) {window.location = href;}
		// 			});
		// 	},

			// Menu trigger in default position ( no animation )
			// menuTriggerDefault: function() {
			// 	nav.barTop.css({y: 0, x: 0, width: 35, rotate: 0});
			// 	nav.barMiddle.css({x: 0, width: 35, rotate: 0});
			// 	nav.barBottom.css({y: 0, x: 0, width: 35, rotate: 0});
			// }
	},

	checkAnimQ: function() {	// Check if all animations have complete ( queue is empty )
		console.log(nav.menu);
		if (this.menu.queue().length == 0 && this.fixedBar.queue().length == 0 && $('.menu-ul li').queue().length == 0) {
			return true;
		} else {
			return false;
		}
	},

	//	Get the viewport size. Tested on IE4+, Firefox, Chrome, Safari, Opera.
	getViewportSize: function(){
		let my_width, my_height;
	    if (typeof(window.innerWidth) == 'number') {
	        my_width = window.innerWidth;
	        my_height = window.innerHeight;
	    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
	        my_width = document.documentElement.clientWidth;
	        my_height = document.documentElement.clientHeight;
	    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
	        my_width = document.body.clientWidth;
	        my_height = document.body.clientHeight;
	    }
	    return {width: my_width, height: my_height};
	}
}

$(document).ready(function() {

	//=============================
	// Initialize navigation object
	//=============================

	nav.init();

});

export default nav;

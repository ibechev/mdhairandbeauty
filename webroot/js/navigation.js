var nav = {
	menu			: $('ul.menu-ul'),
	fixedBar		: $('div.fixed-bar'),
	opened			: false, // Whether the menu is opened or closed
	screenStyle		: null, // The current style of device 
	root			: $('html, body'),
	screenModes		: ['mobile', 'desktop'], // possible values of screen mode
	// Manu button element
	barTop		: $('div.fixed-bar').find('.bar-1'),
	barMiddle	: $('div.fixed-bar').find('.bar-2'),
	barBottom	: $('div.fixed-bar').find('.bar-3'),
	init: function() {
		this.btnClick.listen();
		this.resize.init();
	},
	screenMode: {	// Sets and checks in what currens style is the menu ( mobile or desktop )
		get: function() {
			return nav.screenStyle;
		}, 
		set: function(mode) {
			if ($.inArray(mode, nav.screenModes) != -1) {	// Check if the mode is valid
				nav.screenStyle = nav.screenModes;
			} else {
				console.log('Screen mode is not valid!');
			}
		}
	},
	btnClick: {	// Button click object
		listen: function() {	// Do something when a button is clicked
			$('#menu-trigger').click(function() {	// Triggering menu
				if (nav.checkAnimQ() === true) {	
					if (nav.opened === false) {
						nav.animation.showMenu();
					} else {
						nav.animation.hideMenu();
					}
				}
			});
			$('.go-to-page').click(function () {	//  Going to page
				nav.btnClick.goToPage($(this).attr('id'));
			});
		},
		goToPage: function(page) {
			if (window.innerWidth < 768) {
				nav.animation.hideMenu();
			}
			var target = $('section.' + page);
			nav.root.stop().animate({scrollTop: $('section.' + page).offset().top}, 800, 'swing');
			return false;
		}	
	},
	resize: {
		listen: function() {	// Listen for any kind of resizing
			$(window).resize(function() {
				if (nav.getViewportSize().width < 768 && nav.screenMode.get() === 'desktop') {  
					// create function to check the current device and store it in var
					nav.resize.setInitPosMob();
					nav.animation.menuTriggerDefault();
				} else if (window.innerWidth >= 768) {
					nav.resize.setInitPosDesk();
				}
			});
			$(window).on('orientationchange', function() {
				nav.resize.orientationChange();
				nav.centerVert();
			})
		},
		init: function() {
			if (nav.getViewportSize().width < 768) {
				this.setInitPosMob();
			} else {
				this.setInitPosDesk();
			}
			this.listen();
		},
		orientationChange: function() {
				nav.menu.css('height', (nav.getViewportSize().height - nav.fixedBar.innerHeight()) + 'px');
		},
		setInitPosMob: function() {	// Set the default position and and dimentions on page load
			// Set the height and position of the drop menu to the height of the screen minus height of the fixed bar 
			if (nav.getViewportSize().width < 768) {	// For screen width 768 or less
				nav.menu.css('height', (nav.getScreenSize() - nav.fixedBar.innerHeight()) + 'px').css('top', (nav.menu.innerHeight() * -1) + 'px');
				// Add 'overflow: scroll' to the menu only if the devise is mobile
				if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
					nav.menu.css('overflow-y', 'scroll');
				}
				nav.centerVert();
				nav.screenMode.set('mobile');
			}
		},
		setInitPosDesk: function() { // Default position for desktop
			nav.menu	.css('top', 0)
							.css('height', '60px')
							.css('opacity', 1);
			nav.fixedBar.css('opacity', 0.7);

			if (nav.getViewportSize().width >= 768 && nav.getViewportSize().width < 1025) {
				nav.menu.css('padding', '0 20px 0 0');
			} else if (nav.getViewportSize().width >= 1025) {
				nav.menu.css('padding', '0 50px 0 0');
			}
			nav.opened = false;
			nav.screenMode.set('desktop');
		}
	},
	animation: {	// Menu and menu button animation
		slideSpeed: 300,
		showMenu: function() {
			nav.resize.setInitPosMob();
			nav.fixedBar.animate({opacity: '1'}, 1);
			nav.menu.animate({opacity: '0.9'}, 1);
			nav.menu.animate({top: nav.fixedBar.innerHeight()}, this.slideSpeed, function() {
				nav.animation.menuTriggerOpened();
			});
			nav.opened = true;
		},
		hideMenu: function() {
			nav.menu.animate({top: '-' + nav.menu.innerHeight()}, this.slideSpeed, function() {
				nav.menu.animate({opacity: '0'}, 1);
				nav.animation.menuTriggerClosed();
			});
			nav.fixedBar.animate({opacity: '0.7'}, 200);
			nav.opened = false;
		},
		// Animate the trigger button
			btnSpeed: 250,	
			// Menu opened - showing X
			menuTriggerOpened: function() {
				nav.barTop.transition({y: 9, x: 2.5, rotate: 45, width: 30}, this.btnSpeed);
				nav.barMiddle.transition({x: 3, rotate: 45, width: 30}, this.btnSpeed);
				nav.barBottom.transition({y: -9, x: 2.5, rotate: -45, width: 30}, this.btnSpeed);
			},
			// Menu closed - showing 3 horizontal bars
			menuTriggerClosed: function() {
				nav.barTop.transition({y: 0, x: 0, width: 35, rotate: 0}, this.btnSpeed);
				nav.barMiddle.transition({x: 0, width: 35, rotate: 0}, this.btnSpeed);
				nav.barBottom.transition({y: 0, x: 0, width: 35, rotate: 0}, this.btnSpeed);
			},
			// Menu trigger in default position ( no animation )
			menuTriggerDefault: function() {
				nav.barTop.css({y: 0, x: 0, width: 35, rotate: 0});
				nav.barMiddle.css({x: 0, width: 35, rotate: 0});
				nav.barBottom.css({y: 0, x: 0, width: 35, rotate: 0});
			}
	},
	checkAnimQ: function() {	// Check if all animations have complete ( queue is empty )
		if (this.menu.queue().length == 0 && this.fixedBar.queue().length == 0 && $('.menu-ul li').queue().length == 0) {
			return true;
		} else {
			return false;
		}
	},
	centerVert: function() {
		// Center the list items vertically	
 		var countMenuItems = this.menu.find('li:even').length;
		var menuItemsHeight = this.menu.find('li:first').innerHeight() * countMenuItems;
		if (nav.getViewportSize().width < 768) {
			if ((nav.getViewportSize().height - this.fixedBar.innerHeight()) > menuItemsHeight) {
				nav.menu.css('padding', (((nav.getViewportSize().height - this.fixedBar.innerHeight()) - menuItemsHeight) / 2) + 'px 0px');
			} else {
				nav.menu.css('overflow', 'scroll');
				nav.menu.css('padding', '20px 0');
			}
		}
	},	
	//	Get the viewport size. Tested on IE4+, Firefox, Chrome, Safari, Opera.
	getViewportSize: function(){
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
	},
	getScreenSize: function() {
		return window.screen.availHeight;
	}
}

// END OF   N A V 

$(document).ready(function() {

	// Run the navigation object
	nav.init();



	
	// Return to top button click/tap
	var root = $('html, body');
	$('#scroller-top').click(function() {

		    root.stop().animate({
		        scrollTop: 0}, 800, 'swing');

		return false;
	});


})




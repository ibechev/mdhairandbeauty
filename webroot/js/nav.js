var nav = {

	menu			: $('ul.menu-ul'),
	fixedBar		: $('div.fixed-bar'),
	opened			: false,
	screenStyle		: null,

	// Manu button element
	barTop		: $('div.fixed-bar').find('.bar-1'),
	barMiddle	: $('div.fixed-bar').find('.bar-2'),
	barBottom	: $('div.fixed-bar').find('.bar-3'),

	
	init: function() {
		this.btnClick.listen();
		this.resize.init();
	},

	screenMode: {	// Sets and checks in what currens style is the menu ( mobile or desktop )
		modes: ['mobile', 'desktop'],
		get: function() {
			return nav.screenStyle;
		}, 

		set: function(mode) {
			if ($.inArray(mode, this.modes) != -1) {	// Check if the mode is valid
				nav.screenStyle = mode;
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
			//var coordinates = $('section.' + page).offset();
			//var distance = coordinates.top;
			//$('html, body').stop().animate({scrollTop: distance}, 800, 'swing');
			document.querySelector('section.' + page).scrollIntoView({behavior: 'smooth'});
			//return false;
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
				nav.menu.css('height', (window.innerHeight - nav.fixedBar.innerHeight()) + 'px').css('top', (nav.menu.innerHeight() * -1) + 'px');

				// Add 'overflow: scroll' to the menu only if the devise is mobile
				if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
					nav.menu.css('overflow-y', 'scroll');
				}

				nav.centerVert();
				nav.screenMode.set('mobile');
			}
		},

		setInitPosDesk: function() { // Default position for desktop
			var ww = nav.getViewportSize().width;
			var wh = nav.getViewportSize().height;

			nav.menu	.css('top', 0)
							.css('height', '60px')
							.css('opacity', 1);
			nav.fixedBar.css('opacity', 0.7);

			if (ww >= 768 && ww < 1025) {
				nav.menu.css('padding', '0 20px 0 0');
			} else if (ww >= 1025) {
				nav.menu.css('padding', '0 50px 0 0');
			}

			nav.opened = false;
			nav.screenMode.set('desktop');
		}
	},

	animation: {	// Menu and menu button animation
		slideSpeed: 300,

		showMenu: function() {
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

		var ww = nav.getViewportSize().width;
		var wh = nav.getViewportSize().height;
 		var countMenuItems = this.menu.find('li:even').length;
		var menuItemsHeight = this.menu.find('li:first').innerHeight() * countMenuItems;

		if (ww < 768) {
			if ((wh - this.fixedBar.innerHeight()) > menuItemsHeight) {

				nav.menu.css('padding', (((wh - this.fixedBar.innerHeight()) - menuItemsHeight) / 2) + 'px 0px');
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
	}
}

$(document).ready(function() {

	nav.init();


	

/*

// Navigation menu mobile & desktop aminations 

	var menu = $('.menu-ul');
	var fixedBar = $('.fixed-bar');
	var fixedBarHeight = fixedBar.innerHeight();
	var opened = false;

	// Add 'overflow: scroll' to the menu only if the devise is mobile
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
		menu.css('overflow', 'scroll');
	}

	// Set the height of the drop menu to the height of the screen 
	if (window.innerWidth < 769) {
		menu.css('height', (($(window).innerHeight() - fixedBarHeight) + 'px'));
	}

	// Center the menu list items vertically when orientation is not landscape. 
	centerMenuVert = function() {
		var ww = window.innerWidth;
		var wh = window.innerHeight;
 		var countMenuItems = menu.find('li:even').length;
		var menuItemsHeight = menu.find('li:first').innerHeight() * countMenuItems;

		if (ww < 768 && (wh - fixedBarHeight) > menuItemsHeight) {
			menu.css('padding', (((wh - fixedBarHeight) - menuItemsHeight) / 2) + 'px 0px');
		} else {
			if (ww < 1025) {
				menu.css('padding', '0 20px 0 0');
			} else {
				menu.css('padding', '0 50px 0 0');
			}
		}
	}

	centerMenuVert();

	// Set the height on orientation change 
	$(window).on('orientationchange', function() {
		menu.css('height', ((window.innerHeight - fixedBarHeight) + 'px'));
		console.log(window.innerHeight);
		//centerMenuVert();
	})

	// Animate the trigger button
		var barTop = fixedBar.find('.bar-1');
		var barMiddle = fixedBar.find('.bar-2');
		var barBottom = fixedBar.find('.bar-3');
		var speed = 250;
		
		// Menu opened - showing X
		menuTriggerOpened = function() {

			barTop.transition({y: 9, x: 2.5, rotate: 45, width: 30}, speed);
			barMiddle.transition({x: 3, rotate: 45, width: 30}, speed);
			barBottom.transition({y: -9, x: 2.5, rotate: -45, width: 30}, speed);
		};
		// Menu closed - showing 3 horizontal bars
		menuTriggerClosed = function() {
			barTop.transition({y: 0, x: 0, width: 35, rotate: 0}, speed);
			barMiddle.transition({rotate: 0, x: 0, width: 35}, speed);
			barBottom.transition({y: 0, x: 0, width: 35, rotate: 0}, speed);
		};

	// Menu slide down
	showMenu = function() {
		fixedBar.animate({opacity: '1'}, 1);
		menu.animate({opacity: '0.9'}, 1);
		menu.animate({top: fixedBarHeight}, 250, function() {
			menuTriggerOpened();
		});
		opened = true;
	};

	// Menu slide back up
	hideMenu = function() {
		menu.animate({top: '-' + menu.innerHeight()}, 250, function() {
			menu.animate({opacity: '0'}, 1);
			menuTriggerClosed();
		});
		fixedBar.animate({opacity: '0.7'}, 200);
		opened = false;		
	};

	$('#menu-trigger').click(function() {
		// Execute only, if all animations have complete ( queue is empty )
		if (menu.queue().length == 0 && 
			fixedBar.queue().length == 0 && 
			$('.menu-ul li').queue().length == 0) {
			
			if (opened === false) {
				showMenu();
			} else {
				hideMenu();
			}
		}
	});

	// Scroll to page menu navigation
	goToPage = function(sectionName) {
		if (window.innerWidth < 768) {
			hideMenu();
		}
		var coordinates = $('section.' + sectionName).offset();
		var distance = coordinates.top;
		$('html, body').stop().animate({scrollTop: distance}, 800, 'swing');
		return false;
	};

	// Call scroll when a menu item is clicked
	$('.menu-ul li').click(function() {
		var sectionName = ($(this).attr('id'));
		goToPage(sectionName);
	});

	// Set the default top - property of the mobile navigation
	if (window.innerWidth < 768) {
		menu.css('top', (menu.innerHeight() * -1) + 'px');
	}

	// Checks on window resize
	$(window).resize(function() {

		// Hide / change menu position
		if (window.innerWidth < 768 && opened === false) {
			menu.css('top', (menu.innerHeight() * -1) + 'px');
		} else if (window.innerWidth >= 768) {

			if (opened === false) {
				menu.css('top', '0px').css('opacity', '1');
			} else {
				hideMenu();
			}
		}

		// Center the menu vertically
		centerMenuVert();
	}); */

})




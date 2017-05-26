$(document).ready(function() {
	
	// Contact form
	$('#contact-submit').click(function(e) {
		e.preventDefault();
		validate.init('contact', inputs = {
			'name'		: {
				'input_id'			: 'name', 
				'name'				: 'Name',
				'required'			: true,
				'letters&spaces'	: true,
				'min'				: 2
			},
			'email'		: {
				'input_id'			: 'email',
				'name'				: 'Email',
				'required'			: true,
				'email'				: true
			},
			'subject'	: {
				'input_id'			: 'subject',
				'name'				: 'Subject',
				'required'			: true,
				'min'				: 2
			},
			'message'	: {
				'input_id'			: 'message',
				'name'				: 'Message',
				'required'			: true,
				'min'				: 2	
			}
		})
	});
	
	// Login
	$('#login-submit').click(function(e) {
		e.preventDefault();
		validate.init('login', inputs = {
			'username'	: {
				'input_id'			: 'username',
				'name'				: 'Username',
				'required'			: true
			},
			'password'	: {
				'input_id'			: 'password',
				'name'				: 'Password',
				'required'			: true
			}
		})
	});
});

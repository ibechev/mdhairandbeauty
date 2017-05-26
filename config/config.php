<?php

$GLOBALS['config'] = array(

	'site_name'			=>	'MDhair&beauty',
	'language' 			=> 	array('en', 'es'),

	// Rroutes. Route name => method prefix
	'routes'			=> 	array(
				'default'	=>	'',
				'admin'		=>	'admin_'
		),

	// Defaults
	'default_route'		=>	'default',
	'default_language'	=> 	'en',
	'default_controller'=>	'home',
	'default_action'	=>	'index',
	'default_layout'	=>	'layout',

	// DB
	'mysql'				=> 	array(
		'host'				=>	'127.0.0.1',
		'username'			=> 	'root',
		'password'			=>	'',
		'db'				=>	'mdhair&beauty'
		),

	'session'			=>	array(
			'session_name'	=>	'user', 
			'token_name'	=>	'token'
		),
	'remember'			=>	array(
			'cookie_name'	=>	'hash',
			'cookie_expiry'	=>	604800
		)
	
);
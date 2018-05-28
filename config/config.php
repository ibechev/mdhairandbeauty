<?php

$GLOBALS['config'] = array(

	// HTML head
	'title'	=>	'MD Hair & Beauty Salon | Dedicated to making you look and feel your best!',
	'description' => 'Welcome to MD Hair & Beauty Salon in Palma de Mallorca. Our team is dedicated to making you look and feel your best, every time you walk through our door.',
	'meta_keywords' => array(
		'hair', 'haircut', 'beauty', 'skincare', 'manicure', 'makeup', 	'treatment', 'look', 'haircare', 'hairloss', 'care', 'loss', 'colour', 'dyeing', 'diagnostic', 'helthy', 'nail', 'feet', 'body', 'massage', 'kids', 'children', 'scalp', 'premium', 'mallorca', 'palmanova'),

	// Language (not implemented yet)
	'language' => 	array('en', 'es'),

	// Rroutes. Route name => method prefix
	'routes'	=> 	array(
				'default'	=>	'',
				'admin'		=>	'admin_'
		),

	// Defaults
	'default_route'	=>	'default',
	'default_language'	=> 	'en',
	'default_controller'=>	'home',
	'default_action'	=>	'index',
	'default_layout'	=>	'layout',

	// DB
	'mysql'				=> 	array(
		'host'				=>	'127.0.0.1',
		'username'			=> 	'root',
		'password'			=>	'',
		'db'				=>	'mdhairbeauty'
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

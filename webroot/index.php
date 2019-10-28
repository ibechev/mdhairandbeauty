<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(dirname(__FILE__)));
define('VIEWS_PATH', ROOT . DS . 'views');
define('WEBROOT_PATH', ROOT . DS . 'webroot');

// Defining environment url root and setting Global HOST to either localhost or web server host
define('WEB', 'http://modohairandnails.com');
define('LOCAL', 'http://localhost/mdhairandbeauty');
if ($_SERVER['HTTP_HOST'] === 'localhost') {
	$environment = LOCAL;
	$urlRoot = '/mdhairandbeauty';
} else {
	$environment = WEB;
	$urlRoot = '/modohairandnails';
}

require_once(ROOT . DS . 'lib' . DS . 'init.php');


App::run(str_replace($urlRoot, '', $_SERVER['REQUEST_URI']));

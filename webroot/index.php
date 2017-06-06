<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(dirname(__FILE__)));
define('VIEWS_PATH', ROOT . DS . 'views');
define('WEBROOT_PATH', ROOT . DS . 'webroot');

// Defining environment url root and setting Global HOST to either localhost or web server host
define('WEB', 'http://mdhairandbeauty.herokuapp.com');
define('LOCAL', 'http://localhost/mdhairandbeauty');
if ($_SERVER['HTTP_HOST'] === 'localhost') {
	$environment = LOCAL;
} else {
	$environment = WEB;
}

require_once(ROOT . DS . 'lib' . DS . 'init.php');


App::run(str_replace('/mdhairandbeauty', '', $_SERVER['REQUEST_URI']));	



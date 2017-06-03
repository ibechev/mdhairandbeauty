<?php

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(dirname(__FILE__)));
define('VIEWS_PATH', ROOT . DS . 'views');
define('WEBROOT_PATH', ROOT . DS . 'webroot');


require_once(ROOT . DS . 'lib' . DS . 'init.php');



App::run(str_replace('/mdhairbeauty', '', $_SERVER['REQUEST_URI']));	



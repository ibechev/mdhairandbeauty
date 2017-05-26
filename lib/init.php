<?php

require_once (ROOT . DS . 'config' . DS . 'config.php');
session_start();

function __autoload($class_name) {

	$lib_path = ROOT . DS . 'lib' . DS . strtolower($class_name) . '.class.php';
	
	$controllers_path = ROOT . DS . 'controllers' . DS . str_replace('controller', '', strtolower($class_name)) . '.controller.php';
	
	$model_path = ROOT . DS . 'models' . DS . strtolower($class_name) . '.php';

	if (file_exists($model_path)) {

		require_once($model_path);	

	} elseif (file_exists($controllers_path)) {

		require_once($controllers_path);

	} elseif (file_exists($lib_path)) {
		
		require_once($lib_path);

	} else {

		throw new Exception('Filed to include class: ' . $class_name);
	}

}


// Get language settings
function __($key, $default_value) {
	return Lang::get($key, $default_value);
}

/*if(Cookie::exists(Config::get('remember/cookie_name')) && !Session::exists(Config::get('session/session_name'))) {
	$hash = Cookie::get(config::get('remember/cookie_name'));
	$hashCheck = DB::getInstance()->get('users_session', array('hash', '=', $hash));

	if($hashCheck->count()) {
		$GLOBALS['user'] = new User($hashCheck->first()->user_id);
		$GLOBALS['user']->login();
	}
} else {
	$GLOBALS['user'] = new User();


}*/
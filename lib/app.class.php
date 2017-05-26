<?php

class App {

	protected static $router;

	public static function getRouter() {
		return self::$router;
	}

	public static function run($uri) {

		self::$router = new Router($uri);

		// Load requested language
		Lang::load(self::$router->getLanguage());

		$controller_class = ucfirst(self::$router->getController()) . 'Controller';
		
		$controller_method = strtolower(self::$router->getMethodPrefix() . self::$router->getAction());

		
		// Calling controller
		$controller_object = new $controller_class();

		// Checking if the method is in the respective controller
		if (method_exists($controller_object, $controller_method)) {

			// Controller's action might return a view path		
			$view_path = $controller_object->$controller_method();
 	
			$view_object = new View($controller_object->getData(), $view_path);	
			$content = $view_object->render();

		} else {
			throw new Exception('Method ' . $controller_method . ' of class ' . $controller_class . ' doesn\'t exist!');
		}

		$layout = self::$router->getLayout();
		
		$layout_path = VIEWS_PATH . DS . $layout . '.html';

		$layout_view_object = new View(compact('content'), $layout_path);
		
		echo $layout_view_object->render();
		
	}

}
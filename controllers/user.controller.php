<?php

class UserController extends Controller {

	public function __construct($data = array()) {	
		parent::__construct($data);
		//$this->model = new User();
	}

	public function login () {	
		$this->data['test'] = 'test';	
		if (Input::exists()) {
			if (Token::check(Input::get('token'))) {
				
				$validate = new Validate();
				$validation = $validate->check($_POST, array(
						'username'	=>	array(
							'name'		=>	'Username', 
							'required'	=>	true	
							),
						'password'	=>	array(
							'name'		=>	'Password',
							'required'	=>	true
							)
					));

				if ($validation->passed()) {
					$user = new User();

					$remember = (Input::get('remember') === 'on') ? true : false;
					$login = $user->login(
							Sanitize::input(Input::get('username')),
							Input::get('password'),
							$remember
							);	
					
					if ($login) {
						echo 'logged in';
					}				
				}
			}
		}
	}

	public function register() {
	
	}



}
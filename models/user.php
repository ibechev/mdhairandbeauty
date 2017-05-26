<?php

class user {

	private $_db,
			$_data,
			$_sessionName,
			$_cookieName, 
			$_isLoggedIn;

	public function __construct($user = null) {
		$this->_db = DB::getInstance();

		$this->_sessionName = Config::get('session/session_name');
		$this->_cookieName = Config::get('remember/cookie_name');

		if (!$user) {
		 	if (Session::exists($this->_sessionName)) {
		 		$user = Session::get($this->_sessionName);

		 		if ($this->find($user)) {
		 			$this->_isLoggedIn = true;
		 		} else {
		 			$user->logout();

		 			//Redirect::to('/foodie/home');
		 		}
		 	}

		 }  else {
		 	$this->find($user);
		 }
	}

	public function find($user = null) {
		
		if ($user) {
			if (is_numeric($user)) {
				$field = 'id';
			} elseif (filter_var($user, FILTER_VALIDATE_EMAIL)) {
				$field = 'email';
			} else {
				$field = 'username';
			}
			
			$data = $this->_db->get('users', array($field, '=', $user));
			
			if ($data->count()) {
				$this->_data = $data->first();
				return true;
			}
		}
		return false;
	}

	public function login($username = null, $password = null, $remember = null) {

		if (!$username && !$password && $this->dataExists()) {
			Session::put($this->_sessionName, $this->data()->id);
		} else {
			
			if (!is_numeric($username)) {
				$user = $this->find($username);
				if ($user) {

					if ($this->data()->password === $password) {
						Session::put($this->_sessionName, $this->data()->id);

						if ($remember) {
							$hashCheck = $this->_db->get('users_session', array('user_id', '=', $this->data()->id));

							if (!$hashCheck->count()) {
									$hash = Hash::unique();
									$this->_db->insert('users_session', array(
										'user_id'	=>	$this->data()->id,
										'hash'		=>	$hash
										));
							} else {
								$hash = $hashCheck->first()->hash;
							}	

							Cookie::put($this->_cookieName, $hash, Config::get('remember/cookie_expiry'));
						}
						return true;
					}
				}
			}
			return false;
		}
	}

	public function logout() {

		$this->_db->delete('users_session', array('user_id', '=', $this->data()->id));

		Session::delete($this->_sessionName);
		Cookie::delete($this->_cookieName);
		return true;
	}

	public function data() {
		return $this->_data;
	}

	public function dataExists() {
		return (!empty($this->_data) ? true : false);
	}

	public function isLoggedIn() {
		return $this->_isLoggedIn;
	}
	
}
<?php

class Validate {
	private $_passed = false,
			$_errors = array(),
			$_db = null;

	public function __construct() {
		$this->_db = DB::getInstance();
	}

	public function check($source, $items = array()) {

		foreach($items as $item => $rules) {
			foreach($rules as $rule => $rule_value) {

				//chose action, if $item is array or not
				if (!is_array($item)) {

					if (!preg_match('/step/', $item)) {
						$value = trim($source[$item]);			
					
					} else {

						//converts step[n] to ['step']['n']
						$item = str_split($item, 4);
						$step = $item[0];
						$i = ltrim($item[1], '[');
						$i = rtrim($i, ']');

						$value = trim($source[$step][$i]);	
					}
				} 

				
				if($rule === 'required' &&  empty($value)) {
					$this->addError("{$rules['name']} field is required!");

				} else if(!empty($value)) {
					switch ($rule) {
						case 'username':
							// allowed: a-z, 0-9, -, _
							$aValid = array('-', '_');
							$str = str_replace(' ', '', $value);
							if(!ctype_alnum(str_replace($aValid, '', $str))) {
								$this->addError("Your {$rules['name']} can only contain letters, numbers, '-' and '_'.");
							}
							break;
						case 'max_words':
							if (preg_match('/\s/', trim($value))) {
								$this->addError("Your {$rules['name']} must be a single word.");
							}
							break;
						case 'alpha_num_only':
							if(ctype_digit($value) === true || ctype_alpha($value) === true || ctype_alnum($value) === false) {
								$this->addError("Your {$rules['name']} must contain both letters and numbers only.");
							}
							break;
						case 'begin_with_letter':
							if(!ctype_alpha(substr($value, 0, 1))) {
								$this->addError("Your {$rules['name']} must begin with a letter.");
							}
						break;
						case 'alpha':
							if(!ctype_alpha(str_replace(' ', '', $value)) === true) {
								$this->addError("Your {$rules['name']} must only contain letters.");
							}
						break;	
						case 'min':
							if(strlen($value) < $rule_value) {
								$this->addError("Your {$rules['name']} must be a minimum of {$rule_value} characters.");
							}
						break;
						case 'max':
							if(strlen($value) > $rule_value) {
								$this->addError("Your {$rules['name']} must be a maximum of {$rule_value} characters.");
							}
						break;
						case 'matches':
							if($value != $source[$rule_value]) {	
								$this->addError("{$rules['name']} must match Your Password");
							}	
						break;
						case 'unique':
							$check = $this->_db->get($rule_value, array($item, '=', $value), array());
							if($check->count()) {
								$this->addError("That {$rules['name']} already exists."); 
							}
						break;
						case 'is_different':
							if($value === $source[$rule_value]) {
								$this->addError("Your {$rules['name']} must be different from your Current password.");
							}
						break;
						case 'email':
							if(!filter_var($value, FILTER_VALIDATE_EMAIL)) {
								$this->addError("Your {$rules['name']} is not properly formatted.");
							}
						break;
					}
				}
			}
		}

		if(empty($this->_errors)) {
			$this->_passed = true;
		}

		return $this;
	}

	private function addError($error) {
		$this->_errors[] = $error;
	}

	public function errors() {
		return $this->_errors;
	}

	public function passed() {
		return $this->_passed;
	}
}
<?php

class DB {

	private static $_instance = null;
	private $_pdo,
	 		$_query,
		 	$_error = false,
	 		$_results,
	 		$_count = 0,
	 		$_lastInsertId;	

	private function __construct() {

		try {

			$this->_pdo = new PDO('mysql:host=' . Config::get('mysql/host') . ';dbname=' . Config::get('mysql/db'), Config::get('mysql/username'), Config::get('mysql/password'));
			
		} catch (PDOException $e) {
			die($e->getMessage());
		}	

	}

	public static function getInstance() {

		if (!isset(self::$_instance)) {
			self::$_instance = new DB();
		}
		return self::$_instance;

	}

	public function query($sql, $params = array()) {

		$this->_error = false;
		if ($this->_query = $this->_pdo->prepare($sql)) {
			
			$x = 1;
			if (count($params)) {
 
				foreach ($params as $param) {

					$this->_query->bindValue($x, $param);
					$x ++;
				}
			}

			if ($this->_query->execute()) {
				$this->_results = $this->_query->fetchAll(PDO::FETCH_OBJ);
				$this->_count = $this->_query->rowCount();
				$this->_lastInsertId = $this->_pdo->lastInsertId();

			} else {
				$this->_error = true;
			}
		}
		return $this;

	}

	// ** checks is the array in the 'action' function is multydimential
	public function isMultyArray ($array) {

		rsort($array);
		return isset($array[0]) && is_array($array[0]);
	}

	public function array_validation ($ops_to_check, $valid_ops) {
			
			$valid = true;

			if(is_array($ops_to_check) && is_array($valid_ops)) {

				$parameters = array_keys(array_count_values($ops_to_check));
				$count = count($parameters);
				
				for ($i=0; $i < $count; $i++) { 

					if(in_array($parameters[$i], $valid_ops) === false) {
						
						$valid = false;
					}
				}
			}
			return $valid;
	}

	public function action ($action, $table, $queries = array(), $order = array()) {

		if (func_num_args() == 4 && is_array($queries) === true && is_array($order) === true) {
		
			$valid_ops	= array('=', '>', '<', '>=', '<=', 'LIKE', 'NOT LIKE', 'DESC', 'ASC');
			$ops_to_check = array();
			$params = array();
			$stmt = '';
			$sql = "";
			$valid = true;
			
			if(!empty($queries)) {

				$stmt = "WHERE ";

				if ($this->isMultyArray($queries) === false) {
					
					$field 		= $queries[0];
					$operator 	= $queries[1];
					$value 		= $queries[2];

					if($this->array_validation($operator, $valid_ops)) {
						
						$valid = true;
						$stmt .= $field . '  ' . $operator . ' ?';
						array_push($params, $value);
						
					}

				} elseif ($this->isMultyArray($queries) === true) {

					$i_v = 1; //value index
					$i_o = 1; //operator index
					$i_q = 1; //querie index

						// prepare queries  
					foreach ($queries as $column => $operators) {
							
						foreach ($operators as $operator => $values) {
							
							$ops_to_check[] = $operator;

							foreach ($values as $word => $value) {
							
								$stmt .= "{$column} {$operator} ? ";

								if ($operator === 'LIKE' || $operator === 'NOT LIKE') {
									$params[] = '%' . $value . '%';
								} else {
									$params[] = $value;
								}

								switch ($i_v) {
									case ($i_v < count($values)):
										$stmt .= "AND ";
										$i_v++;
										break;
									case ($i_v == count($values)):
										$i_v = 1;
										break;
								}
							
							}

							switch ($i_o) {
								case ($i_o < count($operators)):
									$stmt .= "AND ";
									$i_o++;
									break;
								case ($i_o == count($operators)):
									$i_o = 1;
									break;
							}
						}

						switch ($i_q) {
							case ($i_q < count($queries)):
								$stmt .= "AND ";
								$i_q++;
								break;
							case ($i_q == count($queries)):
								$i_q = 1;
								break;
							}
					}

					$valid = $this->array_validation($ops_to_check, $valid_ops) ? true : false;

				}	
			}

			if (!empty($order)) {
				
					// prepare ORDER BY 
				$field = $order[0];
				$direction = $order[1];
				$ops_to_check[] = $direction;

				$valid = $this->array_validation($ops_to_check, $valid_ops) ? true : false;

				$stmt .= ' ORDER BY ' . $field . ' ' . $direction;

			}

			if ($valid === true) {
				
				$sql = "{$action} FROM {$table} {$stmt}";

				if(!$this->query($sql, $params)->error()) {
					return $this;
				} 

			}
				
		} 
		return false;
				
	}

	public function get($table, $queries = array(), $order = array()) {

		return $this->action('SELECT *', $table, $queries, $order);
	}

	public function delete($table, $queries, $order = array()) {
		return $this->action('DELETE', $table, $queries, $order = array());
	}

	public function update($table, $id, $fields = array()) {
		$set ='';
		$x   = 1;

		foreach($fields as $name => $value) {
			$set .= "{$name} = ?";
			if($x < count($fields)) {
				$set .= ', ';
			}
			$x++;
		}

		$sql = "UPDATE {$table} SET {$set} WHERE id = {$id}";

		if(!$this->query($sql, $fields)->error()) {
			return true;
		}

		return false;
	} 	

	public function insert($table, $fields = array()) {

		$keys = array_keys($fields);
		$values = '';
		$x = 1;

		foreach($fields as $field) {
			$values .= '?';
			if($x < count($fields)) {
				$values .= ', ';
			}
			$x++;
		}

		$sql = "INSERT INTO {$table} (`" . implode('`,`', $keys) . "`) VALUES ({$values})";

		if(!$this->query($sql, $fields)->error()) {
			
			return true;
		}

		return false;
	}

	public function lastInsertId() {
		return $this->_lastInsertId;
	}

	public function results() {
		return $this->_results;
	}

	//returning the first row
	public function first() {
		return $this->results()[0];
	}

	public function error() {
		return $this->_error;
	}

	public function count() {
		return $this->_count;
	}

}
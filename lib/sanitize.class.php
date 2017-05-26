<?php

class Sanitize {

	public static function input($data) {

		if (is_array($data)) {
			foreach ($data as $item) {
				$item = trim($item);
				$item = stripcslashes($item);
				$item = htmlspecialchars($item);
			} 

		} else {
			$data = trim($data);
			$data = stripcslashes($data);
			$data = htmlspecialchars($data);
		}
		return $data;
	}

}
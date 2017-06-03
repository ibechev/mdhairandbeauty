<?php

class Path {
	
	public static function get() {
		if ($_SERVER['HTTP_HOST'] == 'localhost') {		// or any other host
		
		    return '/mdhairandbeauty/';
		} else {
		    return '';
		}
	}
}
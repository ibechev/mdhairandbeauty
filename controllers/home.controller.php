<?php

class HomeController extends Controller {

	public function admin_index() {

		$this->data['message'] = 'This is an Admin - Index Page';

	}

	public function index () {

		$this->data['test_content'] = 'here will be a pages list';

	}

}
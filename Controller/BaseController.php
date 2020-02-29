<?php

abstract class BaseController {
	protected $model;
	protected $view;

	protected function __construct($name) {
		// Récupère le nom de l'enfant
		$nameModel   = ucfirst($name)."Model";
        $this->model = new $nameModel();
        $nameView    = ucfirst($name)."View";
        $this->view  = new $nameView();
        
	}

	// public function display() {
	// 	$this->view->displayPage($this->page);
	// }
}

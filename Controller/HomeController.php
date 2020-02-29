<?php

include "Model/HomeModel.php";
include "View/HomeView.php";

class HomeController extends BaseController
{
    public function __construct() {
        parent::__construct("Home");
    }
    public function display(){
        $liste = $this->model->listeScores();
        $this->view->displayHome($liste);
    }
}
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
        if(isset($_GET['fin']) && $_GET['fin'] == 'true'){
            // var_dump($liste);
            $test = '{"liste" : "test"}';
            return $test;
        }else{
            $this->view->displayHome($liste);
        }
    }
    
}
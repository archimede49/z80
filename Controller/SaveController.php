<?php

include "Model/SaveModel.php";
include "View/SaveView.php";

class SaveController extends BaseController
{
    public function __construct() {
        parent::__construct("Save");
    }
    public function saveScore(){
        if(isset($_GET['tag']) && isset($_GET['score']) && is_numeric($_GET['score'])){
            $result = $this->model->saveScore(strtoupper($_GET['tag']), $_GET['score']);
            return $result;
        }
    }
}
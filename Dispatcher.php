<?php

include "Model/BaseModel.php";
include "View/BaseView.php";
include "Controller/BaseController.php";
include "Controller/HomeController.php";
include "Controller/SaveController.php";



class Dispatcher
{
    public function dispatch() {
        if (isset($_GET["controller"])) {
            $controller = $_GET["controller"];
        }
        else {
            $controller = "home";
        }

        $myController = ucfirst($controller)."Controller" ;

        if (isset($_GET["action"])) {
            $action = $_GET["action"];
        }
        else {
            $action = "display";
        }

        $myController = new $myController();
        $myController -> $action();
    }
}

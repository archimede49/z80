<?php

abstract class BaseView
{
    protected $pageHTML;

    protected function __construct() {
        $this->pageHTML = file_get_contents("public/html/header.html");
    }

    protected function displayHTML() {
        $this->pageHTML .= file_get_contents("public/html/footer.html");
        echo $this->pageHTML;
    }
}


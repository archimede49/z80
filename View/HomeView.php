<?php

class HomeView extends BaseView
{
    public function __construct() {
        parent::__construct();
    }

    public function displayHome($liste) {
        $score = '';
        foreach ($liste as $unitScore){
            $score .= "<li>$unitScore[0] - $unitScore[1]</li>";
        }
        $this->pageHTML .=file_get_contents( "public/html/home.html");
        $this->pageHTML = str_replace("{{scores}}", $score, $this->pageHTML);
        $this->displayHTML();
    }
}
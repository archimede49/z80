<?php

class HomeView extends BaseView
{
    public function __construct() {
        parent::__construct();
    }

    public function displayHome($liste) {
        $score = '';
        $i = 1;
        foreach ($liste as $unitScore){
            if ($i < 4) {
                $score .= "<tr class='trio'><td>".$i++."</td><td>".$unitScore[1]."</td><td>".$unitScore[0]."</td></tr>";
            }else{
                $score .= "<tr class='gold'><td>".$i++."</td><td>".$unitScore[1]."</td><td>".$unitScore[0]."</td></tr>";
            }
        }
        $this->pageHTML .=file_get_contents( "public/html/home.html");
        $this->pageHTML = str_replace("{{scores}}", $score, $this->pageHTML);
        $this->displayHTML();
    }
}
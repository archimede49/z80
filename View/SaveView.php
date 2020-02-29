<?php

class SaveView extends BaseView
{
    public function __construct() {
        parent::__construct();
    }

    public function displaySave() {
        $this->pageHTML .=file_get_contents( "public/html/end.html");
        $this->displayHTML();
    }
}

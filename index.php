<?php
session_start();

include "Dispatcher.php";

$dispatcher = new Dispatcher();
$dispatcher -> dispatch();

<?php
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
 
$db_username = 'casti954_Lucas';
$db_password = 'Lucas1972';
$db_name = 'casti954_HH';
$db_host = 'localhost';				
$mysqli = new mysqli($db_host, $db_username, $db_password,$db_name);
 
if ($mysqli->connect_error) {
    die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
}
?>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');
require __DIR__ . "/inc/bootstrap.php";
 
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

if ((isset($uri[4]) && $uri[4] != 'product') || !isset($uri[5])) {
    header("HTTP/1.1 404 Not Found");
    exit();
}
 
require PROJECT_ROOT_PATH . "/controller/ProductController.php";
 
$objFeedController = new ProductController();
$strMethodName = $uri[5] . 'Action';
$objFeedController->{$strMethodName}();
?>
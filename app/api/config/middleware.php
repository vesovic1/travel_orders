<?php

use Slim\App;
use DomteraApi\Middleware\JwtClaimMiddleware;
use DomteraApi\Middleware\HttpExceptionMiddleware;
use DomteraApi\Middleware\ErrorHandlerMiddleware;
use Slim\Middleware\ErrorMiddleware;


return function (App $app) {
    ob_start();
    // Parse json, form data and xml
    $app->addBodyParsingMiddleware();

    $app->add(JwtClaimMiddleware::class);

    // Add the Slim built-in routing middleware
    $app->addRoutingMiddleware();

    $app->add(\DomteraApi\Middleware\CorsMiddleware::class);

    // Catch HTTP exxceptions
    $app->add(HttpExceptionMiddleware::class);

    // Catch exceptions and errors
    $app->add(ErrorHandlerMiddleware::class);
    $app->add(ErrorMiddleware::class);
};
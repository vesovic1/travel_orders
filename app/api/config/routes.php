<?php


use Slim\App;
use Slim\Routing\RouteCollectorProxy;

return function (App $app) {

    $app->post('/auth/login', \DomteraApi\Action\Auth\TokenCreateAction::class);

    // This group is protected with JWT.
    $app->group('', function (RouteCollectorProxy $api) {

        $files = glob(__DIR__. '/routes/*.php');

        foreach ($files as $file) {
            require_once $file;
        }

    })->add(\DomteraApi\Middleware\JwtAuthMiddleware::class);
};


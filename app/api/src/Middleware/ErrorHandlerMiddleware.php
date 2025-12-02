<?php

namespace DomteraApi\Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Symfony\Component\ErrorHandler\ErrorHandler;
use Symfony\Component\ErrorHandler\BufferingLogger;

final class ErrorHandlerMiddleware implements MiddlewareInterface
{
    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        // Throw an exception when a PHP error occurs
        // and handled it with the Slim error handler.
        // ErrorHandler::register();
        // Debug::enable();
        ErrorHandler::register(new ErrorHandler(new BufferingLogger(), true));

        return $handler->handle($request);
    }
}
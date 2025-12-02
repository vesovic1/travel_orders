<?php

namespace TravelOrdersApi\Middleware;

use TravelOrdersApi\Factory\LoggerFactory;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Psr\Log\LoggerInterface;
use Slim\Exception\HttpException;

final class HttpExceptionMiddleware implements MiddlewareInterface
{
    private ResponseFactoryInterface $responseFactory;

    private LoggerInterface $logger;

    public function __construct(
        ResponseFactoryInterface $responseFactory,
        LoggerFactory $loggerFactory
    ) {
        $this->responseFactory = $responseFactory;
        $this->logger = $loggerFactory
            ->addFileHandler('http_error.log')
            ->createLogger();
    }

    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface
    {
        try {
            return $handler->handle($request);
        } catch (HttpException $httpException) {

            // Handle the http exception here
            $statusCode = $httpException->getCode();

            $response = $this->responseFactory->createResponse($statusCode);
            $responseMessage = sprintf('%s %s', $statusCode, $response->getReasonPhrase());

            // Log the error message
            switch($statusCode) {
                case 404:
                    $this->logger->error(sprintf('404 Not found %s ', $request->getUri()));
                    break;
                case 405:
                    $this->logger->error(sprintf('405 Method not allowed %s %s ', $request->getMethod(), $request->getUri()));
                    break;
                default:
                    $this->logger->error($responseMessage);
            }

            // Render twig template or just add the content to the body
            $response->getBody()->write($responseMessage);

            return $response;
        }
    }
}
<?php

namespace DomteraApi\Middleware;

use DomteraApi\Routing\JwtAuth;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * JWT Claim middleware.
 */
final class JwtClaimMiddleware implements MiddlewareInterface
{

    public function __construct(
        private JwtAuth $jwtAuth,
        private ResponseFactoryInterface $responseFactory
    )
    {
    }

    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        $authorization = explode(' ', (string)$request->getHeaderLine('Authorization'));
        $type = $authorization[0] ?? '';
        $credentials = $authorization[1] ?? '';

        if ($type !== 'Bearer') {
            return $handler->handle($request);
        }

        $token = $this->jwtAuth->validateToken($credentials);

        $userId = null;

        if ($token) {
            // Append valid token
            $request = $request->withAttribute('token', $token);

            $userId = $token->claims()->get('uid');
            $companyId = $token->claims()->get('cid');

            // Append the user id and company id as request attribute
            $request = $request->withAttribute('uid', $userId);
            $request = $request->withAttribute('cid', $companyId);

            // Add more claim values as attribute...
            // $request = $request->withAttribute('locale', $token->claims()->get('locale'));

            if (empty($userId)) {
                return $this->responseFactory->createResponse()
                    ->withHeader('Content-Type', 'application/json')
                    ->withStatus(401, 'Unauthorized');
            }
        }

        // echo $userId;



        return $handler->handle($request);
    }
}
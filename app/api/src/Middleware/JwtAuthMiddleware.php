<?php

namespace DomteraApi\Middleware;

use DomteraApi\Routing\JwtAuth;
use DomteraCore\Factory\QueryFactory;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * JWT Auth middleware.
 */
final class JwtAuthMiddleware implements MiddlewareInterface
{
    private JwtAuth $jwtAuth;

    private ResponseFactoryInterface $responseFactory;

    public function __construct(
        JwtAuth $jwtAuth,
        ResponseFactoryInterface $responseFactory,
        private QueryFactory $queryFactory
    ) {
        $this->jwtAuth = $jwtAuth;
        $this->responseFactory = $responseFactory;
    }

    public function process(
        ServerRequestInterface $request,
        RequestHandlerInterface $handler
    ): ResponseInterface {
        $tokenString = explode(' ', (string)$request->getHeaderLine('Authorization'))[1] ?? '';

        if (!$tokenString) {
            return $this->unauthorized();
        }

        $token = $this->jwtAuth->validateToken($tokenString);

        if (!$token) {
            return $this->unauthorized();
        }

        $userId = $token->claims()->get('uid');
        $companyId = $token->claims()->get('cid');

        if (!$this->userBelongsToCompany($userId, $companyId)) {
            return $this->unauthorized();
        }

        return $handler->handle($request);
    }

    private function userBelongsToCompany(mixed $userId, mixed $companyId): bool
    {
        if (!$userId || !$companyId) {
            return false;
        }

        $user = $this->queryFactory->select('users')
            ->select('id')
            ->where([
                'id' => $userId,
                'company_id' => $companyId,
                '_deleted' => 0,
            ])
            ->limit(1)
            ->execute()
            ->fetch('assoc');

        return (bool)$user;
    }

    private function unauthorized(): ResponseInterface
    {
        return $this->responseFactory->createResponse()
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(401, 'Unauthorized');
    }
}
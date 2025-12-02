<?php

namespace DomteraApi\Action\Auth;

use DomteraApi\Routing\JwtAuth;
use JsonException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use DomteraApi\Renderer\ResponseRenderer;

final class TokenCreateAction
{
    /**
     * The constructor.
     *
     * @param JwtAuth $jwtAuth The JWT auth
     */
    public function __construct(
        private JwtAuth $jwtAuth,
        private \DomteraCore\Auth\AuthService $authService,
        private ResponseRenderer $renderer,
    )
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        $data = (array)$request->getParsedBody();

        $username = (string)($data['username'] ?? '');
        $password = (string)($data['password'] ?? '');

        try {
            $user = $this->authService->authenticate($username, $password);
        } catch (\Exception $e) {
            return
                $this->renderer->json($response, ['message' => $e->getMessage()])
                ->withStatus(400, 'Unauthorized');
        }

        // Create a fresh token
        $token = $this->jwtAuth->createJwt(
            [
                'uid' => $user['id'],
                'name' => $user['first_name'] . ' '.$user['last_name']
            ]
        );

        // Transform the result into a OAuh 2.0 Access Token Response
        // https://www.oauth.com/oauth2-servers/access-tokens/access-token-response/
        $result = [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'exp' => $this->jwtAuth->getLifetime(),
        ];

        return
            $this->renderer->json($response, $result, JSON_THROW_ON_ERROR)
            // ->withHeader(
            //     'Set-Cookie',
            //     'Authentication='.$result.'; HttpOnly; Secure; Path=/; Max-Age=3600'
            // )
            ->withStatus(201);
    }
}
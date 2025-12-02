<?php

namespace DomteraApi\Action\Users;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use DomteraApi\Renderer\ResponseRenderer;
use DomteraCore\User\UserUpdateService;

final class UsersUpdateAction
{
    public function __construct(
        private ResponseRenderer $renderer,
        private UserUpdateService $userUpdateService,
    )
    {
        $this->renderer = $renderer;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ): ResponseInterface {

        try {
            $user = $this->userUpdateService->update($args['id'], $request->getParsedBody());
        } catch (\Exception $e) {
            return $this->renderer->error($response, json_decode($e->getMessage()) ? json_decode($e->getMessage()) : $e->getMessage());
        }

        return $this->renderer->success($response, $user);
    }
}
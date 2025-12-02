<?php

namespace TravelOrdersApi\Action\Users;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TravelOrdersApi\Renderer\ResponseRenderer;
use TravelOrdersCore\User\UserCreateService;

final class UsersCreateAction
{
    public function __construct(
        private ResponseRenderer $renderer,
        private UserCreateService $userCreateService,
    )
    {
        $this->renderer = $renderer;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {

        try {
            $user = $this->userCreateService->create($request->getParsedBody());
        } catch (\Exception $e) {
            return $this->renderer->error($response, json_decode($e->getMessage()) ? json_decode($e->getMessage()) : $e->getMessage());
        }

        return $this->renderer->success($response, $user);
    }
}
<?php

namespace TravelOrdersApi\Action\Users;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TravelOrdersApi\Renderer\ResponseRenderer;
use TravelOrdersCore\User\UserDeleteService;

final class UsersDeleteAction
{
    public function __construct(
        private ResponseRenderer $renderer,
        private UserDeleteService $userDeleteService,
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
            $user = $this->userDeleteService->delete($args['id']);
        } catch (\Exception $e) {
            return $this->renderer->error($response, $e->getMessage());
        }

        return $this->renderer->success($response, $user);
    }
}
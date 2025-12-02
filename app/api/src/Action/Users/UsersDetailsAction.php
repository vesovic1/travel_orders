<?php

namespace TravelOrdersApi\Action\Users;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TravelOrdersApi\Renderer\ResponseRenderer;
use TravelOrdersCore\User\UserService;

final class UsersDetailsAction {

    public function __construct(
        private ResponseRenderer $renderer,
        private UserService $userService,
    )
    {
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ): ResponseInterface {

        try {
            $user = $this->userService->getById($args['id']);
        } catch (\Exception $e) {
            return $this->renderer->error($response, $e);
        }

        return $this->renderer->success($response, $user);
    }

}
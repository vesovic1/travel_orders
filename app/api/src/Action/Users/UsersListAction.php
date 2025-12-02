<?php

namespace TravelOrdersApi\Action\Users;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TravelOrdersApi\Renderer\ResponseRenderer;
use TravelOrdersCore\User\UserService;

final class UsersListAction
{
    public function __construct(
        private ResponseRenderer $renderer,
        private UserService $userService,
    )
    {
        $this->renderer = $renderer;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {


        $paginationParams = \TravelOrdersApi\Helpers\PaginationParams::process($request->getQueryParams());

        $users = [
            'rows' => $this->userService->get($paginationParams, $request->getAttribute('cid')),
            '_meta' => [
                'total' => $this->userService->getCount($paginationParams, $request->getAttribute('cid'))
            ]
        ];

        return $this->renderer->success($response, $users);
    }
}
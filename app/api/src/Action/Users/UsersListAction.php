<?php

namespace DomteraApi\Action\Users;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use DomteraApi\Renderer\ResponseRenderer;
use DomteraCore\User\UserService;

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


        $paginationParams = \DomteraApi\Helpers\PaginationParams::process($request->getQueryParams());

        $users = [
            'rows' => $this->userService->get($paginationParams),
            '_meta' => [
                'total' => $this->userService->getCount($paginationParams)
            ]
        ];

        return $this->renderer->success($response, $users);
    }
}
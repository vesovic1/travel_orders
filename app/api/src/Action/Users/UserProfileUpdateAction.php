<?php

namespace DomteraApi\Action\Users;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use DomteraApi\Renderer\ResponseRenderer;
use DomteraCore\User\UserProfileUpdateService;

final class UserProfileUpdateAction
{
    public function __construct(
        private ResponseRenderer $renderer,
        private UserProfileUpdateService $userProfileUpdateService,
    )
    {
        $this->renderer = $renderer;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
    ): ResponseInterface {

        try {
            $user = $this->userProfileUpdateService->profileUpdate($request->getAttribute('uid'), $request->getParsedBody());
        } catch (\Exception $e) {
            return $this->renderer->error($response, json_decode($e->getMessage()) ? json_decode($e->getMessage()) : $e->getMessage());
        }

        return $this->renderer->success($response, $user);
    }
}
<?php

namespace DomteraApi\Action\Users;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use DomteraApi\Renderer\ResponseRenderer;
use DomteraCore\User\UserProfileService;

final class UserProfileAction {

    public function __construct(
        private ResponseRenderer $renderer,
        private UserProfileService $userProfileService
    )
    {
        $this->renderer = $renderer;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {

        try {

            $user = $this->userProfileService->getProfile($request->getAttribute('uid'));
        } catch (\Exception $e) {
            return $this->renderer->error($response, $e);
        }

        return $this->renderer->success($response, $user);
    }

}


<?php

$api->get('/users', \DomteraApi\Action\Users\UsersListAction::class);
$api->get('/users/{id}', \DomteraApi\Action\Users\UsersDetailsAction::class);
$api->post('/users', \DomteraApi\Action\Users\UsersCreateAction::class);
$api->patch('/users/{id}', \DomteraApi\Action\Users\UsersUpdateAction::class);
$api->delete('/users/{id}', \DomteraApi\Action\Users\UsersDeleteAction::class);

$api->get('/users/{username}/permissions', \DomteraApi\Action\Users\UsersPermissionsListAction::class);
$api->patch('/users/{username}/permissions', \DomteraApi\Action\Users\UsersPermissionsUpdateAction::class);

$api->get('/profile', \DomteraApi\Action\Users\UserProfileAction::class);
$api->post('/profile/password_reset', \DomteraApi\Action\Users\UsersProfilePasswordResetAction::class);

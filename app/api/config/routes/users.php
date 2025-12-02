<?php

$api->get('/users', \TravelOrdersApi\Action\Users\UsersListAction::class);
$api->get('/users/{id}', \TravelOrdersApi\Action\Users\UsersDetailsAction::class);
$api->post('/users', \TravelOrdersApi\Action\Users\UsersCreateAction::class);
$api->patch('/users/{id}', \TravelOrdersApi\Action\Users\UsersUpdateAction::class);
$api->delete('/users/{id}', \TravelOrdersApi\Action\Users\UsersDeleteAction::class);

$api->get('/users/{username}/permissions', \TravelOrdersApi\Action\Users\UsersPermissionsListAction::class);
$api->patch('/users/{username}/permissions', \TravelOrdersApi\Action\Users\UsersPermissionsUpdateAction::class);

$api->get('/profile', \TravelOrdersApi\Action\Users\UserProfileAction::class);
$api->post('/profile/password_reset', \TravelOrdersApi\Action\Users\UsersProfilePasswordResetAction::class);

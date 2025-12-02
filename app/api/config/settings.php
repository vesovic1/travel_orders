<?php

// Should be set to 0 in production
error_reporting(E_ALL);

// Should be set to '0' in production
ini_set('display_errors', '1');

// Settings
$settings = [];


$settings['jwt'] = [
    'issuer' => $_SERVER['SERVER_NAME'],  // The issuer name
    'lifetime' => 14400,    // Max lifetime in seconds
    'public_key' => $_ENV['JWT_PUBLIC_KEY'],
    'private_key' => $_ENV['JWT_PRIVATE_KEY'],
];

// Logger settings
$settings['logger'] = [
    'name' => 'app',
    'path' => __DIR__ . '/../logs',
    'filename' => 'app.log',
    'level' => \Monolog\Level::Debug,
    'file_permission' => 0775,
];

// Error Handling Middleware settings
$settings['error'] = [
    // Should be set to false in production
    'display_error_details' => true,
    // Parameter is passed to the default ErrorHandler
    // View in rendered output by enabling the "displayErrorDetails" setting.
    // For the console and unit tests we also disable it
    'log_errors' => true,
    'log_error_details' => true, // Display error details in error log
    'log_file' => 'slim-monolog.log', // The error logfile
];

return $settings;
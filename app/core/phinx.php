<?php

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

return
[
    'paths' => [
        'migrations' => '%%PHINX_CONFIG_DIR%%/db/migrations',
        'seeds' => '%%PHINX_CONFIG_DIR%%/db/seeds'
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_environment' => $_ENV['ENV_MODE'],
        'production' => [
            'adapter' => 'mysql',
            'host' => $_ENV['MYSQL_DB_HOST'],
            'name' => $_ENV['MYSQL_DB_NAME'],
            'user' => $_ENV['MYSQL_DB_USER'],
            'pass' => $_ENV['MYSQL_DB_PASS'],
            'port' => $_ENV['MYSQL_DB_PORT'],
            'charset' => 'utf8',
        ],
        'development' => [
            'adapter' => 'mysql',
            'host' => $_ENV['MYSQL_DB_HOST'],
            'name' => $_ENV['MYSQL_DB_NAME'],
            'user' => $_ENV['MYSQL_DB_USER'],
            'pass' => $_ENV['MYSQL_DB_PASS'],
            'port' => $_ENV['MYSQL_DB_PORT'],
            'charset' => 'utf8',
        ]
    ],
    'version_order' => 'creation'
];

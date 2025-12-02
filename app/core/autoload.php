<?php

use Cake\Core\Configure;
use Cake\Database\Connection;
use Psr\Container\ContainerInterface;
use TravelOrdersCore\Filesystem\Storage;
use League\Flysystem\Filesystem;
use TravelOrdersCore\Environment;
use League\Flysystem\UnixVisibility\PortableVisibilityConverter;
use League\Flysystem\Local\LocalFilesystemAdapter;
use League\Flysystem\Visibility;

use Predis\Client;
use Predis\ClientInterface;


require_once __DIR__.'/vendor/autoload.php';

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$dbSettings = [
    'driver' => \Cake\Database\Driver\Mysql::class,
    'host' => Environment::get('MYSQL_DB_HOST'),
    'database' => Environment::get('MYSQL_DB_NAME'),
    'username' => Environment::get('MYSQL_DB_USER'),
    'password' => Environment::get('MYSQL_DB_PASS'),
    'port' => Environment::get('MYSQL_DB_PORT'),
    'encoding' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    // Enable identifier quoting
    'quoteIdentifiers' => true,
    // Set to null to use MySQL servers timezone
    'timezone' => null,
    // PDO options
    'flags' => [
        // Turn off persistent connections
        PDO::ATTR_PERSISTENT => false,
        // Enable exceptions
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        // Emulate prepared statements
        PDO::ATTR_EMULATE_PREPARES => true,
        // Set default fetch mode to array
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        // Set character set
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci'
    ]
];

$storageAdapter = \League\Flysystem\Local\LocalFilesystemAdapter::class;
$storageConfig = [
    'root' => __DIR__ . '/storage',
    'permissions' => [
        'file' => [
            'public' => 0755,
            'private' => 0755,
        ],
        'dir' => [
            'public' => 0755,
            'private' => 0755,
        ],
    ],
    'visibility' => \League\Flysystem\Visibility::PUBLIC,
    'lock' => LOCK_EX,
    'link' => \League\Flysystem\Local\LocalFilesystemAdapter::DISALLOW_LINKS,
];


Configure::write('Error', [
    'ignoredDeprecationPaths' => ['*/core/src/Factory/QueryFactory.php']
]);

return [
    // Database connection
    Connection::class => function () use ($dbSettings) {
        return new Connection($dbSettings);
    },

    ClientInterface::class => function () {
        $redis_options = [
            'prefix' => Environment::get('REDIS_CACHE_PREFIX')
        ];
        if (Environment::get('REDIS_PASSWORD_AUTH') === "yes") {
            $redis_options['parameters'] = [
                'password' => Environment::get('REDIS_PASSWORD'),
            ];
        }
        return new Client(Environment::get('REDIS_SERVER'), $redis_options);
    },

    LocalFilesystemAdapter::class => function () {
        return function (array $config) {
            return new LocalFilesystemAdapter(
                $config['root'] ?? '',
                PortableVisibilityConverter::fromArray(
                    $config['permissions'] ?? [],
                    $config['visibility'] ??  Visibility::PUBLIC
                ),
                $config['lock'] ?? LOCK_EX,
                $config['link'] ?? LocalFilesystemAdapter::DISALLOW_LINKS
            );
        };
    },


    Storage::class => function (ContainerInterface $container) use ($storageAdapter, $storageConfig) {

        $filesystem = new Filesystem($container->get($storageAdapter)($storageConfig));

        return new Storage($filesystem);
    },

];
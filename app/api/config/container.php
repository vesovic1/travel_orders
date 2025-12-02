<?php

use TravelOrdersApi\Routing\JwtAuth;
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Rsa\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Nyholm\Psr7\Factory\Psr17Factory;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseFactoryInterface;
use Slim\App;
use Slim\Factory\AppFactory;
use TravelOrdersApi\Factory\LoggerFactory;
use Slim\Middleware\ErrorMiddleware;

return [
    'settings' => function () {
        return require __DIR__ . '/settings.php';
    },

    App::class => function (ContainerInterface $container) {
        AppFactory::setContainer($container);

        return AppFactory::create();
    },

    ResponseFactoryInterface::class => function (ContainerInterface $container) {
        return $container->get(Psr17Factory::class);
    },

    // Add this entry
    JwtAuth::class => function (ContainerInterface $container) {
        $configuration = $container->get(Configuration::class);

        $jwtSettings = $container->get('settings')['jwt'];
        $issuer = (string)$jwtSettings['issuer'];
        $lifetime = (int)$jwtSettings['lifetime'];

        return new JwtAuth($configuration, $issuer, $lifetime);
    },

    // Add this entry
    Configuration::class => function (ContainerInterface $container) {
        $jwtSettings = $container->get('settings')['jwt'];

        $privateKey = (string)$jwtSettings['private_key'];
        $publicKey = (string)$jwtSettings['public_key'];

        // Asymmetric algorithms use a private key for signature creation
        // and a public key for verification
        return Configuration::forAsymmetricSigner(
            new Sha256(),
            InMemory::plainText($privateKey),
            InMemory::plainText($publicKey)
        );
    },

    // // Database connection
    // Db::class => function () {
    //     return \TravelOrdersCore\Db::getInstance();
    //     // return $container->get(Psr17Factory::class);
    // },

    // // Database connection
    // Connection::class => function (ContainerInterface $container) {
    //     return new Connection($container->get('settings')['db']);
    // },

    // PDO::class => function (ContainerInterface $container) {
    //     $db = $container->get(Connection::class);
    //     $driver = $db->getDriver();
    //     $driver->connect();

    //     return $driver->getConnection();
    // },

    ResponseFactoryInterface::class => function (ContainerInterface $container) {
        return $container->get(Psr17Factory::class);
    },

    LoggerFactory::class => function (ContainerInterface $container) {
        return new LoggerFactory($container->get('settings')['logger']);
    },

    ErrorMiddleware::class => function (ContainerInterface $container) {
        $app = $container->get(App::class);
        $settings = $container->get('settings')['error'];

        $logger = null;
        if (isset($settings['log_file'])) {
            $logger = $container->get(LoggerFactory::class)
                ->addFileHandler($settings['log_file'])
                ->createLogger();
        }

        return new ErrorMiddleware(
            $app->getCallableResolver(),
            $app->getResponseFactory(),
            (bool)$settings['display_error_details'],
            (bool)$settings['log_errors'],
            (bool)$settings['log_error_details'],
            $logger
        );
    },


];
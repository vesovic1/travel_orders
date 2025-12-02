<?php

namespace DomteraCore;

class Environment {

    const STORAGE_REAL_PATH = __DIR__.'/../';

    public static function get(string $varname) {
        if (array_key_exists($varname, $_ENV)) {
            return $_ENV[$varname];
        }
        return getenv($varname);
    }

    public static function development(): bool {
        // return false;
        return self::get('ENV_MODE') === 'development';
    }

    public static function production(): bool {
        return self::get('ENV_MODE') === 'production';
    }

    public static function cronjob(): bool {
        return self::get('CRONJOB') === 'active';
    }

    public static function storageRepo(): string {
        $storageRepo = self::get('STORAGE_REPO');
        if (!in_array($storageRepo, ['local', 'aws'])) {
            return 'local';
        }
        return $storageRepo;
    }
    public static function storage(): string {
        return str_replace('//', '/', self::STORAGE_REAL_PATH .'/'.self::get('STORAGE_LINK'));
    }
}
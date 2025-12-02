<?php

namespace TravelOrdersCore\Cache;

use Predis\ClientInterface;

class Cache {

    public function __construct(private ClientInterface $cache)
    {
    }

    public function connectValue($key): CacheValue {
        return new CacheValue($key, $this->cache);
    }

    public function connectTable($key, $col): CacheTable {
        return new CacheTable($key, $col, $this->cache);
    }

}
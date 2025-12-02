<?php

namespace TravelOrdersCore\Cache;

use Predis\ClientInterface;

class CacheValue {

	private $prefix = '';

    public function __construct(protected string $key,  private ClientInterface $cache)
    {
		$this->prefix = $this->cache->getOptions()->prefix;
    }

    public function __invoke()
    {
        throw new \Exception('CacheValue class cannot be instatiated via Injection');
    }

    public function get()
	{
		try {
			$value = $this->cache->get($this->key);
		} catch (\Exception $e) {
			throw new \Exception("Server not running");
		}

		if ($value === NULL) {
			throw new CacheNotFoundException();
		}

		return json_decode($value);
	}

	public function set($data)
	{
		$this->cache->set($this->key, json_encode($data));
	}

	public function del()
	{
		return $this->cache->del($this->key);
	}

	public function expire(int $expireSeconds)
	{
		return $this->cache->expire($this->key, $expireSeconds);
	}

	public function getTtl()
	{
		return $this->cache->ttl($this->key);
	}

	public function getAllRecordsStartingWithKey()
	{
		$keys = $this->cache->keys($this->key.'*');
		if (!count($keys)) {
			return [];
		}
		$keys = array_map(function($k) {
			return str_replace($this->prefix, '', $k);
		}, $keys);

		return $keys;
	}

	public function delAllStartingWithKey()
	{
		$keysFound = $this->getAllRecordsStartingWithKey();
		foreach ($keysFound as $key) {
			$this->cache->del($key);
		}
	}
}
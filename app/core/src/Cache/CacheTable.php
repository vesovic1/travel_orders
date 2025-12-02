<?php

namespace TravelOrdersCore\Cache;

use Predis\ClientInterface;

class CacheTable {

    private $list = [];

    public function __construct(protected string $key, protected string $id_column, private ClientInterface $cache)
    {
    }

    public function getById($id)
	{
		try {
			$value = $this->cache->hget($this->key, strval($id));
		} catch (\Exception $e) {
			throw new \Exception("Server not running");
		}

		if ($value === NULL) {
			throw new CacheNotFoundException();
		}

		return json_decode($value);
	}

	public function setById($id, $data)
	{
		try {
			$this->cache->hset($this->key, strval($id), json_encode($data));
		} catch (\Exception $e) {

		}
	}

	public function get()
	{
		try {
			$values = $this->cache->hgetall($this->key);
		} catch (\Exception $e) {
			throw new \Exception("Server not running");
		}

		if (empty($values)) {
			throw new CacheNotFoundException();
		}

		$this->list = array_map(function($item) {
			return json_decode($item);
		}, $values);

		return $this->list;
	}


	public function set($data)
	{
		$formattedData = [];
		if (!empty($data)) {
			foreach ($data as $item) {
				$key = null;
				if (is_object($item)) {
					$key = $item->{$this->id_column};
				} else {
					$key = $item[$this->id_column];
				}
				$formattedData[$key] = json_encode($item);
			}
		}

		try {
			$this->cache->hmset($this->key, $formattedData);
		} catch (\Exception $e) {
			// "Server not running"
		}
	}

	public function delById($id)
	{
		return $this->cache->del($this->key, strval($id));
	}

	public function del()
	{
		return $this->cache->del($this->key);
	}

}
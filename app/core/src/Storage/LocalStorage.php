<?php

namespace TravelOrdersCore\Storage;

use JmesPath\Env;
use TravelOrdersCore\Environment;

class LocalStorage {

    private $root = '';

    public function __construct()
    {
        $this->root = rtrim(__DIR__.'/../../'.Environment::get('STORAGE_LINK'), '/');
    }

    public function getRoot()
    {
        return $this->root;
    }

    public function url($path)
    {
        return rtrim(Environment::get('STORAGE_URL'), '/'). '/'.ltrim($path);
    }

    public function getFolderPath($dir)
    {
        $dir = $this->sanitizeRelPath($dir);
         // create output directory
        return $this->root.'/'.$dir;
    }

    private function sanitizeRelPath($relPath)
    {
        return trim($relPath, '/');
    }

    public function createDir($dir)
    {
        $dir = $this->sanitizeRelPath($dir);
         // create output directory
        $path = $this->root.'/'.$dir;

        if (!file_exists($path)) {
            if (!mkdir($path, 0777, true)) {
                throw new \Exception('Folder cannot be created');
            }
        }
    }

    public function unlink($relPath)
    {
        $relPath = $this->sanitizeRelPath($relPath);
        // create output directory
        $path = $this->root.'/'.$relPath;
        if (file_exists($path)) {
            unlink($path);
        }
    }


}
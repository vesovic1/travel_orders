<?php

namespace DomteraCore\Filesystem;

interface FileWriterInterface
{
    public function write(string $location, string $data): void;
}
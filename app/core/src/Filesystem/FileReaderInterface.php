<?php

namespace DomteraCore\Filesystem;

interface FileReaderInterface
{
    public function read(string $location): string;
}
<?php

namespace TravelOrdersCore\Filesystem;

interface FileReaderInterface
{
    public function read(string $location): string;
}
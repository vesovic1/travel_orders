<?php

namespace TravelOrdersCore\Filesystem;

use League\Flysystem\FilesystemOperator;

final class Storage implements FileReaderInterface, FileWriterInterface
{
    private FilesystemOperator $filesystem;

    public function __construct(FilesystemOperator $filesystem)
    {
        $this->filesystem = $filesystem;
    }

    public function read(string $path): string
    {
        return $this->filesystem->read($path);
    }
    public function readStream(string $path)
    {
        return $this->filesystem->readStream($path);
    }

    public function fileSize(string $path): int
    {
        return $this->filesystem->fileSize($path);
    }

    public function write(string $path, string $data): void
    {
        $this->filesystem->write($path, $data);
    }

    public function delete(string $path): void
    {
        $this->filesystem->delete($path);
    }

    public function createFolder(string $path): void
    {
        $this->filesystem->createDirectory($path);
    }

    public function deleteFolder(string $path): void
    {
        $this->filesystem->deleteDirectory($path);
    }

    public function copy(string $fromPath, string $toPath, array $config = []): void {
        $this->filesystem->copy($fromPath, $toPath, $config);
    }

    public function move(string $source, string $destination, array $config = []): void {
        $this->filesystem->move($source, $destination, $config);
    }

    public function fileExists(string $path): bool {
        return $this->filesystem->fileExists($path);
    }
}
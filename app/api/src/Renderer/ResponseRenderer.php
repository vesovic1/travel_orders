<?php

namespace TravelOrdersApi\Renderer;

use finfo;
use Psr\Http\Message\ResponseInterface;
// use Psr\Http\Message\stream;

final class ResponseRenderer
{
    public function json(
        ResponseInterface $response,
        $data = null,
        int $options = 0
    ): ResponseInterface {

        $this->forwardOutput($response);

        $response = $response->withHeader('Content-Type', 'application/json');

        try {
            $encodedData = json_encode($data, JSON_THROW_ON_ERROR, 512);
            $response->getBody()->write((string)$encodedData);
        } catch (\JsonException $exception) {
            $response->getBody()->write((string)json_encode(['error' => 'JSON parse '.$exception->getTraceAsString()]));
        }

        return $response;
    }

    private function forwardOutput($response)
    {
        $previousOutput = ob_get_clean();
        if (!empty($previousOutput)) {
            $response->getBody()->write($previousOutput);
        }
    }

    public function success(
        ResponseInterface $response,
        $data = null,
    ): ResponseInterface {

        return $this->json($response, $data)->withStatus(200);
    }

    public function zip(
        ResponseInterface $response,
        $zipFilePath
    ): ResponseInterface {
        $buffer = file_get_contents($zipFilePath);
        $response->getBody()->write($buffer);

        // URL-Encode the filename
        $outputFilename = rawurlencode('file.zip');

        $contentDisposition = sprintf("attachment; filename*=UTF-8''%s", $outputFilename);

        $response
            ->withHeader('Content-Type', 'application/zip')
            ->withHeader('Content-Disposition', $contentDisposition)
            ->withHeader('Pragma', 'public')
            ->withHeader('Cache-Control', 'public, must-revalidate')
            ->withHeader('Content-Transfer-Encoding', 'binary');


        return $response;
    }

    public function blob(
        ResponseInterface $response,
        $path
    ): ResponseInterface {

        $buffer = file_get_contents($path);
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->buffer($buffer);

        $response = $response->withHeader('Content-Type',  $mime);

        $response->getBody()->write($buffer);

        return $response;
    }

    public function image(
        ResponseInterface $response,
        $path
    ): ResponseInterface {
        $buffer = file_get_contents($path);
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mime = $finfo->buffer($buffer);

        $response = $response->withHeader('Content-Type',  $mime);

        $response->getBody()->write($buffer);

        return $response;

    }

    public function error(
        ResponseInterface $response,
        mixed $message
    ): ResponseInterface {

        if (is_string($message)) {
            $message = ['error' => $message];
        }
        if (is_object($message) && get_class($message) === 'Exception') {
            $message = [ 'error' => $message->getMessage(), 'file' => $message->getFile(). ' - line '.$message->getLine(), 'details' => $message->getTraceAsString()];
        }

        return $this->json($response, $message)->withStatus(400);

    }
}

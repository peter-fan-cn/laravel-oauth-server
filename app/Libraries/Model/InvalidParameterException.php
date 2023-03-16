<?php
/**
 * Created by Hera Portal.
 * User: Peter Fan(peter.fan@codelocks.hk)
 * Date: 2020/3/25 9:42
 */

namespace App\Libraries\Model;

use Symfony\Component\HttpKernel\Exception\HttpException;

class InvalidParameterException extends HttpException
{
    public function __construct(string $message = null, \Throwable $previous = null) {
        parent::__construct(400, $message, $previous);
    }
}
